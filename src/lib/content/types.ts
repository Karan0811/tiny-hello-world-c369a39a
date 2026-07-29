// Content-layer domain types. These describe the shape of the files that live
// in /content — the single source of truth for every course on the platform.
// UI code consumes these types only; it never hardcodes lesson content.

export type ContentDifficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert"
  | string;

/** Raw shape of a lesson `metadata.json` file. */
export type LessonMetadataFile = {
  id: string;
  lessonNumber: number;
  title: string;
  slug: string;
  module: string;
  difficulty?: ContentDifficulty;
  estimatedTime?: string;
  prerequisites?: string[];
  learningObjectives?: string[];
  skills?: string[];
  tags?: string[];
  previousLesson?: string | null;
  nextLesson?: string | null;
};

/** A lesson as exposed by the content layer. */
export type LessonMeta = Required<
  Pick<LessonMetadataFile, "id" | "lessonNumber" | "title" | "slug" | "module">
> & {
  courseId: string;
  /** directory name, e.g. `017-comprehensions` */
  dir: string;
  difficulty: ContentDifficulty;
  estimatedTime: string;
  estimatedMinutes: number;
  prerequisites: string[];
  learningObjectives: string[];
  skills: string[];
  tags: string[];
  previousLesson: string | null;
  nextLesson: string | null;
};

export type CourseModule = {
  /** url-safe id derived from the module name in lesson metadata */
  slug: string;
  title: string;
  lessons: LessonMeta[];
  estimatedMinutes: number;
  difficulty: ContentDifficulty;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  accent: string;
  status: "available" | "coming-soon";
  modules: CourseModule[];
  lessons: LessonMeta[];
  lessonCount: number;
  estimatedMinutes: number;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
  /** optional code snippet for "what is the output" style questions */
  code?: string;
};

export type Flashcard = {
  front: string;
  back: string;
  category?: string;
};

export type MarkdownDoc = {
  frontmatter: Record<string, string>;
  body: string;
  html: string;
  headings: { depth: number; text: string; id: string }[];
};

export type LessonContent = {
  meta: LessonMeta;
  lesson: MarkdownDoc | null;
  cheatsheet: MarkdownDoc | null;
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
};

export type ResourceDoc = {
  courseId: string;
  /** file name without extension, e.g. `python-books` */
  slug: string;
  title: string;
  categoryKey: string;
};
