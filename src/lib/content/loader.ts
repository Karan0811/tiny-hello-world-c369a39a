// Content discovery + loading layer.
//
// Every lesson lives on disk as:
//   content/<course>/<NNN-slug>/{index.mdx,metadata.json,quiz.json,flashcards.json,cheatsheet.md}
// and every course-level master resource as:
//   content/<course>/<name>.md
//
// Files are discovered with import.meta.glob, so dropping a new folder (or a
// whole new course directory) into /content makes it appear in the app with
// zero code changes.

import { courseCatalog, resourceCategoryFor } from "@/config/courses";
import { parseMarkdown } from "./markdown";
import type {
  Course,
  CourseModule,
  Flashcard,
  LessonContent,
  LessonMeta,
  LessonMetadataFile,
  QuizQuestion,
  ResourceDoc,
} from "./types";

const metadataFiles = import.meta.glob<LessonMetadataFile>(
  "/content/*/*/metadata.json",
  { eager: true, import: "default" },
);

const lessonFiles = import.meta.glob<string>("/content/*/*/index.mdx", {
  query: "?raw",
  import: "default",
});

const cheatsheetFiles = import.meta.glob<string>("/content/*/*/cheatsheet.md", {
  query: "?raw",
  import: "default",
});

const quizFiles = import.meta.glob<QuizQuestion[]>("/content/*/*/quiz.json", {
  import: "default",
});

const flashcardFiles = import.meta.glob<Flashcard[]>(
  "/content/*/*/flashcards.json",
  { import: "default" },
);

const resourceFiles = import.meta.glob<string>("/content/*/*.md", {
  query: "?raw",
  import: "default",
});

function parseTime(value: string | undefined): number {
  const match = /(\d+)/.exec(value ?? "");
  return match ? Number(match[1]) : 0;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toLessonMeta(
  path: string,
  raw: LessonMetadataFile,
): LessonMeta | null {
  const parts = path.split("/"); // ['', 'content', course, dir, 'metadata.json']
  const courseId = parts[2];
  const dir = parts[3];
  if (!courseId || !dir || !raw?.slug) return null;

  const estimatedTime = raw.estimatedTime ?? "30 minutes";
  return {
    id: raw.id ?? `${courseId}-${dir}`,
    courseId,
    dir,
    lessonNumber: raw.lessonNumber ?? (Number(dir.slice(0, 3)) || 0),
    title: raw.title ?? dir,
    slug: raw.slug,
    module: raw.module ?? "General",
    difficulty: raw.difficulty ?? "Beginner",
    estimatedTime,
    estimatedMinutes: parseTime(estimatedTime),
    prerequisites: raw.prerequisites ?? [],
    learningObjectives: raw.learningObjectives ?? [],
    skills: raw.skills ?? [],
    tags: raw.tags ?? [],
    previousLesson: raw.previousLesson ?? null,
    nextLesson: raw.nextLesson ?? null,
  };
}

const allLessons: LessonMeta[] = Object.entries(metadataFiles)
  .map(([path, raw]) => toLessonMeta(path, raw))
  .filter((l): l is LessonMeta => Boolean(l))
  .sort((a, b) => a.lessonNumber - b.lessonNumber);

function buildModules(lessons: LessonMeta[]): CourseModule[] {
  const groups = new Map<string, LessonMeta[]>();
  for (const lesson of lessons) {
    const list = groups.get(lesson.module) ?? [];
    list.push(lesson);
    groups.set(lesson.module, list);
  }
  return [...groups.entries()].map(([title, moduleLessons]) => ({
    slug: slugify(title),
    title,
    lessons: moduleLessons,
    estimatedMinutes: moduleLessons.reduce(
      (sum, l) => sum + l.estimatedMinutes,
      0,
    ),
    difficulty: moduleLessons[0]?.difficulty ?? "Beginner",
  }));
}

const coursesById = new Map<string, Course>();

for (const entry of courseCatalog) {
  const lessons = allLessons.filter((l) => l.courseId === entry.id);
  coursesById.set(entry.id, {
    ...entry,
    status: lessons.length ? "available" : "coming-soon",
    modules: buildModules(lessons),
    lessons,
    lessonCount: lessons.length,
    estimatedMinutes: lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0),
  });
}

// Courses discovered on disk that are not described in the catalog still show
// up, using sensible defaults. Content stays the source of truth.
for (const lesson of allLessons) {
  if (coursesById.has(lesson.courseId)) continue;
  const lessons = allLessons.filter((l) => l.courseId === lesson.courseId);
  coursesById.set(lesson.courseId, {
    id: lesson.courseId,
    title: lesson.courseId.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
    description: `${lessons.length} lessons discovered in /content/${lesson.courseId}.`,
    iconKey: "book",
    accent: "primary",
    status: "available",
    modules: buildModules(lessons),
    lessons,
    lessonCount: lessons.length,
    estimatedMinutes: lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0),
  });
}

export function listCourses(): Course[] {
  return [...coursesById.values()];
}

export function getCourse(courseId: string): Course | undefined {
  return coursesById.get(courseId);
}

export function getLessonMeta(
  courseId: string,
  lessonSlug: string,
): LessonMeta | undefined {
  return getCourse(courseId)?.lessons.find((l) => l.slug === lessonSlug);
}

export function getLessonNeighbours(courseId: string, lessonSlug: string) {
  const lessons = getCourse(courseId)?.lessons ?? [];
  const index = lessons.findIndex((l) => l.slug === lessonSlug);
  return {
    previous: index > 0 ? lessons[index - 1] : null,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}

async function loadOptional<T>(
  loaders: Record<string, () => Promise<T>>,
  key: string,
): Promise<T | null> {
  const loader = loaders[key];
  if (!loader) return null;
  try {
    return await loader();
  } catch {
    return null;
  }
}

/** Load every asset that belongs to one lesson folder. */
export async function loadLesson(
  courseId: string,
  lessonSlug: string,
): Promise<LessonContent | null> {
  const meta = getLessonMeta(courseId, lessonSlug);
  if (!meta) return null;
  const base = `/content/${courseId}/${meta.dir}`;

  const [mdx, cheatsheet, quiz, flashcards] = await Promise.all([
    loadOptional(lessonFiles, `${base}/index.mdx`),
    loadOptional(cheatsheetFiles, `${base}/cheatsheet.md`),
    loadOptional(quizFiles, `${base}/quiz.json`),
    loadOptional(flashcardFiles, `${base}/flashcards.json`),
  ]);

  return {
    meta,
    lesson: mdx ? parseMarkdown(mdx) : null,
    cheatsheet: cheatsheet ? parseMarkdown(cheatsheet) : null,
    quiz: Array.isArray(quiz) ? quiz : [],
    flashcards: Array.isArray(flashcards) ? flashcards : [],
  };
}

function titleFromMarkdown(source: string, fallback: string) {
  const match = /^#\s+(.*)$/m.exec(source);
  return match ? match[1].trim() : fallback;
}

/** Master resource documents that live at the root of a course folder. */
export function listResourceDocs(courseId?: string): ResourceDoc[] {
  return Object.keys(resourceFiles)
    .map((path) => {
      const parts = path.split("/");
      const docCourseId = parts[2];
      const slug = parts[3].replace(/\.md$/, "");
      return {
        courseId: docCourseId,
        slug,
        title: slug
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        categoryKey: resourceCategoryFor(slug),
      };
    })
    .filter((doc) => !courseId || doc.courseId === courseId)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function loadResourceDoc(courseId: string, slug: string) {
  const source = await loadOptional(
    resourceFiles,
    `/content/${courseId}/${slug}.md`,
  );
  if (!source) return null;
  const doc = parseMarkdown(source);
  return {
    ...doc,
    title: titleFromMarkdown(source, slug),
    courseId,
    slug,
    categoryKey: resourceCategoryFor(slug),
  };
}

/** Every master resource doc, fully parsed — used by the resource library. */
export async function loadAllResourceDocs(courseId?: string) {
  const docs = listResourceDocs(courseId);
  const loaded = await Promise.all(
    docs.map((doc) => loadResourceDoc(doc.courseId, doc.slug)),
  );
  return loaded.filter((d): d is NonNullable<typeof d> => Boolean(d));
}
