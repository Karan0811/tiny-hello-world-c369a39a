import { SurfaceCard, EmptyState } from "@/components/common";
import { Workflow } from "lucide-react";
import type { ImplementationFlow as Flow, ImplementationStep } from "../types";

const sections: { key: keyof Flow; label: string }[] = [
  { key: "problemStatement", label: "Problem Statement" },
  { key: "businessContext", label: "Business Context" },
  { key: "architecture", label: "Architecture" },
  { key: "folderStructure", label: "Folder Structure" },
  { key: "environmentSetup", label: "Environment Setup" },
  { key: "implementation", label: "Implementation" },
  { key: "evaluation", label: "Evaluation" },
  { key: "testing", label: "Testing" },
  { key: "optimization", label: "Optimization" },
  { key: "deployment", label: "Deployment" },
  { key: "resumePoints", label: "Resume Points" },
  { key: "portfolioTips", label: "Portfolio Tips" },
  { key: "interviewQuestions", label: "Interview Questions" },
];

export function ImplementationFlowView({ flow }: { flow?: Flow }) {
  if (!flow) {
    return (
      <EmptyState
        icon={Workflow}
        title="Implementation flow pending"
        description="Every project defines problem, architecture, environment, implementation, evaluation, testing, optimization, and deployment."
      />
    );
  }
  return (
    <div className="space-y-3">
      {sections.map(({ key, label }) => {
        const value = flow[key];
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        return (
          <SurfaceCard key={key}>
            <div className="space-y-2">
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </div>
              {typeof value === "string" ? (
                <p className="text-sm leading-relaxed text-muted-foreground">{value}</p>
              ) : Array.isArray(value) && typeof value[0] === "string" ? (
                <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                  {(value as string[]).map((v, i) => <li key={i}>{v}</li>)}
                </ul>
              ) : (
                <ul className="space-y-2">
                  {(value as ImplementationStep[]).map((step) => (
                    <li key={step.id} className="rounded-lg border border-border/60 bg-background/40 p-3">
                      <div className="text-sm font-medium text-foreground">{step.title}</div>
                      {step.summary && (
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {step.summary}
                        </p>
                      )}
                      {(step.notes ?? []).length > 0 && (
                        <ul className="mt-1 ml-4 list-disc space-y-0.5 text-xs text-muted-foreground">
                          {step.notes!.map((n, i) => <li key={i}>{n}</li>)}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </SurfaceCard>
        );
      })}
    </div>
  );
}
