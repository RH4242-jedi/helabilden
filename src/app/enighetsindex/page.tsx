import { AlignmentMatrix } from "@/components/alignment-matrix";
import { SectionHeading } from "@/components/section-heading";

export default function EnighetsindexPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Enighetsindexet"
        title="Visa samsynen innan vi fastnar i konfliktlinjerna"
        description="Den här vyn börjar med mockdata, men är strukturerad för att senare kunna drivas av riktig voteringshistorik från data.riksdagen.se. Tanken är att etablera ett lugnt faktalager innan man går in i de frågor där skillnaderna faktiskt är stora."
      />
      <div className="mt-10">
        <AlignmentMatrix />
      </div>
    </div>
  );
}
