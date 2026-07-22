import {
  BookOpen,
  FileText,
  Github,
  Newspaper,
  Play,
  Database,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { SurfaceCard, EmptyState } from "@/components/common";
import type { ResourceKind, ResourceRef } from "../types";

const kindMeta: Record<ResourceKind, { label: string; icon: LucideIcon }> = {
  docs: { label: "Official Documentation", icon: FileText },
  videos: { label: "Videos", icon: Play },
  articles: { label: "Articles", icon: Newspaper },
  books: { label: "Books", icon: BookOpen },
  papers: { label: "Research Papers", icon: ScrollText },
  github: { label: "GitHub Repositories", icon: Github },
  datasets: { label: "Datasets", icon: Database },
};

const kindOrder: ResourceKind[] = [
  "docs",
  "videos",
  "articles",
  "books",
  "papers",
  "github",
  "datasets",
];

export function ResourcePanel({ resources = [] }: { resources?: ResourceRef[] }) {
  const grouped = new Map<ResourceKind, ResourceRef[]>();
  resources.forEach((r) => {
    const list = grouped.get(r.kind) ?? [];
    list.push(r);
    grouped.set(r.kind, list);
  });

  return (
    <div className="space-y-3">
      {kindOrder.map((kind) => {
        const items = grouped.get(kind) ?? [];
        const meta = kindMeta[kind];
        const Icon = meta.icon;
        return (
          <SurfaceCard key={kind}>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-background/60 text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="text-sm font-medium tracking-tight">{meta.label}</div>
              <div className="ml-auto text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {items.length ? `${items.length} items` : "—"}
              </div>
            </div>
            {items.length ? (
              <ul className="mt-3 space-y-1.5">
                {items.map((r) => (
                  <li
                    key={`${r.kind}-${r.title}`}
                    className="rounded-md border border-border/50 bg-background/40 px-3 py-2 text-xs text-foreground"
                  >
                    {r.title}
                    {r.note && (
                      <span className="ml-2 text-muted-foreground">— {r.note}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                className="mt-4 border-none bg-transparent px-0 py-4"
                title={`${meta.label} — coming soon`}
                description="Curated links plug in here as this section is authored."
              />
            )}
          </SurfaceCard>
        );
      })}
    </div>
  );
}