import { LessonCard } from "@/features/learning/components";
import type { LessonRef } from "@/features/learning/types";

export function PythonLessonCard({
  moduleSlug,
  lesson,
  index,
}: {
  moduleSlug: string;
  lesson: LessonRef;
  index?: number;
}) {
  return (
    <LessonCard
      categorySlug="python"
      moduleSlug={moduleSlug}
      lesson={lesson}
      index={index}
    />
  );
}
