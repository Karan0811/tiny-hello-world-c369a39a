import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { SurfaceCard } from "@/components/common";
import type { ModuleDefinition } from "@/features/learning/types";

export function PythonSidebar({
  modules,
  activeModuleSlug,
}: {
  modules: ModuleDefinition[];
  activeModuleSlug?: string;
}) {
  return (
    <SurfaceCard className="sticky top-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Python
      </div>
      <div className="mt-1 text-sm font-medium tracking-tight text-foreground">
        All modules
      </div>
      <div className="mt-4 space-y-1">
        {modules.map((m, i) => {
          const active = m.slug === activeModuleSlug;
          return (
            <Link
              key={m.slug}
              to="/learning/$category/$module"
              params={{ category: "python", module: m.slug }}
              className={cn(
                "flex items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-card hover:text-foreground",
                active && "border-border/60 bg-card text-foreground",
              )}
            >
              <span className="w-6 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate">{m.title}</span>
            </Link>
          );
        })}
      </div>
    </SurfaceCard>
  );
}
