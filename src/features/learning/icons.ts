import {
  Bot,
  Brain,
  Cloud,
  Code2,
  Container,
  Database,
  Eye,
  GitBranch,
  Layers,
  MessageSquare,
  Network,
  Plug,
  Rocket,
  Search,
  Server,
  Sigma,
  Sparkles,
  Terminal,
  Wand2,
  Boxes,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  code: Code2,
  sigma: Sigma,
  database: Database,
  git: GitBranch,
  terminal: Terminal,
  container: Container,
  cluster: Boxes,
  brain: Brain,
  layers: Layers,
  message: MessageSquare,
  eye: Eye,
  sparkles: Sparkles,
  wand: Wand2,
  search: Search,
  plug: Plug,
  bot: Bot,
  network: Network,
  rocket: Rocket,
  server: Server,
  cloud: Cloud,
};

export const fallbackIcon: LucideIcon = BookOpen;

export function getCategoryIcon(key: string): LucideIcon {
  return categoryIcons[key] ?? fallbackIcon;
}