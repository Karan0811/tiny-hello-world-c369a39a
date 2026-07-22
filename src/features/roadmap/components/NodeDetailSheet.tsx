import { ArrowRight, BookOpen, Clock, FolderKanban, GraduationCap, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { RoadmapNode } from "../types";
import { difficultyLabels, statusLabels } from "../utils";

type Props = {
  node: RoadmapNode | null;
  onOpenChange: (open: boolean) => void;
};

export function NodeDetailSheet({ node, onOpenChange }: Props) {
  const open = !!node;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        {node && (
          <>
            <SheetHeader>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-md text-[10px] uppercase tracking-[0.14em]">
                  {statusLabels[node.status]}
                </Badge>
                {node.difficulty && (
                  <Badge variant="secondary" className="rounded-md text-[10px]">
                    {difficultyLabels[node.difficulty]}
                  </Badge>
                )}
              </div>
              <SheetTitle className="text-left">{node.title}</SheetTitle>
              {node.description && (
                <SheetDescription className="text-left">
                  {node.description}
                </SheetDescription>
              )}
            </SheetHeader>

            <div className="mt-6 space-y-6 text-sm">
              <Grid>
                <Meta icon={Clock} label="Estimated time" value={node.estimatedHours ? `${node.estimatedHours}h` : "—"} />
                <Meta icon={Sparkles} label="Career benefit" value={node.careerBenefit ?? "—"} />
              </Grid>

              <Section title="Skills learned" items={node.requiredSkills ?? []} empty="No skills tagged yet." />

              <Section
                title="Prerequisites"
                items={(node.learningRefs ?? []).map((r) => r.categorySlug)}
                empty="No prerequisites declared."
              />

              <RefList
                icon={GraduationCap}
                title="Learning modules"
                items={(node.learningRefs ?? []).map((r) => ({
                  key: `${r.categorySlug}/${r.moduleSlug ?? "index"}`,
                  label: r.moduleSlug ?? r.categorySlug,
                }))}
              />
              <RefList
                icon={FolderKanban}
                title="Projects"
                items={(node.projectRefs ?? []).map((p) => ({ key: p, label: p }))}
              />
              <RefList
                icon={BookOpen}
                title="Resources"
                items={(node.resourceRefs ?? []).map((p) => ({ key: p, label: p }))}
              />

              <Separator />

              <div className="flex justify-end">
                {node.learningRefs?.[0] ? (
                  <Button asChild size="sm">
                    <Link
                      to="/learning/$category"
                      params={{ category: node.learningRefs[0].categorySlug }}
                    >
                      Continue learning
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                ) : (
                  <Button size="sm" disabled>
                    Continue learning
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-3">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-1 truncate text-sm text-foreground">{value}</div>
    </div>
  );
}

function Section({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </div>
      {items.length ? (
        <div className="flex flex-wrap gap-1.5">
          {items.map((i) => (
            <Badge key={i} variant="secondary" className="rounded-md text-[10px] font-normal">
              {i}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">{empty}</p>
      )}
    </div>
  );
}

function RefList({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Clock;
  title: string;
  items: { key: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        <Icon className="h-3 w-3" /> {title}
      </div>
      {items.length ? (
        <ul className="space-y-1.5">
          {items.map((i) => (
            <li
              key={i.key}
              className="rounded-md border border-border/50 bg-background/40 px-3 py-2 text-xs text-foreground/90"
            >
              {i.label}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-muted-foreground">No references linked yet.</p>
      )}
    </div>
  );
}
