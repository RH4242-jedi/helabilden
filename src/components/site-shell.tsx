import Link from "next/link";

const navigation = [
  { href: "/", label: "Hem" },
  { href: "/enighetsindex", label: "Enighetsindex" },
  { href: "/malkonflikter", label: "Målkonflikter" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.18),transparent_60%)]" />
      <header className="sticky top-0 z-30 border-b border-slate-900/8 bg-white/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-900/10 bg-white text-sm font-semibold text-slate-900 shadow-sm">
              A
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-900">Avpolarisera.se</p>
              <p className="text-xs text-slate-500">Fakta, målkonflikter och voteringsdata</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-slate-900/8 bg-white/80 p-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-900/8 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Byggt för att göra svensk politik mindre teatralisk och mer begriplig.</p>
          <p>Källstöd, Riksdagsdata och fler sakområden kan fyllas på stegvis i samma struktur.</p>
        </div>
      </footer>
    </div>
  );
}
