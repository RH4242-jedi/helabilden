import type { SourceLink } from "@/data/tradeoffs";
import { resolveSources } from "@/lib/sources";

export function SourceMarkers({
  sources,
  sourceIds,
  sourceIndex,
}: {
  sources: SourceLink[];
  sourceIds?: string[];
  sourceIndex: Map<string, number>;
}) {
  const resolved = resolveSources(sources, sourceIds);

  if (!resolved.length) {
    return null;
  }

  return (
    <span className="ml-1 inline-flex items-baseline gap-0.5 align-super text-[0.65rem] font-medium tracking-tight text-teal-700">
      {resolved.map((source) => {
        const number = sourceIndex.get(source.id);
        if (!number) {
          return null;
        }

        return (
          <a
            key={source.id}
            href={`#kalla-${source.id}`}
            title={source.label}
            className="rounded-sm px-0.5 hover:bg-teal-700/10"
          >
            [{number}]
          </a>
        );
      })}
    </span>
  );
}

export function SourceFootnotes({ sources }: { sources: SourceLink[] }) {
  if (!sources.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-slate-900/8 bg-slate-50/80 p-5">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Källor</p>
      <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
        {sources.map((source, index) => (
          <li key={source.id} id={`kalla-${source.id}`} className="scroll-mt-28">
            <span className="mr-2 font-medium text-slate-900">[{index + 1}]</span>
            <a href={source.url} target="_blank" rel="noreferrer" className="underline decoration-slate-300 underline-offset-4 hover:decoration-teal-700">
              {source.label}
            </a>
            {source.publisher ? <span className="text-slate-400"> — {source.publisher}</span> : null}
            {source.year ? <span className="text-slate-400"> ({source.year})</span> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function EvidenceBadge({ level }: { level?: string }) {
  if (!level) {
    return null;
  }

  return (
    <span className="inline-flex rounded-full border border-slate-900/8 bg-white px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
      Evidens: {level}
    </span>
  );
}
