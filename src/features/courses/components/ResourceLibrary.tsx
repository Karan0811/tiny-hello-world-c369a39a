import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { SearchComponent } from "./SearchComponent";
import { resourceCategories } from "@/config/courses";
import type { MarkdownDoc } from "@/lib/content/types";

export type LoadedResourceDoc = MarkdownDoc & {
  courseId: string;
  slug: string;
  title: string;
  categoryKey: string;
};

export function ResourceLibrary({ docs }: { docs: LoadedResourceDoc[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const available = resourceCategories.filter((c) =>
    docs.some((d) => d.categoryKey === c.key),
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return docs.filter((doc) => {
      if (category !== "all" && doc.categoryKey !== category) return false;
      if (!q) return true;
      return (
        doc.title.toLowerCase().includes(q) || doc.body.toLowerCase().includes(q)
      );
    });
  }, [category, docs, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Chip
            label={`All (${docs.length})`}
            active={category === "all"}
            onClick={() => setCategory("all")}
          />
          {available.map((c) => (
            <Chip
              key={c.key}
              label={c.label}
              active={category === c.key}
              onClick={() => setCategory(c.key)}
            />
          ))}
        </div>
        <div className="w-full sm:w-72">
          <SearchComponent
            value={query}
            onChange={setQuery}
            placeholder="Search the library…"
          />
        </div>
      </div>

      {filtered.length ? (
        <div className="space-y-4">
          {filtered.map((doc) => (
            <details
              key={`${doc.courseId}-${doc.slug}`}
              className="rounded-xl border border-border/60 bg-card p-5"
            >
              <summary className="flex cursor-pointer flex-wrap items-center gap-2 text-sm font-medium">
                {doc.title}
                <Badge variant="secondary" className="text-[10px]">
                  {resourceCategories.find((c) => c.key === doc.categoryKey)?.label ??
                    doc.categoryKey}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {doc.courseId}
                </Badge>
              </summary>
              <div className="mt-4">
                <MarkdownRenderer doc={doc} />
              </div>
            </details>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
          Nothing matches “{query}”.
        </p>
      )}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick}>
      <Badge
        variant={active ? "default" : "secondary"}
        className="cursor-pointer text-[11px]"
      >
        {label}
      </Badge>
    </button>
  );
}
