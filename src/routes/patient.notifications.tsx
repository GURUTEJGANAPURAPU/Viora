import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/app-store";
import { Bell, Pill, FlaskConical, Calendar, AlertTriangle, Shield } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Viora" }] }),
  component: NotificationsPage,
});

const iconFor = { medicine: Pill, lab: FlaskConical, appointment: Calendar, alert: AlertTriangle, insurance: Shield } as const;

function NotificationsPage() {
  const { notifications, markAllNotificationsRead } = useAppStore();
  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Reminders, alerts and health updates."
        actions={
          <Button
            variant="outline"
            onClick={() => {
              markAllNotificationsRead();
              toast.success("All notifications marked as read");
            }}
          >
            Mark all as read
          </Button>
        }
      />
      <Card className="rounded-2xl divide-y divide-border">
        {notifications.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">You're all caught up.</div>
        )}
        {notifications.map((n) => {
          const Icon = iconFor[n.type as keyof typeof iconFor] ?? Bell;
          return (
            <div key={n.id} className={`flex items-start gap-4 p-4 hover:bg-secondary/40 transition ${n.read ? "opacity-70" : ""}`}>
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-4 w-4" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-medium text-sm">{n.title}</div>
                  {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  {n.type === "alert" && <Badge variant="destructive" className="text-[10px]">Alert</Badge>}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">{n.detail}</div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
