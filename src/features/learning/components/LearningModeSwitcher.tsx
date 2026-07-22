import { BookOpen, Hammer, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LearningMode } from "../types";

const modes: { value: LearningMode; label: string; icon: typeof BookOpen }[] = [
  { value: "learn", label: "Learn", icon: BookOpen },
  { value: "practice", label: "Practice", icon: Terminal },
  { value: "build", label: "Build", icon: Hammer },
];

export function LearningModeSwitcher({
  value,
  onChange,
}: {
  value?: LearningMode;
  onChange?: (mode: LearningMode) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-1">
      {modes.map((m) => {
        const Icon = m.icon;
        const active = value === m.value;
        return (
          <button
            key={m.value}
            type="button"
            onClick={() => onChange?.(m.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {m.label}
          </button>
        );
      })}
    </div>
  );
}