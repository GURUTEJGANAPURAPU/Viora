import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/doctor/appointments")({
  head: () => ({ meta: [{ title: "Appointments — Viora Clinician" }] }),
  component: DoctorAppointments,
});

const initial = [
  { t: "09:00", p: "Ananya Sharma", type: "Follow-up", mode: "In-person", status: "Confirmed" },
  { t: "10:30", p: "Vikram Iyer", type: "Post-MI review", mode: "In-person", status: "Confirmed" },
  { t: "12:00", p: "Neha Kapoor", type: "New consult", mode: "Video", status: "Confirmed" },
  { t: "14:00", p: "Rahul Chawla", type: "Chest pain", mode: "Video", status: "Waiting" },
  { t: "15:30", p: "Divya Rao", type: "Arrhythmia review", mode: "In-person", status: "Confirmed" },
  { t: "17:00", p: "Sanjay Bhat", type: "Annual checkup", mode: "In-person", status: "Confirmed" },
];

function DoctorAppointments() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(initial);

  const startVisit = (t: string, p: string, mode: string) => {
    setSchedule((prev) => prev.map((s) => (s.t === t ? { ...s, status: "In progress" } : s)));
    toast.success(`Starting visit with ${p}`);
    if (mode === "Video") navigate({ to: "/doctor/teleconsult" });
  };

  return (
    <div>
      <PageHeader title="Appointments" subtitle="Today's clinic and virtual visits." />
      <Card className="rounded-2xl divide-y divide-border">
        {schedule.map((s) => (
          <div key={s.t} className="p-4 flex items-center gap-4">
            <div className="text-sm font-semibold w-16">{s.t}</div>
            <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary">{s.p.split(" ").map((w) => w[0]).join("")}</AvatarFallback></Avatar>
            <div className="flex-1">
              <div className="font-medium">{s.p}</div>
              <div className="text-xs text-muted-foreground">{s.type}</div>
            </div>
            <Badge variant="secondary" className="gap-1">{s.mode === "Video" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}{s.mode}</Badge>
            <Badge
              variant={s.status === "Waiting" ? "default" : "secondary"}
              className={
                s.status === "Waiting"
                  ? "bg-viora-amber/20 text-viora-amber border-transparent hover:bg-viora-amber/25"
                  : s.status === "In progress"
                    ? "bg-viora-green/20 text-viora-green border-transparent hover:bg-viora-green/25"
                    : ""
              }
            >
              {s.status}
            </Badge>
            <Button
              size="sm"
              className="bg-brand-gradient text-white"
              onClick={() => startVisit(s.t, s.p, s.mode)}
              disabled={s.status === "In progress"}
            >
              {s.status === "In progress" ? "In progress" : "Start visit"}
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
