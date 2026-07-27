import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import {
  Module1Breadcrumb,
  ModuleCompletionScreen,
} from "@/features/python/module1/components";
import { useModule1Progress } from "@/features/python/module1/progress";

export const Route = createFileRoute("/_app/learning/python/module-1/complete")({
  head: () => ({
    meta: [
      { title: "Module 1 Complete · Python · AI University" },
      {
        name: "description",
        content:
          "Your Python Module 1 completion summary: lessons finished, time spent, and the path into Module 2.",
      },
      { property: "og:title", content: "Python Module 1 Complete · AI University" },
      {
        property: "og:description",
        content: "Review your Module 1 progress summary and continue to Module 2.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Module1CompletePage,
});

function Module1CompletePage() {
  const progress = useModule1Progress();

  return (
    <PageContainer>
      <Module1Breadcrumb lessonTitle="Completion" />
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Link to="/learning/python/module-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            Module 1
          </Link>
        </Button>
      </div>
      <h1 className="sr-only">Python Module 1 completion summary</h1>
      <ModuleCompletionScreen
        completedCount={progress.completedCount}
        totalLessons={progress.totalLessons}
        completionPct={progress.completionPct}
        totalSeconds={progress.totalSeconds}
        moduleCompleted={progress.moduleCompleted}
      />
    </PageContainer>
  );
}
