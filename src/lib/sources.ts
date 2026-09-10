import type { SourceLink } from "@/data/tradeoffs";

export function buildSourceIndex(sources: SourceLink[]): Map<string, number> {
  return new Map(sources.map((source, index) => [source.id, index + 1]));
}

export function resolveSources(sources: SourceLink[], sourceIds: string[] | undefined): SourceLink[] {
  if (!sourceIds?.length) {
    return [];
  }

  const byId = new Map(sources.map((source) => [source.id, source]));
  return sourceIds
    .map((id) => byId.get(id))
    .filter((source): source is SourceLink => Boolean(source));
}
