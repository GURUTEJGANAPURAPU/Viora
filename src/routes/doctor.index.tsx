import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { StatCard, SectionCard } from "@/components/viora/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { patients, doctorProfile } from "@/lib/mock-data";
import { Users, Calendar, HeartPulse, Activity, Sparkles, ArrowUpRight, Bed, Stethoscope } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/doctor/")({
  head: () => ({ meta: [{ title: "Hospital Overview — Viora" }] }),
  component: DoctorHome,
});

const admissionsData = Array.from({ length: 14 }, (_, i) => ({ d: `${i + 1}`, admissions: 20 + Math.round(Math.sin(i / 2) * 6 + Math.random() * 8) }));

function DoctorHome() {
  return (
    <div>
      <PageHeader
        title={`Good morning, ${doctorProfile.name}`}
        subtitle={`${doctorProfile.hospital} · ${doctorProfile.specialty}`}
        actions={<Button className="bg-brand-gradient text-white" asChild><Link to="/doctor/ai"><Sparkles className="h-4 w-4" /> AI Patient Summary</Link></Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard icon={Users} label="Patients today" value="14" trend="+3" tone="purple" />
        <StatCard icon={Calendar} label="Appointments" value="22" trend="4 upcoming" tone="blue" />
        <StatCard icon={Bed} label="Occupancy" value="78%" trend="+2%" tone="green" />
        <StatCard icon={HeartPulse} label="Avg. patient score" value="82" trend="+1.2" tone="pink" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <SectionCard title="Admissions — Last 14 days" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={admissionsData}>
                <defs><linearGradient id="ad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--viora-blue)" stopOpacity={0.4}/><stop offset="1" stopColor="var(--viora-blue)" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="d" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="admissions" stroke="var(--viora-blue)" strokeWidth={2} fill="url(#ad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Today's Schedule" action={<Button variant="ghost" size="sm" asChild><Link to="/doctor/schedule">View <ArrowUpRight className="h-3 w-3" /></Link></Button>}>
          <div className="space-y-3">
            {[
              { t: "09:00", p: "Ananya Sharma", type: "Follow-up" },
              { t: "10:30", p: "Vikram Iyer", type: "Post-MI review" },
              { t: "12:00", p: "Neha Kapoor", type: "New consult" },
              { t: "14:00", p: "Rahul Chawla", type: "Chest pain" },
            ].map((s) => (
              <div key={s.t} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
                <div className="text-xs font-medium w-12">{s.t}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.p}</div>
                  <div className="text-xs text-muted-foreground">{s.type}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="High-priority patients" action={<Button variant="ghost" size="sm" asChild><Link to="/doctor/patients">All patients <ArrowUpRight className="h-3 w-3" /></Link></Button>}>
        <div className="divide-y divide-border -mx-2">
          {patients.filter(p => p.risk === "High").concat(patients.filter(p => p.risk === "Medium")).slice(0,5).map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-3 px-2">
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary">{p.name.split(" ").map(w=>w[0]).join("")}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.condition} · {p.id}</div>
              </div>
              <Badge variant={p.risk === "High" ? "destructive" : "secondary"}>{p.risk} risk</Badge>
              <Button variant="outline" size="sm" asChild><Link to="/doctor/ai"><Stethoscope className="h-3.5 w-3.5" /> Open</Link></Button>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
