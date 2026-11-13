import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bell, FlaskConical, Calendar, Users } from "lucide-react";

export const Route = createFileRoute("/doctor/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Viora Clinician" }] }),
  component: DocNotifPage,
});

const items = [
  { icon: AlertTriangle, tone: "destructive", title: "Critical lab result — Vikram Iyer", detail: "Troponin I elevated at 0.42 ng/mL", time: "12 min ago" },
  { icon: FlaskConical, tone: "default", title: "Lab pending review", detail: "3 lipid panels awaiting sign-off", time: "1 hr ago" },
  { icon: Calendar, tone: "secondary", title: "Schedule change", detail: "16:00 rescheduled to 16:30 tomorrow", time: "3 hr ago" },
  { icon: Users, tone: "secondary", title: "New patient assigned", detail: "Aditi Menon assigned to your panel", time: "Yesterday" },
  { icon: Bell, tone: "secondary", title: "Consent update", detail: "Neha Kapoor updated data-sharing consent", time: "Yesterday" },
];

function DocNotifPage() {
  return (
    <div>
      <PageHeader title="Notifications" subtitle="Clinical alerts, schedule changes and system events." />
      <Card className="rounded-2xl divide-y divide-border">
        {[...items, ...items].map((n, i) => (
          <div key={i} className="p-4 flex items-start gap-4">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${n.tone === "destructive" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
              <n.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm font-medium">{n.title}{n.tone === "destructive" && <Badge variant="destructive" className="text-[10px]">Critical</Badge>}</div>
              <div className="text-sm text-muted-foreground">{n.detail}</div>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}
