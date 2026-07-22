import { createFileRoute } from "@tanstack/react-router";
import { Sprout, Wrench, Zap, Rocket } from "lucide-react";
import { PageContainer, PageSection } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard, EmptyState } from "@/components/common";
import { projectTiers } from "@/config/domain";
import { FolderKanban } from "lucide-react";

const tierIcon = {
  beginner: Sprout,
  intermediate: Wrench,
  advanced: Zap,
  production: Rocket,
} as const;

export const Route = createFileRoute("/_app/projects")({
  head: () => ({
    meta: [
      { title: "Projects · AI University" },
      { name: "description", content: "Hands-on AI projects tiered from beginner to production — each with steps, resources, deployment, and interview prep." },
      { property: "og:title", content: "AI University · Projects" },
      { property: "og:description", content: "Applied AI builds, tiered by depth." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Projects"
        title="Applied AI, built to production"
        description="Every project ships with a scaffold for description, steps, resources, GitHub, deployment, and interview questions."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projectTiers.map((tier) => {
          const Icon = tierIcon[tier.slug];
          return (
            <SurfaceCard key={tier.slug} interactive className="h-full">
              <div className="flex h-full flex-col gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-tight">{tier.name}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {tier.description}
                  </p>
                </div>
                <div className="mt-auto border-t border-border/50 pt-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
                  Coming soon
                </div>
              </div>
            </SurfaceCard>
          );
        })}
      </div>

      <PageSection title="Your projects" description="Builds you own">
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Projects will appear here as tracks are released. Each project supports steps, resources, GitHub, deployment notes, and interview questions."
        />
      </PageSection>
    </PageContainer>
  );
}