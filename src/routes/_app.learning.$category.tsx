import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageContainer, PageSection } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  ModuleCard,
  SearchToolbar,
  DifficultyBadge,
} from "@/features/learning/components";
import { getCategoryIcon } from "@/features/learning/icons";
import { getCategory } from "@/config/learning";
import type {
  LearningCategoryDefinition,
  ModuleDefinition,
} from "@/features/learning/types";

export const Route = createFileRoute("/_app/learning/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Category — AI University" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.name} · AI University` },
        { name: "description", content: category.description },
        { property: "og:title", content: `${category.name} · AI University` },
        { property: "og:description", content: category.description },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: CategoryNotFound,
});

function CategoryPage() {
  const { category } = Route.useLoaderData() as {
    category: LearningCategoryDefinition;
  };
  const Icon = getCategoryIcon(category.iconKey);

  return (
    <PageContainer>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Link to="/learning">
            <ArrowLeft className="h-3.5 w-3.5" />
            All categories
          </Link>
        </Button>
      </div>
      <PageHeader
        eyebrow="Category"
        title={category.name}
        description={category.description}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-foreground/80">
              <Icon className="h-4 w-4" />
            </div>
            <DifficultyBadge difficulty={category.difficulty} />
          </div>
        }
      />

      <PageSection title="Modules" description="Structured tracks within this category">
        <div className="mb-4">
          <SearchToolbar />
        </div>
        {category.modules.length === 0 ? (
          <EmptyState
            title="Modules coming soon"
            description="This category's modules are being authored. The architecture is ready — content plugs in here."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.modules.map((m: ModuleDefinition) => (
              <ModuleCard key={m.slug} categorySlug={category.slug} module={m} />
            ))}
          </div>
        )}
      </PageSection>
    </PageContainer>
  );
}

function CategoryNotFound() {
  return (
    <PageContainer>
      <EmptyState
        title="Category not found"
        description="This category doesn't exist yet."
        action={
          <Button asChild size="sm" variant="outline">
            <Link to="/learning">Back to Learning</Link>
          </Button>
        }
      />
    </PageContainer>
  );
}