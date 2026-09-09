export type PartyVoteAlignment = {
  pair: [string, string];
  alignment: number;
  sampleSize: number;
};

export async function fetchVotingData(): Promise<PartyVoteAlignment[]> {
  return [];
}
