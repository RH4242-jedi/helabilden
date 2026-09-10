import type { AlignmentSnapshot } from "@/lib/riksdagen";

function percentage(value: number): string {
  return `${Math.round(value * 100)} %`;
}

export function AlignmentMatrix({ snapshot }: { snapshot: AlignmentSnapshot }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[2rem] border border-slate-900/8 bg-white/85 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-900/8 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Samsyn i Riksdagen</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Partier röstar lika oftare än debatten antyder
            </h3>
          </div>
          <div className="rounded-2xl bg-teal-600/8 px-4 py-3 text-right">
            <p className="text-sm text-slate-500">
              Genomsnitt · {snapshot.source === "riksdagen" ? "live-data" : "fallback"}
            </p>
            <p className="text-3xl font-semibold tracking-tight text-slate-950">
              {percentage(snapshot.averageAlignment)}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {snapshot.rows.map((row) => (
            <div key={row.pair.join("-")} className="space-y-2">
              <div className="flex items-center justify-between gap-4 text-sm">
                <p className="font-medium text-slate-700">
                  {row.pair[0]} och {row.pair[1]}
                </p>
                <p className="text-slate-500">{percentage(row.alignment)} likadana voteringar</p>
              </div>
              <div className="h-3 rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-teal-700 to-emerald-500"
                  style={{ width: `${row.alignment * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-400">
                Underlag: {row.sampleSize.toLocaleString("sv-SE")} voteringar i urvalet.
              </p>
            </div>
          ))}
        </div>
      </section>

      <aside className="rounded-[2rem] border border-slate-900/8 bg-slate-950 p-6 text-slate-50 shadow-sm md:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-teal-300">Metodnotis</p>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
          <p>
            Indexet jämför partiernas majoritetsposition i varje votering. Frånvarande röster räknas bort. Urvalet hämtas från
            riksmötet {snapshot.session} via data.riksdagen.se.
          </p>
          <p>
            Just nu används ett jämnt stickprov om {snapshot.voteCount} voteringar för snabbare svarstid. Resultatet cachas i 24
            timmar.
          </p>
          <p>
            Hämtat: {new Date(snapshot.fetchedAt).toLocaleString("sv-SE")}
            {snapshot.note ? ` · ${snapshot.note}` : ""}
          </p>
        </div>
      </aside>
    </div>
  );
}
