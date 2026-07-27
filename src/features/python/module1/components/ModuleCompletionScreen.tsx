import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, GraduationCap, Lock, Trophy } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { ModuleProgressBar } from "./ModuleProgressBar";
import { formatDuration } from "../progress";
import { pythonModule1 } from "@/config/python-module-1";

type Props = {
  completedCount: number;
  totalLessons: number;
  completionPct: number;
  totalSeconds: number;
  moduleCompleted: boolean;
};

export function ModuleCompletionScreen({
  completedCount,
  totalLessons,
  completionPct,
  totalSeconds,
  moduleCompleted,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <SurfaceCard className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-border/60 bg-background/60"
        >
          <Trophy
            className={moduleCompleted ? "h-6 w-6 text-emerald-500" : "h-6 w-6 text-muted-foreground"}
            aria-hidden="true"
          />
        </motion.div>

        <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          {moduleCompleted ? "Module completed" : "Almost there"}
        </h2>
        <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">
          {moduleCompleted
            ? `You finished ${pythonModule1.title}. Your environment is ready for real Python work.`
            : `Complete all ${totalLessons} lessons to unlock Module ${pythonModule1.nextModule.number}.`}
        </p>

        <div className="mx-auto mt-6 grid max-w-lg gap-3 sm:grid-cols-3">
          <Stat icon={GraduationCap} label="Lessons" value={`${completedCount}/${totalLessons}`} />
          <Stat icon={Clock} label="Time spent" value={formatDuration(totalSeconds)} />
          <Stat icon={Trophy} label="Progress" value={`${completionPct}%`} />
        </div>

        <ModuleProgressBar
          className="mx-auto mt-6 max-w-lg"
          value={completionPct}
          label="Module progress"
        />

        <div className="mt-6 flex flex-col items-center gap-2">
          <Button size="sm" disabled={!moduleCompleted} aria-disabled={!moduleCompleted}>
            {!moduleCompleted && <Lock className="h-3.5 w-3.5" />}
            Continue to Module {pythonModule1.nextModule.number}
            {moduleCompleted && <ArrowRight className="h-3.5 w-3.5" />}
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/learning/python/module-1">Back to module overview</Link>
          </Button>
        </div>
      </SurfaceCard>
    </motion.div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 px-3 py-3">
      <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <Icon className="h-3 w-3" aria-hidden="true" />
        {label}
      </div>
      <div className="mt-1 text-sm font-medium tabular-nums text-foreground">{value}</div>
    </div>
  );
}
