import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronsUpDown, LogOut, Search, Settings2, UserRound } from "lucide-react";
import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import { toast } from "sonner";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/lib/app-store";

export interface NavItem {
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export function DashboardShell({
  groups,
  userName,
  userSub,
  userAvatar,
  role,
}: {
  groups: NavGroup[];
  userName: string;
  userSub: string;
  userAvatar: string;
  role: "Patient" | "Doctor";
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { user, signOut, notifications, markAllNotificationsRead } = useAppStore();
  const [query, setQuery] = useState("");

  const expectedRole = role.toLowerCase();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Give the store a tick to hydrate from localStorage.
    const t = setTimeout(() => {
      if (!user) navigate({ to: "/login" });
      else if (user.role !== expectedRole)
        navigate({ to: user.role === "patient" ? "/patient" : "/doctor" });
    }, 50);
    return () => clearTimeout(t);
  }, [user, expectedRole, navigate]);

  const displayName = user?.name ?? userName;
  const displaySub = user?.sub ?? userSub;
  const displayAvatar = user?.avatar ?? userAvatar;

  const unread = notifications.filter((n) => !n.read).length;

  const flatItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return flatItems.filter((i) => i.label.toLowerCase().includes(q)).slice(0, 6);
  }, [flatItems, query]);

  const handleSignOut = () => {
    signOut();
    toast.success("Signed out");
    navigate({ to: "/login" });
  };

  const settingsPath = role === "Patient" ? "/patient/settings" : "/doctor/settings";
  const notificationsPath = role === "Patient" ? "/patient/notifications" : "/doctor/notifications";

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
        <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
          <Link to="/"><Logo /></Link>
        </div>
        <div className="p-3 flex-1 overflow-y-auto">
          {groups.map((g) => (
            <div key={g.label} className="mb-5">
              <div className="px-3 mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{g.label}</div>
              <div className="space-y-0.5">
                {g.items.map((item) => {
                  const active = pathname === item.to || (item.to !== "/patient" && item.to !== "/doctor" && pathname.startsWith(item.to));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/15 text-primary">{item.badge}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 rounded-xl p-2 hover:bg-sidebar-accent transition">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-brand-gradient text-white font-medium">{displayAvatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium truncate">{displayName}</div>
                  <div className="text-xs text-muted-foreground truncate">{displaySub}</div>
                </div>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate({ to: settingsPath as "/patient/settings" })}>
                <UserRound className="h-4 w-4" /> Account & settings
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate({ to: notificationsPath as "/patient/notifications" })}>
                <Bell className="h-4 w-4" /> Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleSignOut} className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-8">
          <div className="lg:hidden"><Logo showText={false} /></div>
          <Popover open={query.length > 0} onOpenChange={(o) => { if (!o) setQuery(""); }}>
            <PopoverTrigger asChild>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search records, doctors, medicines…"
                  className="pl-9 h-9 bg-secondary/60 border-transparent"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[320px] p-2" onOpenAutoFocus={(e) => e.preventDefault()}>
              {searchResults.length === 0 ? (
                <div className="text-xs text-muted-foreground px-3 py-2">No results</div>
              ) : (
                <div className="space-y-0.5">
                  {searchResults.map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.to}
                        onClick={() => { setQuery(""); navigate({ to: r.to as "/patient" }); }}
                        className="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden md:inline-flex border-primary/30 text-primary bg-primary/5">
              {role} Portal
            </Badge>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {unread > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[340px] p-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="text-sm font-semibold">Notifications</div>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-primary hover:underline"
                  >Mark all read</button>
                </div>
                <ScrollArea className="max-h-80">
                  <div className="divide-y divide-border">
                    {notifications.map((n) => (
                      <div key={n.id} className="px-4 py-3 hover:bg-secondary/50">
                        <div className="flex items-start gap-2">
                          {!n.read && <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />}
                          <div className="flex-1">
                            <div className="text-sm font-medium">{n.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{n.detail}</div>
                            <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide">{n.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-2 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full justify-center" onClick={() => navigate({ to: notificationsPath as "/patient/notifications" })}>
                    View all
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Button variant="ghost" size="icon" onClick={() => navigate({ to: settingsPath as "/patient/settings" })}>
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
