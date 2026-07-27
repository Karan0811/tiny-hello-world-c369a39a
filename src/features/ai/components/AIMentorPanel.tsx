import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type {
  AIContext,
  AIProviderDefinition,
  PromptTemplate,
} from "../types";
import { useAIMentor } from "../useAIMentor";
import { ConversationHeader } from "./ConversationHeader";
import { ChatMessage } from "./ChatMessage";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { PromptSuggestionCard } from "./PromptSuggestionCard";
import { AIContextCard } from "./AIContextCard";

export function AIMentorPanel({
  title = "AI Mentor",
  context,
  provider,
  modelLabel,
  suggestions = [],
  showContextCard = true,
}: {
  title?: string;
  context?: AIContext;
  provider?: AIProviderDefinition;
  modelLabel?: string;
  suggestions?: Pick<PromptTemplate, "id" | "label" | "description">[];
  showContextCard?: boolean;
}) {
  const { conversation, isThinking, sendUserMessage, reset } = useAIMentor({
    title,
    context,
    providerId: provider?.id,
    modelId: modelLabel,
  });
  const [input, setInput] = useState("");
  const canSend = false; // no provider wired yet — architecture only

  const empty = useMemo(() => conversation.messages.length === 0, [conversation.messages.length]);

  return (
    <SurfaceCard className="p-4">
      <ConversationHeader
        title={conversation.title}
        provider={provider}
        modelLabel={modelLabel}
        onReset={empty ? undefined : reset}
      />

      {showContextCard && (
        <div className="mt-3">
          <AIContextCard context={context} />
        </div>
      )}

      <div className="mt-3 flex flex-col gap-3">
        {empty && suggestions.length > 0 && (
          <div className="grid gap-2 sm:grid-cols-2">
            {suggestions.map((s) => (
              <PromptSuggestionCard
                key={s.id}
                template={s}
                onSelect={() => setInput(`${s.label}: `)}
              />
            ))}
          </div>
        )}
        {conversation.messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {isThinking && <ThinkingIndicator />}
      </div>

      <div className="mt-3 border-t border-border/60 pt-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI mentor…"
          className="min-h-[72px] resize-none bg-background/60"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {provider ? `${provider.name} · architecture ready` : "No provider connected"}
          </span>
          <Button
            size="sm"
            disabled={!canSend || !input.trim()}
            onClick={() => {
              if (!input.trim()) return;
              sendUserMessage(input.trim());
              setInput("");
            }}
          >
            <Send className="h-3.5 w-3.5" />
            Send
          </Button>
        </div>
      </div>
    </SurfaceCard>
  );
}
