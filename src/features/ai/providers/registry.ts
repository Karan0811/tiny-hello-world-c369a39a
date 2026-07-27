// Provider registry — architecture only. Adapters are registered here
// once implemented; the UI selects providers through this registry so
// no component ever imports a concrete SDK directly.

import type { AIProviderAdapter, AIProviderId } from "../types";

const registry = new Map<AIProviderId, AIProviderAdapter>();

export function registerProvider(adapter: AIProviderAdapter) {
  registry.set(adapter.id, adapter);
}

export function getProvider(id: AIProviderId): AIProviderAdapter | undefined {
  return registry.get(id);
}

export function listRegisteredProviders(): AIProviderAdapter[] {
  return Array.from(registry.values());
}

export function isProviderConfigured(id: AIProviderId): boolean {
  return registry.get(id)?.isConfigured() ?? false;
}
