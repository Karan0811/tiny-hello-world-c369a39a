import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Clock,
  Layers,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { CheatsheetViewer } from "./CheatsheetViewer";
import { QuizEngine } from "./QuizEngine";
import { FlashcardViewer } from "./FlashcardViewer";
import { formatDuration } from "../progress";
import type { LessonContent, LessonMeta } from "@/lib/content/types";

type Props = {
  content: LessonContent;
  previous: LessonMeta | null;
  next: LessonMeta | null;
  completed: boolean;
  onToggleComplete: () => void;
  secondsSpent: number;
  bestQuizScore?: number;
  knownCards: number[];
  onQuizComplete: (score: number) => void;
  onToggleKnownCard: (index: number) => void;
};

export function LessonViewer({
  content,
  previous,
  next,
  completed,
  onToggleComplete,
  secondsSpent,
  bestQuizScore,
  knownCards,
  onQuizComplete,
  onToggleKnownCard,
}: Props) {
  const { meta, lesson, cheatsheet, quiz, flashcards } = content;

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            Lesson {String(meta.lessonNumber).padStart(3, "0")}
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            {meta.module}
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            {meta.difficulty}
          </Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{meta.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {meta.estimatedTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" />
            {flashcards.length} flashcards · {quiz.length} quiz questions
          </span>
          {secondsSpent > 0 ? (
            <span className="inline-flex items-center gap-1">
              <BookOpenCheck className="h-3.5 w-3.5" />
              {formatDuration(secondsSpent)} studied
            </span>
          ) : null}
        </div>
      </header>

      {meta.learningObjectives.length ? (
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Target className="h-3.5 w-3.5" />
            Learning objectives
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
            {meta.learningObjectives.map((objective) => (
              <li key={objective} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {objective}
              </li>
            ))}
          </ul>
          {meta.skills.length ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {meta.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-[10px]">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <Tabs defaultValue="lesson">
        <TabsList>
          <TabsTrigger value="lesson">Lesson</TabsTrigger>
          <TabsTrigger value="cheatsheet">Cheat sheet</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
        </TabsList>

        <TabsContent value="lesson" className="mt-4">
          {lesson ? (
            <article className="rounded-xl border border-border/60 bg-card p-6">
              <MarkdownRenderer doc={lesson} />
            </article>
          ) : (
            <p className="text-sm text-muted-foreground">
              This lesson has no MDX content yet.
            </p>
          )}
        </TabsContent>

        <TabsContent value="cheatsheet" className="mt-4">
          <CheatsheetViewer doc={cheatsheet} />
        </TabsContent>

        <TabsContent value="quiz" className="mt-4">
          <QuizEngine
            questions={quiz}
            bestScore={bestQuizScore}
            onComplete={onQuizComplete}
          />
        </TabsContent>

        <TabsContent value="flashcards" className="mt-4">
          <FlashcardViewer
            cards={flashcards}
            knownIndexes={knownCards}
            onToggleKnown={onToggleKnownCard}
          />
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5">
        <div className="flex gap-2">
          {previous ? (
            <Button asChild size="sm" variant="outline">
              <Link
                to="/courses/$course/$lesson"
                params={{ course: previous.courseId, lesson: previous.slug }}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous
              </Link>
            </Button>
          ) : null}
          {next ? (
            <Button asChild size="sm" variant="outline">
              <Link
                to="/courses/$course/$lesson"
                params={{ course: next.courseId, lesson: next.slug }}
              >
                Next
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          ) : null}
        </div>
        <Button
          size="sm"
          variant={completed ? "secondary" : "default"}
          onClick={onToggleComplete}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {completed ? "Completed" : "Mark as complete"}
        </Button>
      </div>
    </div>
  );
}
