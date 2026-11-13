import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/doctor/schedule")({
  head: () => ({ meta: [{ title: "Doctor Schedule — Viora" }] }),
  component: SchedulePage,
});

const hours = Array.from({ length: 10 }, (_, i) => 8 + i);
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const events = [
  { d: 0, h: 9, len: 1, label: "Ananya Sharma", tone: "purple" },
  { d: 0, h: 11, len: 2, label: "Clinic block", tone: "blue" },
  { d: 1, h: 10, len: 1, label: "Vikram Iyer", tone: "pink" },
  { d: 1, h: 14, len: 1, label: "Team huddle", tone: "amber" },
  { d: 2, h: 9, len: 2, label: "Cath lab", tone: "green" },
  { d: 3, h: 13, len: 1, label: "Neha Kapoor", tone: "purple" },
  { d: 4, h: 10, len: 3, label: "Rounds — 3W", tone: "blue" },
];

const toneClass: Record<string,string> = {
  purple: "bg-viora-purple/15 text-viora-purple border-viora-purple/30",
  blue: "bg-viora-blue/15 text-viora-blue border-viora-blue/30",
  pink: "bg-viora-pink/15 text-viora-pink border-viora-pink/30",
  amber: "bg-viora-amber/20 text-viora-amber border-viora-amber/30",
  green: "bg-viora-green/15 text-viora-green border-viora-green/30",
};

function SchedulePage() {
  return (
    <div>
      <PageHeader title="Doctor Schedule" subtitle="Your week at a glance." />
      <Card className="p-4 rounded-2xl overflow-x-auto">
        <div className="grid" style={{ gridTemplateColumns: `60px repeat(${days.length}, minmax(140px, 1fr))`, gridTemplateRows: `28px repeat(${hours.length}, 60px)` }}>
          <div />
          {days.map(d => <div key={d} className="text-xs font-medium text-muted-foreground text-center">{d}</div>)}
          {hours.map(h => (
            <div key={`row${h}`} className="contents">
              <div className="text-xs text-muted-foreground pr-2 text-right pt-1">{h}:00</div>
              {days.map(d => <div key={`c${h}${d}`} className="border-t border-l border-border/60" />)}
            </div>
          ))}
          {events.map((e, i) => (
            <div key={i}
              className={`m-1 rounded-lg border p-2 text-xs font-medium ${toneClass[e.tone]}`}
              style={{ gridColumn: e.d + 2, gridRow: `${e.h - 8 + 2} / span ${e.len}` }}
            >
              {e.label}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
