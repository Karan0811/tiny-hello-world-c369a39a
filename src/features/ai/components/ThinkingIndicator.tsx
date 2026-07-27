import { cn } from "@/lib/utils";

export function ThinkingIndicator({ label = "Thinking", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 text-xs text-muted-foreground", className)}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      {label}…
    </div>
  );
}
