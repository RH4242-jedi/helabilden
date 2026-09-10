import type { LucideIcon } from "lucide-react";
import { BarChart3, BookOpenCheck, Scale } from "lucide-react";

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
      "Utforska frågor med två eller flera legitima perspektiv, utan att tvinga in allt i höger/vänster.",
    href: "/malkonflikter",
    icon: Scale,
  },
  {
    title: "Metod",
    description:
      "Läs hur vi skiljer fakta från tolkning, hur evidensnivåer fungerar och hur osäkerhet redovisas.",
    href: "/metod",
    icon: BookOpenCheck,
  },
];
