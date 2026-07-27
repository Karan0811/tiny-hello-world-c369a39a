import { User, Sparkles, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "../types";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";
  const isTool = message.role === "tool";
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-background/60",
          isUser ? "text-foreground" : "text-primary",
        )}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5" />
        ) : isTool ? (
          <Wrench className="h-3.5 w-3.5" />
        ) : (
          <Sparkles className="h-3.5 w-3.5" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-sm leading-relaxed backdrop-blur",
          isUser && "bg-primary/10 border-primary/20",
          message.error && "border-destructive/40",
        )}
      >
        {message.content || (
          <span className="text-xs text-muted-foreground italic">No content</span>
        )}
        {message.error && (
          <div className="mt-1 text-xs text-destructive">{message.error}</div>
        )}
      </div>
    </div>
  );
}
