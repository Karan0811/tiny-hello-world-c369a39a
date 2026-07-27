import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SurfaceCard } from "@/components/common";

type Props = {
  id: string;
  title: string;
  hint?: string;
  index?: number;
  children?: ReactNode;
};

/**
 * Reusable lesson section shell. Content slots in via `children` when the
 * educational material is authored; until then it renders a clearly-labelled
 * placeholder so the structure is reviewable.
 */
export function LessonSection({ id, title, hint, index, children }: Props) {
  const headingId = `${id}-heading`;
  return (
    <motion.section
      id={id}
      aria-labelledby={headingId}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: Math.min((index ?? 0) * 0.02, 0.2) }}
      className="scroll-mt-24"
    >
      <SurfaceCard>
        <div className="flex items-baseline justify-between gap-3">
          <h3 id={headingId} className="text-sm font-medium tracking-tight text-foreground">
            {title}
          </h3>
          {index != null && (
            <span className="text-[10px] tabular-nums uppercase tracking-[0.14em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
        {children ?? (
          <div className="mt-3 rounded-lg border border-dashed border-border/60 bg-muted/10 px-4 py-6 text-center">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {hint ?? "Content for this section will be authored here."}
            </p>
          </div>
        )}
      </SurfaceCard>
    </motion.section>
  );
}
