import { Link, useRouterState } from "@tanstack/react-router";
import { GraduationCap, Search, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

type Props = {
  onOpenSearch: () => void;
};

export function AppSidebar({ onOpenSearch }: Props) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-sm ring-1 ring-inset ring-white/10">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-tight">AI University</div>
              <div className="truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Learn · Build · Deploy
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-1.5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onOpenSearch}
                  className="group/search text-muted-foreground"
                  tooltip="Search"
                >
                  <Search className="h-4 w-4" />
                  {!collapsed && (
                    <>
                      <span>Search…</span>
                      <kbd className="ml-auto hidden rounded border border-border/60 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground group-hover/search:inline-block">
                        ⌘K
                      </kbd>
                    </>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {navigation.map((section) => (
          <SidebarGroup key={section.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const active = isActive(item.to);
                  return (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={item.label}
                        className={cn(
                          "group/nav data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
                        )}
                      >
                        <Link to={item.to}>
                          <item.icon className="h-4 w-4" />
                          {!collapsed && (
                            <>
                              <span className="truncate">{item.label}</span>
                              {active && (
                                <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-60" />
                              )}
                            </>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-md p-2 transition-colors hover:bg-sidebar-accent",
            collapsed && "justify-center",
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary/40 text-xs font-semibold text-primary-foreground ring-1 ring-inset ring-white/10">
            AI
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">Learner</div>
              <div className="truncate text-xs text-muted-foreground">Signed out</div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}