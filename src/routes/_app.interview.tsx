import { createFileRoute } from "@tanstack/react-router";
import {
  Code2,
  Database,
  Brain,
  Layers,
  Sparkles,
  Rocket,
  Boxes,
  Users,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { CategoryCard } from "@/components/common";
import { interviewCategories } from "@/config/domain";

const iconMap: Record<string, typeof Code2> = {
  python: Code2,
  sql: Database,
  "machine-learning": Brain,
  "deep-learning": Layers,
  genai: Sparkles,
  mlops: Rocket,
  "system-design": Boxes,
  behavioral: Users,
};

export const Route = createFileRoute("/_app/interview")({
  head: () => ({
    meta: [
      { title: "Interview · AI University" },
      { name: "description", content: "Interview preparation across Python, SQL, ML, deep learning, GenAI, MLOps, system design, and behavioral rounds." },
      { property: "og:title", content: "AI University · Interview prep" },
      { property: "og:description", content: "Prep for the AI/ML role, end to end." },
    ],
  }),
  component: InterviewPage,
});

function InterviewPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Interview prep"
        title="Prep for the role"
        description="Structured question banks by category. Content will populate as the platform grows."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {interviewCategories.map((c) => (
          <CategoryCard
            key={c.slug}
            icon={iconMap[c.slug]}
            title={c.name}
            meta="Question bank coming soon"
          />
        ))}
      </div>
    </PageContainer>
  );
}