import { SectionHeading } from "@/components/section-heading";

const layers = [
  {
    title: "Fakta / data",
    body: "Observerbara uppgifter, tidsserier, institutionella regler och voteringsutfall. Här hör påståenden hemma som går att kontrollera mot en källa utan att kräva en politisk värdering.",
  },
  {
    title: "Tolkning / målkonflikt",
    body: "Här bor avvägningar mellan legitima mål. Vi visar flera perspektiv, inklusive steelman-versioner, så att konflikten blir begriplig utan karikatyrer.",
  },
  {
    title: "Missinformation / felbilder",
    body: "Här samlar vi återkommande förenklingar, halmgubbar och selektiva narrativ. Syftet är inte att vinna en sida, utan att minska brus.",
  },
];

const evidenceLevels = [
  {
    level: "Hög",
    text: "Stark empiri, tydlig institutionell regel eller väldokumenterad historik med låg tolkningsfrihet.",
  },
  {
    level: "Medel",
    text: "Rimligt underbyggt, men beroende av utformning, kontext eller jämförbarhet mellan fall.",
  },
  {
    level: "Låg",
    text: "Indikativt underlag, begränsad data eller starkt situationsberoende effekter.",
  },
  {
    level: "Omstridd",
    text: "Forskningsläge eller sakkunnigbedömning går isär. Osäkerheten ska synas, inte döljas.",
  },
];

export default function MetodPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Metod"
        title="Epistemisk standard för helabilden.se"
        description="Om sajten ska kunna hantera de känsligaste frågorna måste den vara tydlig med vad som är fakta, vad som är tolkning och hur osäkerhet redovisas. Det här är den redaktionella basen."
      />

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {layers.map((layer) => (
          <article key={layer.title} className="rounded-[2rem] border border-slate-900/8 bg-white/85 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-teal-700">Lager</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{layer.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{layer.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-900/8 bg-white/85 p-6 shadow-sm md:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Vad är fakta?</p>
          <div className="mt-4 space-y-4 text-base leading-7 text-slate-600">
            <p>
              Fakta är påståenden som går att förankra i observerbara data, dokumenterade beslut, lagtext eller etablerad statistik.
              Exempel: hur partier röstat i Riksdagen, hur ett skattesystem är konstruerat, eller vilka rättsliga ramar som gäller för personuppgifter.
            </p>
            <p>
              Fakta är inte samma sak som “det enda rimliga politiska valet”. Samma faktaunderlag kan stödja olika prioriteringar beroende på vilka mål man väger tyngst.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-900/8 bg-slate-950 p-6 text-slate-50 shadow-sm md:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-teal-300">Vad är tolkning?</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            <p>
              Tolkning börjar när vi går från “vad är sant?” till “vad bör prioriteras?”. Här syns målkonflikter, värden och antaganden om mekanismer.
            </p>
            <p>
              Därför använder vi perspectives i stället för binära höger/vänster-spalter. En fråga kan ha två, tre eller fyra legitima infallsvinklar.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-teal-700">Evidensnivåer</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Hur vi hanterar osäkerhet</h2>
          <p className="text-base leading-7 text-slate-600">
            Varje argument och faktapunkt kan bära en evidensnivå. Poängen är inte att låtsas vara mer säkra än underlaget tillåter, utan att göra osäkerheten synlig.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {evidenceLevels.map((item) => (
            <article key={item.level} className="rounded-3xl border border-slate-900/8 bg-white/85 p-5 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{item.level}</p>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-slate-900/8 bg-white/85 p-6 shadow-sm md:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Källmodell</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 text-base leading-7 text-slate-600">
            <p>
              Källor ligger i en delad katalog per ämne och kopplas till enskilda påståenden via <code>sourceIds</code>.
              I gränssnittet visas de som diskreta markörer, till exempel [1], med en fotnotslista längst ner.
            </p>
            <p>
              Det gör det enkelt att fylla på innehåll utan att blanda ihop argumenttext med metadata, och det blir lättare att senare koppla samma modell till CMS eller databas.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
            <p className="font-medium text-slate-900">Redaktionell checklista</p>
            <ul className="mt-3 space-y-2">
              <li>1. Separera fakta, perspektiv och felbilder.</li>
              <li>2. Ge varje perspektiv en steelman-version.</li>
              <li>3. Märk evidensnivå där det behövs.</li>
              <li>4. Koppla källor till påståenden, inte bara till sidan.</li>
              <li>5. Visa vad som är osäkert i stället för att överdriva säkerhet.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
