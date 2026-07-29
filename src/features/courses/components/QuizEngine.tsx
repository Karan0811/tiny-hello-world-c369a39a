import { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/lib/content/types";

type Props = {
  questions: QuizQuestion[];
  onComplete?: (scorePct: number) => void;
  bestScore?: number;
};

export function QuizEngine({ questions, onComplete, bestScore }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const current = questions[index];

  const score = useMemo(
    () =>
      questions.reduce(
        (sum, q, i) => (answers[i] === q.answer ? sum + 1 : sum),
        0,
      ),
    [answers, questions],
  );

  if (!total) {
    return (
      <p className="text-sm text-muted-foreground">
        No quiz questions are defined for this lesson yet.
      </p>
    );
  }

  const reset = () => {
    setIndex(0);
    setAnswers({});
    setRevealed({});
    setFinished(false);
  };

  const submit = (option: string) => {
    if (revealed[index]) return;
    setAnswers((prev) => ({ ...prev, [index]: option }));
    setRevealed((prev) => ({ ...prev, [index]: true }));
  };

  const next = () => {
    if (index < total - 1) {
      setIndex(index + 1);
      return;
    }
    setFinished(true);
    onComplete?.(Math.round((score / total) * 100));
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Quiz complete
        </p>
        <p className="mt-2 text-4xl font-semibold tracking-tight">{pct}%</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {score} of {total} correct
          {typeof bestScore === "number" && bestScore > pct
            ? ` · best ${bestScore}%`
            : ""}
        </p>
        <Button className="mt-5" size="sm" variant="outline" onClick={reset}>
          <RotateCcw className="h-3.5 w-3.5" />
          Retry quiz
        </Button>
      </div>
    );
  }

  const chosen = answers[index];
  const isRevealed = Boolean(revealed[index]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-medium text-muted-foreground">
          Question {index + 1} of {total}
        </span>
        <Badge variant="secondary" className="text-[10px]">
          Score {score}/{total}
        </Badge>
      </div>
      <Progress value={((index + (isRevealed ? 1 : 0)) / total) * 100} />

      <div className="rounded-xl border border-border/60 bg-card p-5">
        <p className="text-sm font-medium text-foreground">{current.question}</p>
        {current.code ? (
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border/60 bg-muted/50 p-3 text-xs">
            <code>{current.code}</code>
          </pre>
        ) : null}

        <div className="mt-4 space-y-2">
          {current.options.map((option) => {
            const isAnswer = option === current.answer;
            const isChosen = option === chosen;
            return (
              <button
                key={option}
                type="button"
                onClick={() => submit(option)}
                disabled={isRevealed}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg border border-border/60 px-3 py-2.5 text-left text-sm transition-colors",
                  !isRevealed && "hover:border-primary/60 hover:bg-accent",
                  isRevealed && isAnswer && "border-primary/60 bg-primary/10",
                  isRevealed &&
                    isChosen &&
                    !isAnswer &&
                    "border-destructive/60 bg-destructive/10",
                )}
              >
                <span>{option}</span>
                {isRevealed && isAnswer ? (
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                ) : null}
                {isRevealed && isChosen && !isAnswer ? (
                  <X className="h-4 w-4 shrink-0 text-destructive" />
                ) : null}
              </button>
            );
          })}
        </div>

        {isRevealed && current.explanation ? (
          <p className="mt-4 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
            {current.explanation}
          </p>
        ) : null}
      </div>

      <div className="flex justify-end">
        <Button size="sm" onClick={next} disabled={!isRevealed}>
          {index === total - 1 ? "Finish quiz" : "Next question"}
        </Button>
      </div>
    </div>
  );
}
