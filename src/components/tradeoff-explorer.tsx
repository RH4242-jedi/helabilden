"use client";

import { useMemo, useState } from "react";
import {
  tradeoffScenarios,
  type Perspective,
  type TradeoffScenario,
} from "@/data/tradeoffs";
import { EvidenceBadge, SourceFootnotes, SourceMarkers } from "@/components/source-citations";
import { buildSourceIndex } from "@/lib/sources";
import { cn } from "@/lib/utils";

function PerspectiveCard({
  perspective,
  scenario,
  steelmanMode,
  emphasized,
  label,
}: {
  perspective: Perspective;
  scenario: TradeoffScenario;
  steelmanMode: boolean;
  emphasized?: boolean;
  label?: string;
}) {
  const sourceIndex = useMemo(() => buildSourceIndex(scenario.sources), [scenario.sources]);

  return (
    <article
      className={cn(
        "rounded-3xl border p-6 transition",
        emphasized ? "border-teal-700/30 bg-teal-600/8 shadow-sm" : "border-slate-900/8 bg-white",
      )}
    >
      {label ? <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{label}</p> : null}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h4 className="text-xl font-semibold tracking-tight text-slate-950">{perspective.title}</h4>
      </div>
      <p className="mt-3 leading-7 text-slate-600">
        {steelmanMode ? perspective.steelman : perspective.summary}
      </p>

      <div className="mt-5 space-y-4">
        {perspective.arguments.map((argument) => (
          <div key={argument.title} className="rounded-2xl border border-slate-900/6 bg-slate-50/70 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-slate-900">{argument.title}</p>
              <EvidenceBadge level={argument.evidenceLevel} />
              <SourceMarkers sources={scenario.sources} sourceIds={argument.sourceIds} sourceIndex={sourceIndex} />
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{argument.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Risker</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
            {perspective.risks.map((risk) => (
              <li key={risk} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          {perspective.whoBenefits?.length ? (
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Vem gynnas?</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{perspective.whoBenefits.join(" · ")}</p>
            </div>
          ) : null}
          {perspective.whoPays?.length ? (
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Vem bär kostnaden?</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{perspective.whoPays.join(" · ")}</p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function BinaryTradeoff({
  scenario,
  steelmanMode,
}: {
  scenario: TradeoffScenario;
  steelmanMode: boolean;
}) {
  const [balance, setBalance] = useState(50);
  const [left, right] = scenario.perspectives;

  const emphasis = useMemo(() => {
    if (balance < 35) return "left";
    if (balance > 65) return "right";
    return "middle";
  }, [balance]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-900/8 bg-slate-50 p-5">
        <div className="mb-3 flex items-center justify-between gap-4 text-sm font-medium text-slate-700">
          <span>{left.title}</span>
          <span>{right.title}</span>
        </div>
        <input
          aria-label={scenario.title}
          type="range"
          min={0}
          max={100}
          step={1}
          value={balance}
          onChange={(event) => setBalance(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-teal-700 via-slate-300 to-emerald-500"
        />
        <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
          <span>0</span>
          <span>
            Balansläge:{" "}
            {emphasis === "middle" ? "Avvägning" : emphasis === "left" ? left.title : right.title}
          </span>
          <span>100</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PerspectiveCard
          perspective={left}
          scenario={scenario}
          steelmanMode={steelmanMode}
          emphasized={emphasis === "left"}
          label="Perspektiv A"
        />
        <PerspectiveCard
          perspective={right}
          scenario={scenario}
          steelmanMode={steelmanMode}
          emphasized={emphasis === "right"}
          label="Perspektiv B"
        />
      </div>
    </div>
  );
}

function MultiPerspectiveTradeoff({
  scenario,
  steelmanMode,
}: {
  scenario: TradeoffScenario;
  steelmanMode: boolean;
}) {
  const [activeId, setActiveId] = useState(scenario.perspectives[0]?.id);
  const active = scenario.perspectives.find((perspective) => perspective.id === activeId) ?? scenario.perspectives[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 rounded-3xl border border-slate-900/8 bg-slate-50 p-2">
        {scenario.perspectives.map((perspective) => (
          <button
            key={perspective.id}
            type="button"
            onClick={() => setActiveId(perspective.id)}
            className={cn(
              "rounded-2xl px-4 py-2 text-sm transition",
              activeId === perspective.id
                ? "bg-slate-950 text-white"
                : "bg-transparent text-slate-600 hover:bg-white hover:text-slate-950",
            )}
          >
            {perspective.title}
          </button>
        ))}
      </div>

      {active ? (
        <PerspectiveCard perspective={active} scenario={scenario} steelmanMode={steelmanMode} />
      ) : null}
    </div>
  );
}

function ScenarioLayers({ scenario }: { scenario: TradeoffScenario }) {
  const [steelmanMode, setSteelmanMode] = useState(false);
  const sourceIndex = useMemo(() => buildSourceIndex(scenario.sources), [scenario.sources]);
  const isBinary = scenario.perspectives.length === 2;

  return (
    <div className="space-y-8 rounded-[2rem] border border-slate-900/8 bg-white/85 p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="uppercase tracking-[0.24em]">{scenario.category}</span>
            <span>·</span>
            <span>Uppdaterad {scenario.updatedAt}</span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{scenario.title}</h3>
          <p className="leading-7 text-slate-600">{scenario.prompt}</p>
          <p className="text-sm leading-6 text-slate-500">{scenario.context}</p>
        </div>

        <button
          type="button"
          onClick={() => setSteelmanMode((value) => !value)}
          className={cn(
            "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition",
            steelmanMode
              ? "border-teal-700 bg-teal-700 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950",
          )}
        >
          Steelman Mode {steelmanMode ? "på" : "av"}
        </button>
      </div>

      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-teal-700">Lager 1 · Fakta / data</p>
          <h4 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">Det som går att förankra före tolkning</h4>
        </div>
        <div className="space-y-3">
          {scenario.facts.map((fact) => (
            <div key={fact.statement} className="rounded-2xl border border-slate-900/8 bg-slate-50/80 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <EvidenceBadge level={fact.evidenceLevel} />
                <SourceMarkers sources={scenario.sources} sourceIds={fact.sourceIds} sourceIndex={sourceIndex} />
              </div>
              <p className="mt-2 leading-7 text-slate-700">{fact.statement}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-teal-700">Lager 2 · Målkonflikter / tolkningar</p>
          <h4 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
            {isBinary ? "Två perspektiv i vågskål" : "Flera legitima perspektiv"}
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {isBinary
              ? "När det bara finns två tydliga poler fungerar en slider bäst."
              : "När frågan har tre eller fler legitima infallsvinklar visas flikar i stället för en binär låsning."}
          </p>
        </div>
        {isBinary ? (
          <BinaryTradeoff scenario={scenario} steelmanMode={steelmanMode} />
        ) : (
          <MultiPerspectiveTradeoff scenario={scenario} steelmanMode={steelmanMode} />
        )}
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-teal-700">Lager 3 · Vanliga felbilder</p>
          <h4 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">Missinformation och karikatyrer</h4>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {scenario.misconceptions.map((item) => (
            <div key={item.claim} className="rounded-3xl border border-slate-900/8 bg-white p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Vanlig felbild</p>
              <p className="mt-2 font-medium leading-7 text-slate-900">
                {item.claim}
                <SourceMarkers sources={scenario.sources} sourceIds={item.sourceIds} sourceIndex={sourceIndex} />
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.correction}</p>
            </div>
          ))}
        </div>
      </section>

      <SourceFootnotes sources={scenario.sources} />
    </div>
  );
}

export function TradeoffExplorer() {
  const [selectedId, setSelectedId] = useState(tradeoffScenarios[0]?.id);
  const selected = tradeoffScenarios.find((scenario) => scenario.id === selectedId) ?? tradeoffScenarios[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tradeoffScenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => setSelectedId(scenario.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition",
              selectedId === scenario.id
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-950",
            )}
          >
            {scenario.title}
          </button>
        ))}
      </div>

      {selected ? <ScenarioLayers scenario={selected} /> : null}
    </div>
  );
}
