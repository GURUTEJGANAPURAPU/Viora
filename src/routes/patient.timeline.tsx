import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { timeline } from "@/lib/mock-data";
import { Activity, FlaskConical, Pill, Syringe, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/patient/timeline")({
  head: () => ({ meta: [{ title: "Health Timeline — Viora" }] }),
  component: TimelinePage,
});

const iconFor = { lab: FlaskConical, visit: Stethoscope, medicine: Pill, vaccine: Syringe } as const;

function TimelinePage() {
  return (
    <div>
      <PageHeader title="Health Timeline" subtitle="Every event of your health journey in one chronological view." />
      <Card className="p-6 rounded-2xl">
        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
          <div className="space-y-6">
            {timeline.map((t, i) => {
              const Icon = iconFor[t.type as keyof typeof iconFor] ?? Activity;
              return (
                <div key={i} className="relative flex gap-4 pl-1">
                  <div className="relative z-10 h-10 w-10 rounded-full bg-brand-gradient text-white flex items-center justify-center shadow-elevate">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 rounded-xl border border-border p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{t.title}</div>
                      <div className="text-xs text-muted-foreground">{t.date}</div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{t.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
