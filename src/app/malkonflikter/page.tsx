import { SectionHeading } from "@/components/section-heading";
import { TradeoffExplorer } from "@/components/tradeoff-explorer";

export default function MalkonflikterPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Målkonflikter"
        title="Gör svåra prioriteringar begripliga"
        description="Varje fråga visas i tre lager: förankrade fakta, legitima perspektiv och vanliga felbilder. Två perspektiv ger vågskål. Tre eller fler ger flikar — utan höger/vänster-låsning."
      />
      <div className="mt-10">
        <TradeoffExplorer />
      </div>
    </div>
  );
}
