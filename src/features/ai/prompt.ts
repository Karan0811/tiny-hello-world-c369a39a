// Prompt template rendering. Pure functions — safe to call from
// anywhere. Templates use {{variable}} placeholders resolved against
// a variables map and/or an AIContext ref.

import type { AIContext, PromptTemplate } from "./types";

export function renderTemplate(
  template: PromptTemplate,
  variables: Record<string, string> = {},
  context?: AIContext,
): { system: string; user: string } {
  const merged: Record<string, string> = {
    ...variables,
    context: describeContext(context),
    topic: variables.topic ?? context?.ref?.title ?? "",
  };
  return {
    system: interpolate(template.system, merged),
    user: interpolate(template.user, merged),
  };
}

export function describeContext(context?: AIContext): string {
  if (!context?.ref) return "";
  const parents = context.ref.parents?.map((p) => p.title).join(" › ");
  return parents ? `${parents} › ${context.ref.title}` : context.ref.title;
}

function interpolate(input: string, vars: Record<string, string>): string {
  return input.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => vars[key] ?? "");
}
