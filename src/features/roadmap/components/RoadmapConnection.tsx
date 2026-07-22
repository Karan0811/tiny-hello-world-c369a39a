import { cn } from "@/lib/utils";

type Props = {
  variant?: "solid" | "dashed";
  branch?: boolean;
};

// Vertical connector between two nodes on the roadmap canvas.
export function RoadmapConnection({ variant = "solid", branch }: Props) {
  return (
    <div className="flex h-8 w-full items-center justify-center" aria-hidden>
      <div
        className={cn(
          "h-full w-px",
          variant === "dashed"
            ? "border-l border-dashed border-border/70"
            : "bg-gradient-to-b from-border/70 via-border/40 to-border/70",
          branch && "opacity-60",
        )}
      />
    </div>
  );
}
