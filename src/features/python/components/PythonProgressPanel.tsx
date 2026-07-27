import { BookOpen, Dumbbell, ClipboardCheck, Rocket, Repeat, Sparkles } from "lucide-react";
import { ProgressCard } from "@/features/learning/components";
import type { LearningProgress } from "@/features/learning/types";

// Architecture-only. Values default to undefined until progress is wired.
export function PythonProgressPanel({ progress }: { progress?: LearningProgress }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <ProgressCard icon={BookOpen} label="Lesson progress" value={progress?.completionPct} hint="Across all Python modules" />
      <ProgressCard icon={Dumbbell} label="Practice progress" value={progress?.practiceCompleted} hint="Exercises completed" />
      <ProgressCard icon={ClipboardCheck} label="Quiz progress" hint="Comprehension checks" />
      <ProgressCard icon={Rocket} label="Project progress" value={progress?.projectsCompleted} hint="Applied builds" />
      <ProgressCard icon={Repeat} label="Revision progress" value={progress?.revisionCompleted} hint="Spaced repetition" />
      <ProgressCard icon={Sparkles} label="Interview readiness" hint="Curated prep coverage" />
    </div>
  );
}
