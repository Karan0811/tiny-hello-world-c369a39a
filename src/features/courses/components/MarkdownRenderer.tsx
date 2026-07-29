import { cn } from "@/lib/utils";
import type { MarkdownDoc } from "@/lib/content/types";

// Markdown/MDX renderer. Content is authored in-repo and compiled by the
// content layer, so the parsed HTML is trusted output of our own pipeline.
export function MarkdownRenderer({
  doc,
  className,
}: {
  doc: MarkdownDoc;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-none text-sm leading-relaxed text-foreground/90",
        "[&_h1]:mt-0 [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-foreground",
        "[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:scroll-mt-24 [&_h2]:border-b [&_h2]:border-border/60 [&_h2]:pb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground",
        "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:scroll-mt-24 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_p]:my-3",
        "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5",
        "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5",
        "[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8em]",
        "[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border/60 [&_pre]:bg-muted/50 [&_pre]:p-4",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[0.8rem] [&_pre_code]:leading-relaxed",
        "[&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left",
        "[&_th]:border-b [&_th]:border-border [&_th]:py-2 [&_th]:pr-4 [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-muted-foreground",
        "[&_td]:border-b [&_td]:border-border/50 [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top",
        "[&_details]:my-4 [&_details]:rounded-lg [&_details]:border [&_details]:border-border/60 [&_details]:bg-card/50 [&_details]:p-4",
        "[&_summary]:cursor-pointer [&_summary]:font-medium [&_summary]:text-foreground",
        "[&_hr]:my-6 [&_hr]:border-border/60",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: doc.html }}
    />
  );
}
