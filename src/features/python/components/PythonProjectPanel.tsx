import { SurfaceCard, EmptyState } from "@/components/common";
import { pythonProjects } from "@/config/python";

export function PythonProjectPanel() {
  if (pythonProjects.length === 0) {
    return (
      <EmptyState
        title="Python projects coming soon"
        description="Project architecture is ready — builds plug in from config."
      />
    );
  }
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {pythonProjects.map((p) => (
        <SurfaceCard key={p.slug}>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium tracking-tight">{p.title}</div>
            <span className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {p.difficulty}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{p.summary}</p>
        </SurfaceCard>
      ))}
    </div>
  );
}
