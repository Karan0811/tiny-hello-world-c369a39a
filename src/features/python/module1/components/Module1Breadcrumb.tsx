import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Crumb = { label: string; to?: string };

export function Module1Breadcrumb({ lessonTitle }: { lessonTitle?: string }) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList className="text-xs">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/learning">Learning</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/learning/python">Python</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {lessonTitle ? (
            <BreadcrumbLink asChild>
              <Link to="/learning/python/module-1">Module 1</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Module 1</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {lessonTitle && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[16rem] truncate">{lessonTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export type { Crumb };
