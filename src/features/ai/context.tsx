// AI context provider. Wraps a subtree with an AIContext object so
// components can call useAIContext() to read the active surface,
// selection, learning history, and profile hints.
//
// No persistence, no side effects — purely in-memory architecture.

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AIContext } from "./types";

type AIContextValue = {
  context: AIContext;
  setContext: (next: AIContext) => void;
  patchContext: (patch: Partial<AIContext>) => void;
};

const Ctx = createContext<AIContextValue | null>(null);

export function AIContextProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: AIContext;
}) {
  const [context, setContext] = useState<AIContext>(initial ?? {});
  const value = useMemo<AIContextValue>(
    () => ({
      context,
      setContext,
      patchContext: (patch) => setContext((prev) => ({ ...prev, ...patch })),
    }),
    [context],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAIContext(): AIContextValue {
  const v = useContext(Ctx);
  if (!v) {
    // Return an inert value so components render safely outside a provider.
    return {
      context: {},
      setContext: () => {},
      patchContext: () => {},
    };
  }
  return v;
}
