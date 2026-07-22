import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export function SurfaceCard({ children, className, interactive }: Props) {
  return (
    <motion.div
      whileHover={interactive ? { y: -2 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur",
        interactive && "cursor-pointer transition-colors hover:border-border hover:bg-card",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}