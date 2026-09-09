"use client";

import { useMemo, useState } from "react";
import { tradeoffScenarios } from "@/data/tradeoffs";
import { cn } from "@/lib/utils";

const defaultScenario = tradeoffScenarios[0];

export function TradeoffExplorer() {
  const [balance, setBalance] = useState(50);
  const [steelmanMode, setSteelmanMode] = useState(false);

  const emphasis = useMemo(() => {
    if (balance < 35) {
      return "left";
    }

    if (balance > 65) {
      return "right";
    }

    return "middle";
  }, [balance]);

  return (
    <div className="space-y-6 rounded-[2rem] border border-slate-900/8 bg-white/85 p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Interaktiv målkonflikt</p>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{defaultScenario.title}</h3>
          <p className="leading-7 text-slate-600">{defaultScenario.prompt}</p>
          <p className="text-sm leading-6 text-slate-500">{defaultScenario.context}</p>
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

      <div className="rounded-3xl border border-slate-900/8 bg-slate-50 p-5">
        <div className="mb-3 flex items-center justify-between gap-4 text-sm font-medium text-slate-700">
          <span>{defaultScenario.leftLabel}</span>
          <span>{defaultScenario.rightLabel}</span>
        </div>
        <input
          aria-label={defaultScenario.title}
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
          <span>Balansläge: {emphasis === "middle" ? "Avvägning" : emphasis === "left" ? "Jämlikhet" : "Marknad"}</span>
          <span>100</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article
          className={cn(
            "rounded-3xl border p-6 transition",
            emphasis === "left"
              ? "border-teal-700/30 bg-teal-600/8 shadow-sm"
              : "border-slate-900/8 bg-white",
          )}
        >
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Spalt A</p>
          <h4 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{defaultScenario.left.title}</h4>
          <p className="mt-3 leading-7 text-slate-600">{steelmanMode ? defaultScenario.left.steelman : defaultScenario.left.summary}</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            {defaultScenario.left.effects.map((effect) => (
              <li key={effect} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                <span>{effect}</span>
              </li>
            ))}
          </ul>
        </article>

        <article
          className={cn(
            "rounded-3xl border p-6 transition",
            emphasis === "right"
              ? "border-emerald-700/30 bg-emerald-600/8 shadow-sm"
              : "border-slate-900/8 bg-white",
          )}
        >
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Spalt B</p>
          <h4 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{defaultScenario.right.title}</h4>
          <p className="mt-3 leading-7 text-slate-600">{steelmanMode ? defaultScenario.right.steelman : defaultScenario.right.summary}</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            {defaultScenario.right.effects.map((effect) => (
              <li key={effect} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                <span>{effect}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
