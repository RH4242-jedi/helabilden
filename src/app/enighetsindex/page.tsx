import { AlignmentMatrix } from "@/components/alignment-matrix";
import { SectionHeading } from "@/components/section-heading";
import { fetchAlignmentSnapshot } from "@/lib/riksdagen";

export const revalidate = 86400;

export default async function EnighetsindexPage() {
  const snapshot = await fetchAlignmentSnapshot("2023/24");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Enighetsindexet"
        title="Visa samsynen innan vi fastnar i konfliktlinjerna"
        description="Här hämtas voteringsdata från Riksdagens öppna API, normaliseras till partimajoriteter och aggregeras till ett enighetsindex. Syftet är att etablera ett lugnt faktalager innan man går in i de frågor där skillnaderna faktiskt är stora."
      />
      <div className="mt-10">
        <AlignmentMatrix snapshot={snapshot} />
      </div>
    </div>
  );
}
