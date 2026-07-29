import { FileText } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import type { MarkdownDoc } from "@/lib/content/types";

export function CheatsheetViewer({ doc }: { doc: MarkdownDoc | null }) {
  if (!doc) {
    return (
      <p className="text-sm text-muted-foreground">
        No cheat sheet is available for this lesson yet.
      </p>
    );
  }
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <FileText className="h-3.5 w-3.5" />
        Cheat sheet
      </div>
      <MarkdownRenderer doc={doc} />
    </div>
  );
}
