import type { LucideIcon } from "lucide-react";
import { BarChart3, Scale, ShieldCheck } from "lucide-react";

export type FeatureCard = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const featureCards: FeatureCard[] = [
  {
    title: "Enighetsindexet",
    description:
      "Visualisera hur ofta partier faktiskt röstar lika, trots en debatt som nästan alltid fokuserar på konflikt.",
    href: "/enighetsindex",
    icon: BarChart3,
  },
  {
    title: "Målkonflikter",
    description:
      "Utforska varför svåra frågor sällan har perfekta lösningar och hur olika prioriteringar ger olika konsekvenser.",
    href: "/malkonflikter",
    icon: Scale,
  },
  {
    title: "Faktaspår",
    description:
      "Byggt för att senare bära källor, historik och sammanhang på ett sätt som står emot missinformation och klicklogik.",
    href: "#principer",
    icon: ShieldCheck,
  },
];
