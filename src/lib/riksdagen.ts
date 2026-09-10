import { unstable_cache } from "next/cache";
import { alignmentRows as fallbackRows, averageAlignment as fallbackAverage } from "@/data/alignment-data";

export type PartyCode = "S" | "M" | "SD" | "V" | "C" | "KD" | "MP" | "L";

export type PartyVoteAlignment = {
  pair: [string, string];
  alignment: number;
  sampleSize: number;
};

export type AlignmentSnapshot = {
  session: string;
  averageAlignment: number;
  rows: PartyVoteAlignment[];
  voteCount: number;
  fetchedAt: string;
  source: "riksdagen" | "fallback";
  note?: string;
};

type RawVoteRow = {
  parti?: string;
  rost?: string;
  votering_id?: string;
  avser?: string;
};

type VoteringListaResponse = {
  voteringlista?: {
    "@antal"?: string;
    "@nasta_sida"?: string;
    votering?: RawVoteRow | RawVoteRow[] | Array<{ votering_id?: string }>;
  };
};

type SingleVoteringResponse = {
  votering?: {
    dokvotering?: {
      votering?: RawVoteRow | RawVoteRow[];
    };
  };
};

export const TRACKED_PARTIES: PartyCode[] = ["S", "M", "SD", "V", "C", "KD", "MP", "L"];

const DEFAULT_SESSION = "2023/24";
const REVALIDATE_SECONDS = 60 * 60 * 24;
const SAMPLE_SIZE = 32;
const CONCURRENCY = 8;

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function majorityVote(counts: Record<string, number>): string | null {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return entries[0]?.[0] ?? null;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Riksdagen API fel (${response.status}) för ${url}`);
  }

  return (await response.json()) as T;
}

export async function listVoteringIds(session = DEFAULT_SESSION): Promise<string[]> {
  const url = `https://data.riksdagen.se/voteringlista/?rm=${encodeURIComponent(session)}&utformat=json&sz=10000&gruppering=votering_id`;
  const payload = await fetchJson<VoteringListaResponse>(url);
  const rows = asArray(payload.voteringlista?.votering);

  return rows
    .map((row) => ("votering_id" in row ? row.votering_id : undefined))
    .filter((id): id is string => Boolean(id));
}

export async function fetchVoteringBallots(voteringId: string): Promise<RawVoteRow[]> {
  const url = `https://data.riksdagen.se/votering/${voteringId}/json`;
  const payload = await fetchJson<SingleVoteringResponse>(url);
  return asArray(payload.votering?.dokvotering?.votering);
}

function sampleEvenly<T>(items: T[], count: number): T[] {
  if (items.length <= count) {
    return items;
  }

  const result: T[] = [];
  const step = items.length / count;

  for (let index = 0; index < count; index += 1) {
    result.push(items[Math.floor(index * step)]);
  }

  return result;
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const current = cursor;
      cursor += 1;
      results[current] = await mapper(items[current]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

export function computePartyAlignments(ballotsByVote: RawVoteRow[][]): PartyVoteAlignment[] {
  const agree = new Map<string, number>();
  const total = new Map<string, number>();

  for (const ballots of ballotsByVote) {
    const partyCounts = new Map<string, Record<string, number>>();

    for (const row of ballots) {
      const party = row.parti;
      const vote = row.rost;

      if (!party || !TRACKED_PARTIES.includes(party as PartyCode)) {
        continue;
      }

      if (!vote || vote === "Frånvarande") {
        continue;
      }

      const current = partyCounts.get(party) ?? {};
      current[vote] = (current[vote] ?? 0) + 1;
      partyCounts.set(party, current);
    }

    const majorities = new Map<string, string>();
    for (const party of TRACKED_PARTIES) {
      const counts = partyCounts.get(party);
      if (!counts) {
        continue;
      }
      const majority = majorityVote(counts);
      if (majority) {
        majorities.set(party, majority);
      }
    }

    for (let i = 0; i < TRACKED_PARTIES.length; i += 1) {
      for (let j = i + 1; j < TRACKED_PARTIES.length; j += 1) {
        const left = TRACKED_PARTIES[i];
        const right = TRACKED_PARTIES[j];
        const leftVote = majorities.get(left);
        const rightVote = majorities.get(right);

        if (!leftVote || !rightVote) {
          continue;
        }

        const key = `${left}|${right}`;
        total.set(key, (total.get(key) ?? 0) + 1);
        if (leftVote === rightVote) {
          agree.set(key, (agree.get(key) ?? 0) + 1);
        }
      }
    }
  }

  return Array.from(total.entries())
    .map(([key, sampleSize]) => {
      const [left, right] = key.split("|") as [string, string];
      return {
        pair: [left, right] as [string, string],
        alignment: (agree.get(key) ?? 0) / sampleSize,
        sampleSize,
      };
    })
    .sort((a, b) => b.alignment - a.alignment);
}

function averageOf(rows: PartyVoteAlignment[]): number {
  if (!rows.length) {
    return 0;
  }

  return rows.reduce((sum, row) => sum + row.alignment, 0) / rows.length;
}

async function loadAlignmentSnapshot(session: string): Promise<AlignmentSnapshot> {
  const ids = await listVoteringIds(session);
  const sampledIds = sampleEvenly(ids, SAMPLE_SIZE);
  const ballotsByVote = await mapWithConcurrency(sampledIds, CONCURRENCY, fetchVoteringBallots);
  const usable = ballotsByVote.filter((ballots) => ballots.length > 0);
  const rows = computePartyAlignments(usable);

  if (!rows.length) {
    throw new Error("Kunde inte beräkna enighetsindex från Riksdagens data.");
  }

  return {
    session,
    averageAlignment: averageOf(rows),
    rows: rows.slice(0, 8),
    voteCount: usable.length,
    fetchedAt: new Date().toISOString(),
    source: "riksdagen",
  };
}

const getCachedAlignmentSnapshot = unstable_cache(
  async (session: string) => loadAlignmentSnapshot(session),
  ["riksdagen-alignment-snapshot-v1"],
  { revalidate: REVALIDATE_SECONDS },
);

export async function fetchAlignmentSnapshot(session = DEFAULT_SESSION): Promise<AlignmentSnapshot> {
  try {
    return await getCachedAlignmentSnapshot(session);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Okänt fel";
    return {
      session,
      averageAlignment: fallbackAverage,
      rows: fallbackRows,
      voteCount: fallbackRows[0]?.sampleSize ?? 0,
      fetchedAt: new Date().toISOString(),
      source: "fallback",
      note: `Kunde inte hämta live-data just nu (${message}). Visar fallback-data.`,
    };
  }
}

/** Bakåtkompatibel platshållare som nu returnerar beräknade parvisa rader. */
export async function fetchVotingData(session = DEFAULT_SESSION): Promise<PartyVoteAlignment[]> {
  const snapshot = await fetchAlignmentSnapshot(session);
  return snapshot.rows;
}
