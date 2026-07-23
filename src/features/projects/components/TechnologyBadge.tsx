import { Badge } from "@/components/ui/badge";

export function TechnologyBadge({ name }: { name: string }) {
  return (
    <Badge variant="secondary" className="rounded-md text-[10px] font-normal">
      {name}
    </Badge>
  );
}
