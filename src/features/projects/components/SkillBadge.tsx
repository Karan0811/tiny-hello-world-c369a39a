import { Badge } from "@/components/ui/badge";

export function SkillBadge({ name }: { name: string }) {
  return (
    <Badge variant="outline" className="rounded-md text-[10px] font-normal">
      {name}
    </Badge>
  );
}
