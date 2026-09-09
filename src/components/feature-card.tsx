import Link from "next/link";
import type { FeatureCard as FeatureCardType } from "@/data/site-content";

export function FeatureCard({ title, description, href, icon: Icon }: FeatureCardType) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-slate-900/8 bg-white/80 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-900/14 hover:shadow-lg"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600/10 text-teal-700">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
        <p className="leading-7 text-slate-600">{description}</p>
        <span className="inline-flex items-center text-sm font-medium text-slate-900">
          Utforska vidare <span className="ml-2 transition group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}
