import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { ReactNode } from "react";

export type LessonTabKey =
  | "overview"
  | "theory"
  | "code"
  | "visualization"
  | "practice"
  | "assignment"
  | "project"
  | "quiz"
  | "interview"
  | "revision"
  | "resources";

export type ModuleTabKey =
  | "overview"
  | "lessons"
  | "practice"
  | "projects"
  | "resources"
  | "notes"
  | "revision"
  | "interview";

export function TabbedSections({
  defaultValue,
  tabs,
}: {
  defaultValue: string;
  tabs: { value: string; label: string; content: ReactNode }[];
}) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
        {tabs.map((t) => (
          <TabsTrigger
            key={t.value}
            value={t.value}
            className="rounded-md border border-transparent px-3 py-1.5 text-xs data-[state=active]:border-border/60 data-[state=active]:bg-card"
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.value} value={t.value} className="mt-6">
          {t.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}