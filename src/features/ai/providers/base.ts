// Base helpers for future concrete provider adapters. No SDK code.
// Concrete adapters (openai, anthropic, ...) will import this and
// implement AIProviderAdapter.

import type {
  AICompletionRequest,
  AICompletionResult,
  AIProviderAdapter,
  AIProviderId,
  AIStreamEvent,
} from "../types";

export function createUnimplementedAdapter(
  id: AIProviderId,
  reason = "Provider not yet implemented.",
): AIProviderAdapter {
  return {
    id,
    isConfigured: () => false,
    listModels: () => [],
    complete: async (_req: AICompletionRequest): Promise<AICompletionResult> => {
      throw new Error(`[${id}] ${reason}`);
    },
    stream: async (
      _req: AICompletionRequest,
      _onEvent: (event: AIStreamEvent) => void,
    ): Promise<AICompletionResult> => {
      throw new Error(`[${id}] ${reason}`);
    },
  };
}
