import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, StickyNote, Tag } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_app/notes")({
  head: () => ({
    meta: [
      { title: "Notes · AI University" },
      { name: "description", content: "Your markdown-ready knowledge base — capture insights, tag them, and search across everything you learn." },
      { property: "og:title", content: "AI University · Notes" },
      { property: "og:description", content: "Your personal AI knowledge base." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Notes"
        title="Your knowledge base"
        description="Markdown-first notes with tags and search. Wire persistence in a later prompt."
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New note
          </Button>
        }
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-[280px_1fr]">
        <SurfaceCard className="h-fit">
          <div className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search notes…" className="pl-8" />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <Tag className="h-3.5 w-3.5" />
                Tags
              </div>
              <div className="rounded-md border border-dashed border-border/60 px-3 py-6 text-center text-xs text-muted-foreground">
                No tags yet
              </div>
            </div>
          </div>
        </SurfaceCard>

        <EmptyState
          icon={StickyNote}
          title="No notes yet"
          description="Capture insights from lessons, papers, and projects. Notes will render markdown and support tags."
          action={
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Create your first note
            </Button>
          }
        />
      </div>
    </PageContainer>
  );
}