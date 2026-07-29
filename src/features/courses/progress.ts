// Generic, course-agnostic progress tracking. State is keyed by course id and
// lesson slug, so any future course works with no changes.

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Course } from "@/lib/content/types";

const STORAGE_PREFIX = "aiu:course-progress:";
const EVENT = "aiu:course-progress";

export type CourseProgressState = {
  completed: string[];
  /** seconds spent per lesson slug */
  timeSpent: Record<string, number>;
  /** best quiz score (0-100) per lesson slug */
  quizScores: Record<string, number>;
  /** flashcards marked as known, per lesson slug */
  knownCards: Record<string, number[]>;
};

const emptyState: CourseProgressState = {
  completed: [],
  timeSpent: {},
  quizScores: {},
  knownCards: {},
};

function key(courseId: string) {
  return `${STORAGE_PREFIX}${courseId}`;
}

function read(courseId: string): CourseProgressState {
  if (typeof window === "undefined") return emptyState;
  try {
    const raw = window.localStorage.getItem(key(courseId));
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as Partial<CourseProgressState>;
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      timeSpent: parsed.timeSpent ?? {},
      quizScores: parsed.quizScores ?? {},
      knownCards: parsed.knownCards ?? {},
    };
  } catch {
    return emptyState;
  }
}

function write(courseId: string, state: CourseProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key(courseId), JSON.stringify(state));
  } catch {
    /* storage unavailable — keep progress in memory for this session */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useCourseProgress(course: Course | undefined) {
  const courseId = course?.id ?? "unknown";
  const [state, setState] = useState<CourseProgressState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(read(courseId));
    setHydrated(true);
    const sync = () => setState(read(courseId));
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [courseId]);

  const update = useCallback(
    (updater: (prev: CourseProgressState) => CourseProgressState) => {
      setState((prev) => {
        const next = updater(prev);
        write(courseId, next);
        return next;
      });
    },
    [courseId],
  );

  const completeLesson = useCallback(
    (slug: string) =>
      update((prev) =>
        prev.completed.includes(slug)
          ? prev
          : { ...prev, completed: [...prev.completed, slug] },
      ),
    [update],
  );

  const uncompleteLesson = useCallback(
    (slug: string) =>
      update((prev) => ({
        ...prev,
        completed: prev.completed.filter((s) => s !== slug),
      })),
    [update],
  );

  const addTime = useCallback(
    (slug: string, seconds: number) =>
      update((prev) => ({
        ...prev,
        timeSpent: {
          ...prev.timeSpent,
          [slug]: (prev.timeSpent[slug] ?? 0) + seconds,
        },
      })),
    [update],
  );

  const recordQuizScore = useCallback(
    (slug: string, score: number) =>
      update((prev) => ({
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [slug]: Math.max(prev.quizScores[slug] ?? 0, score),
        },
      })),
    [update],
  );

  const toggleKnownCard = useCallback(
    (slug: string, index: number) =>
      update((prev) => {
        const known = prev.knownCards[slug] ?? [];
        const next = known.includes(index)
          ? known.filter((i) => i !== index)
          : [...known, index];
        return { ...prev, knownCards: { ...prev.knownCards, [slug]: next } };
      }),
    [update],
  );

  const derived = useMemo(() => {
    const total = course?.lessonCount ?? 0;
    const completedSet = new Set(state.completed);
    const completedCount = course
      ? course.lessons.filter((l) => completedSet.has(l.slug)).length
      : 0;
    const totalSeconds = Object.values(state.timeSpent).reduce(
      (a, b) => a + b,
      0,
    );
    const moduleProgress = Object.fromEntries(
      (course?.modules ?? []).map((m) => {
        const done = m.lessons.filter((l) => completedSet.has(l.slug)).length;
        return [
          m.slug,
          {
            completed: done,
            total: m.lessons.length,
            pct: m.lessons.length
              ? Math.round((done / m.lessons.length) * 100)
              : 0,
          },
        ];
      }),
    );
    return {
      total,
      completedCount,
      completionPct: total ? Math.round((completedCount / total) * 100) : 0,
      totalSeconds,
      moduleProgress,
      isCompleted: (slug: string) => completedSet.has(slug),
      nextLesson:
        course?.lessons.find((l) => !completedSet.has(l.slug)) ?? null,
    };
  }, [course, state]);

  return {
    hydrated,
    ...state,
    ...derived,
    completeLesson,
    uncompleteLesson,
    addTime,
    recordQuizScore,
    toggleKnownCard,
  };
}

/** Tracks visible, active time on a lesson page and flushes it periodically. */
export function useLessonTimer(
  lessonSlug: string,
  addTime: (slug: string, seconds: number) => void,
) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let seconds = 0;
    const tick = window.setInterval(() => {
      if (document.visibilityState === "visible") seconds += 15;
      if (seconds >= 30) {
        addTime(lessonSlug, seconds);
        seconds = 0;
      }
    }, 15_000);
    return () => {
      window.clearInterval(tick);
      if (seconds > 0) addTime(lessonSlug, seconds);
    };
  }, [lessonSlug, addTime]);
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}
