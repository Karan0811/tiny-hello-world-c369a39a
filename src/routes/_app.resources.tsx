import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResourceLibrary } from "@/features/courses/components";
import { loadAllResourceDocs } from "@/lib/content/loader";

export const Route = createFileRoute("/_app/resources")({
  head: () => ({
    meta: [
      { title: "Resources · AI University" },
      {
        name: "description",
        content:
          "A curated library of documentation, books, videos, repositories, blogs, practice sets, tools, and conferences — loaded straight from the content directory.",
      },
      { property: "og:title", content: "AI University · Resources" },
      { property: "og:description", content: "The curated AI library." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => loadAllResourceDocs(),
  component: ResourcesPage,
  errorComponent: ({ error }) => (
    <PageContainer>
      <p role="alert" className="text-sm text-destructive">
        {error.message}
      </p>
    </PageContainer>
  ),
  notFoundComponent: () => (
    <PageContainer>
      <p className="text-sm text-muted-foreground">No resources found.</p>
    </PageContainer>
  ),
});

function ResourcesPage() {
  const docs = Route.useLoaderData();
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Resources"
        title="A curated AI library"
        description="Every entry is rendered from markdown in the content directory. Update a file, and this page updates with it."
      />
      <div className="mt-8">
        <ResourceLibrary docs={docs} />
      </div>
    </PageContainer>
  );
}
