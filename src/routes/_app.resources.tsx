import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  GraduationCap,
  Video,
  Rss,
  FileText,
  BookMarked,
  Database,
  Github,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { CategoryCard } from "@/components/common";
import { resourceCategories } from "@/config/domain";

const iconMap: Record<string, typeof BookOpen> = {
  books: BookOpen,
  courses: GraduationCap,
  videos: Video,
  blogs: Rss,
  docs: FileText,
  papers: BookMarked,
  datasets: Database,
  github: Github,
};

export const Route = createFileRoute("/_app/resources")({
  head: () => ({
    meta: [
      { title: "Resources · AI University" },
      { name: "description", content: "A curated library of books, courses, videos, blogs, docs, papers, datasets, and repositories for AI learners." },
      { property: "og:title", content: "AI University · Resources" },
      { property: "og:description", content: "The curated AI library." },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Resources"
        title="A curated AI library"
        description="Handpicked references across every category. Add entries per category as the platform grows."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {resourceCategories.map((c) => (
          <CategoryCard
            key={c.slug}
            icon={iconMap[c.slug]}
            title={c.name}
            description={c.description}
            meta="Curated entries coming soon"
          />
        ))}
      </div>
    </PageContainer>
  );
}