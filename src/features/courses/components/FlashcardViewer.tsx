import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Flashcard } from "@/lib/content/types";

type Props = {
  cards: Flashcard[];
  knownIndexes?: number[];
  onToggleKnown?: (index: number) => void;
};

export function FlashcardViewer({ cards, knownIndexes = [], onToggleKnown }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [revisionOnly, setRevisionOnly] = useState(false);

  const known = new Set(knownIndexes);
  const pool = revisionOnly
    ? cards.map((c, i) => ({ card: c, i })).filter(({ i }) => !known.has(i))
    : cards.map((c, i) => ({ card: c, i }));

  if (!cards.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No flashcards are defined for this lesson yet.
      </p>
    );
  }

  if (!pool.length) {
    return (
      <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
        <Sparkles className="mx-auto h-5 w-5 text-primary" />
        <p className="mt-2 text-sm font-medium">Every card is marked as known</p>
        <Button
          className="mt-4"
          size="sm"
          variant="outline"
          onClick={() => setRevisionOnly(false)}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Review all cards
        </Button>
      </div>
    );
  }

  const position = Math.min(index, pool.length - 1);
  const { card, i: cardIndex } = pool[position];

  const move = (delta: number) => {
    setFlipped(false);
    setIndex((prev) => (prev + delta + pool.length) % pool.length);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted-foreground">
          Card {position + 1} of {pool.length}
        </span>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            {known.size}/{cards.length} known
          </Badge>
          <Button
            size="sm"
            variant={revisionOnly ? "default" : "outline"}
            className="h-7 text-xs"
            onClick={() => {
              setRevisionOnly((v) => !v);
              setIndex(0);
              setFlipped(false);
            }}
          >
            Revision mode
          </Button>
        </div>
      </div>

      <Progress value={(known.size / cards.length) * 100} />

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-xl border border-border/60 p-6 text-center transition-colors",
          flipped ? "bg-primary/5" : "bg-card hover:bg-accent/50",
        )}
      >
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {flipped ? "Answer" : (card.category ?? "Prompt")}
        </span>
        <span className="text-sm font-medium text-foreground">
          {flipped ? card.back : card.front}
        </span>
        <span className="text-[10px] text-muted-foreground">
          Click to {flipped ? "hide" : "reveal"}
        </span>
      </button>

      <div className="flex items-center justify-between gap-2">
        <Button size="sm" variant="outline" onClick={() => move(-1)}>
          <ChevronLeft className="h-3.5 w-3.5" />
          Previous
        </Button>
        <Button
          size="sm"
          variant={known.has(cardIndex) ? "default" : "secondary"}
          onClick={() => onToggleKnown?.(cardIndex)}
        >
          {known.has(cardIndex) ? "Known" : "Mark as known"}
        </Button>
        <Button size="sm" variant="outline" onClick={() => move(1)}>
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
