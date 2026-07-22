import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun, User, Plug } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings · AI University" },
      { name: "description", content: "Manage your profile, appearance, and future integrations for AI University." },
      { property: "og:title", content: "AI University · Settings" },
      { property: "og:description", content: "Configure your AI University workspace." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <PageContainer>
      <PageHeader eyebrow="Settings" title="Workspace preferences" />

      <div className="mt-8 space-y-6">
        <SurfaceCard>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            Profile
          </div>
          <Separator className="my-4" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Display name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button size="sm" disabled>Save changes</Button>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <Sun className="h-3.5 w-3.5" />
            Appearance
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Theme</div>
              <p className="text-xs text-muted-foreground">Choose your preferred color mode.</p>
            </div>
            <div className="flex items-center gap-1 rounded-md border border-border/60 bg-background/60 p-1">
              <Button
                variant={theme === "dark" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "light" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <Plug className="h-3.5 w-3.5" />
            Integrations
          </div>
          <Separator className="my-4" />
          <p className="text-sm text-muted-foreground">
            Future integrations (GitHub, notebooks, cloud runtimes) will appear here.
          </p>
        </SurfaceCard>
      </div>
    </PageContainer>
  );
}