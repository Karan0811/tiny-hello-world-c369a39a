// Local-state mentor hook. Architecture-only — no network calls.
// Manages a Conversation for a given surface and exposes actions
// that future provider adapters will fulfil.

import { useCallback, useMemo, useState } from "react";
import type {
  AIContext,
  AIFeatureId,
  AIProviderId,
  ChatMessage,
  Conversation,
  PromptTemplateId,
} from "./types";

export type AIMentorState = {
  conversation: Conversation;
  isThinking: boolean;
  sendUserMessage: (content: string, templateId?: PromptTemplateId, featureId?: AIFeatureId) => void;
  runAction: (featureId: AIFeatureId, input?: string) => void;
  reset: () => void;
};

function makeId() {
  return `id_${Math.random().toString(36).slice(2, 10)}`;
}

export function useAIMentor(options: {
  title?: string;
  context?: AIContext;
  providerId?: AIProviderId;
  modelId?: string;
}): AIMentorState {
  const [conversation, setConversation] = useState<Conversation>(() => ({
    id: makeId(),
    title: options.title ?? "New conversation",
    createdAt: new Date().toISOString(),
    providerId: options.providerId,
    modelId: options.modelId,
    context: options.context,
    messages: [],
  }));

  const sendUserMessage = useCallback(
    (content: string, templateId?: PromptTemplateId, featureId?: AIFeatureId) => {
      const msg: ChatMessage = {
        id: makeId(),
        role: "user",
        content,
        createdAt: new Date().toISOString(),
        templateId,
        featureId,
      };
      setConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, msg],
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const runAction = useCallback((featureId: AIFeatureId, input?: string) => {
    sendUserMessage(input ?? "", undefined, featureId);
  }, [sendUserMessage]);

  const reset = useCallback(() => {
    setConversation((prev) => ({ ...prev, messages: [] }));
  }, []);

  return useMemo(
    () => ({ conversation, isThinking: false, sendUserMessage, runAction, reset }),
    [conversation, sendUserMessage, runAction, reset],
  );
}
