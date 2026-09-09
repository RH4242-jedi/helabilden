import type { PartyVoteAlignment } from "@/lib/riksdagen";

export const averageAlignment = 0.81;

export const alignmentRows: PartyVoteAlignment[] = [
  { pair: ["S", "M"], alignment: 0.78, sampleSize: 1264 },
  { pair: ["S", "V"], alignment: 0.86, sampleSize: 1264 },
  { pair: ["M", "KD"], alignment: 0.92, sampleSize: 1264 },
  { pair: ["C", "L"], alignment: 0.83, sampleSize: 1264 },
  { pair: ["MP", "S"], alignment: 0.88, sampleSize: 1264 },
  { pair: ["SD", "M"], alignment: 0.84, sampleSize: 1264 },
];
