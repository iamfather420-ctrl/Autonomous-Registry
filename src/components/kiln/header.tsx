import { Link, useRouterState } from "@tanstack/react-router";
import { Mark } from "@/components/kiln/shell";

const LINKS = [
  { to: "/", label: "Registry", exact: true },
  { to: "/forge", label: "Foundry", exact: false },
  { to: "/shelf", label: "Shelf", exact: false },
] as const;

export function AppHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link to="/" className="inline-flex h-11 items-center gap-2 text-fg">
          <Mark className="size-7" />
          <span className="font-display text-xl leading-none tracking-tight">Kiln</span>
        </Link>
        <nav className="flex items-center" aria-label="Primary">
          {LINKS.map((link) => {
            const active = link.exact ? pathname === link.to : pathname === link.to || pathname.startsWith(`${link.to}/`);
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-11 items-center px-2.5 text-sm font-medium sm:px-3 ${
                  active ? "text-fg" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
