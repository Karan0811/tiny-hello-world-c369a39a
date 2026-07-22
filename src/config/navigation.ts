import {
  LayoutDashboard,
  Map,
  GraduationCap,
  FolderKanban,
  Library,
  StickyNote,
  LineChart,
  MessagesSquare,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  description?: string;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const navigation: NavSection[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard, description: "Your learning hub" },
      { label: "Roadmap", to: "/roadmap", icon: Map, description: "AI mastery path" },
    ],
  },
  {
    label: "Study",
    items: [
      { label: "Learning", to: "/learning", icon: GraduationCap, description: "Modules & lessons" },
      { label: "Projects", to: "/projects", icon: FolderKanban, description: "Build & deploy" },
      { label: "Resources", to: "/resources", icon: Library, description: "Curated library" },
      { label: "Notes", to: "/notes", icon: StickyNote, description: "Your knowledge base" },
    ],
  },
  {
    label: "Growth",
    items: [
      { label: "Progress", to: "/progress", icon: LineChart, description: "Track mastery" },
      { label: "Interview", to: "/interview", icon: MessagesSquare, description: "Prep for the role" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings", to: "/settings", icon: Settings },
    ],
  },
];

export const flatNav: NavItem[] = navigation.flatMap((s) => s.items);