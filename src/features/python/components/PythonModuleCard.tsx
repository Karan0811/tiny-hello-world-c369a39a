import { ModuleCard } from "@/features/learning/components";
import type { ModuleDefinition, LearningProgress } from "@/features/learning/types";

export function PythonModuleCard({
  module,
  progress,
}: {
  module: ModuleDefinition;
  progress?: LearningProgress;
}) {
  return <ModuleCard categorySlug="python" module={module} progress={progress} />;
}
