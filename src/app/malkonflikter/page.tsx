import { SectionHeading } from "@/components/section-heading";
import { TradeoffExplorer } from "@/components/tradeoff-explorer";

export default function MalkonflikterPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Målkonflikter"
        title="Gör svåra prioriteringar begripliga"
        description="När användaren drar i reglaget skiftar tyngdpunkten mellan två legitima mål. Steelman-läget hjälper till att visa den starkaste versionen av båda sidor i stället för att belöna karikatyrer."
      />
      <div className="mt-10">
        <TradeoffExplorer />
      </div>
    </div>
  );
}
