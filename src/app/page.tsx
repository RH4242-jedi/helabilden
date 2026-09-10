import Link from "next/link";
import { ArrowRight, Database, Scale, ShieldCheck } from "lucide-react";
import { FeatureCard } from "@/components/feature-card";
import { SectionHeading } from "@/components/section-heading";
import { featureCards } from "@/data/site-content";

const principles = [
  {
    title: "Före opinion: visa underlaget",
    text: "Påståenden ska kunna bottna i data, historik, kontext eller tydliga målkonflikter snarare än i ren signalpolitik.",
    icon: Database,
  },
  {
    title: "Bygg för intellektuell hederlighet",
    text: "Varje känslig fråga ska kunna beskrivas så att den mest rimliga versionen av motståndarens argument faktiskt får synas.",
    icon: ShieldCheck,
  },
  {
    title: "Gör avvägningarna begripliga",
    text: "Politik blir mindre teatralisk när användaren ser vilka kostnader, risker och vinster som följer av olika prioriteringar.",
    icon: Scale,
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center rounded-full border border-slate-900/8 bg-white/75 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
            Fakta före friktion • Svensk politik utan kulturkrigsfilter
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
              Minska dramat. <br /> Förstå systemen. <br /> Se datan.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              helabilden.se är en faktadriven ingång till svensk politik. Här ska känsliga frågor förklaras med historik,
              voteringsdata och tydliga målkonflikter i stället för klicklogik och moralisk teater.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/enighetsindex"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Se Enighetsindexet <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/malkonflikter"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Utforska Målkonflikter
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-900/8 bg-white/82 p-6 shadow-sm backdrop-blur md:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Varför detta behövs</p>
          <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
            <p>
              Den offentliga debatten överdriver ofta konflikt och underskattar hur mycket politik egentligen handlar om budgetrestriktioner,
              institutioner, incitament och historiska kompromisser.
            </p>
            <p>
              Målet här är inte att sudda ut skillnader, utan att göra dem begripligare. När avvägningar syns tydligt blir det svårare att vinna
              genom missinformation, halmgubbar och selektiv upprördhet.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Huvudfunktioner"
          title="Byggt för att sakta ner reaktionen och höja förståelsen"
          description="MVP:n fokuserar på samsyn i Riksdagen, målkonflikter med flera perspektiv och en öppen metodstandard för källor och osäkerhet."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card) => (
            <FeatureCard key={card.href} {...card} />
          ))}
        </div>
      </section>

      <section id="principer" className="mt-24">
        <SectionHeading
          eyebrow="Designprinciper"
          title="Neutral form för känsligt innehåll"
          description="För att undvika partifärger och stamtänkande använder gränssnittet neutrala ytor, lågmälda accenter och en informationshierarki som känns mer analys än agitation."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {principles.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-[2rem] border border-slate-900/8 bg-white/80 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
