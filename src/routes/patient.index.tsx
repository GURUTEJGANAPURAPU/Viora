import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { StatCard, SectionCard } from "@/components/viora/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { patientProfile, vitals, heartRateData, medicines, appointments, records, aiInsights } from "@/lib/mock-data";
import { Heart, Footprints, Moon, Flame, Activity, Droplets, ArrowUpRight, Sparkles, Plus, CheckCircle2, Circle, Video, MapPin } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const Route = createFileRoute("/patient/")({
  head: () => ({ meta: [{ title: "Home — Viora Patient" }] }),
  component: PatientHome,
});

const vitalIcons = [Heart, Footprints, Moon, Flame, Activity, Droplets] as const;
const vitalTones = ["pink", "blue", "purple", "amber", "green", "blue"] as const;

function PatientHome() {
  return (
    <div>
      <PageHeader
        title={`Welcome back, ${patientProfile.name.split(" ")[0]}`}
        subtitle="Here's your health snapshot for today."
        actions={
          <>
            <Button variant="outline" asChild><Link to="/patient/records"><Plus className="h-4 w-4" /> Upload record</Link></Button>
            <Button className="bg-brand-gradient text-white shadow-elevate" asChild>
              <Link to="/patient/ai"><Sparkles className="h-4 w-4" /> Ask Viora AI</Link>
            </Button>
          </>
        }
      />

      {/* Health score + AI insight */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-brand-gradient text-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-white/80">Health Score</div>
              <div className="mt-2 text-6xl font-semibold tracking-tight">{patientProfile.healthScore}</div>
              <div className="mt-1 text-sm text-white/85">Excellent · +4 this month</div>
            </div>
            <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20"><Sparkles className="h-3 w-3" /> AI</Badge>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-white/70 text-xs">Cardio</div>
              <Progress value={92} className="h-1.5 mt-1 bg-white/20" />
            </div>
            <div>
              <div className="text-white/70 text-xs">Metabolic</div>
              <Progress value={81} className="h-1.5 mt-1 bg-white/20" />
            </div>
            <div>
              <div className="text-white/70 text-xs">Sleep</div>
              <Progress value={88} className="h-1.5 mt-1 bg-white/20" />
            </div>
          </div>
          <Activity className="absolute -right-6 -bottom-6 h-40 w-40 text-white/10" />
        </div>

        <SectionCard title="AI Recommendation" action={<Sparkles className="h-4 w-4 text-primary" />}>
          <div className="space-y-3">
            {aiInsights.slice(0, 2).map((i) => (
              <div key={i.title} className="rounded-xl border border-border p-3 hover:bg-secondary/50 transition">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{i.title}</div>
                  <Badge variant="secondary" className="text-[10px]">{i.tag}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{i.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Vitals */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
        {vitals.map((v, i) => (
          <StatCard key={v.label} icon={vitalIcons[i]} tone={vitalTones[i]} label={v.label} value={v.value} unit={v.unit} trend={v.trend} />
        ))}
      </div>

      {/* Charts + reminders */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <SectionCard title="Heart Rate — Last 24h" className="lg:col-span-2" action={<Badge variant="secondary" className="gap-1"><span className="h-2 w-2 rounded-full bg-viora-pink" /> Live</Badge>}>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={heartRateData}>
                <defs>
                  <linearGradient id="hr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--viora-purple)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--viora-purple)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} interval={2} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
                <Area type="monotone" dataKey="bpm" stroke="var(--viora-purple)" strokeWidth={2} fill="url(#hr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Today's Medicines" action={<Button variant="ghost" size="sm" asChild><Link to="/patient/medicines">View all <ArrowUpRight className="h-3 w-3" /></Link></Button>}>
          <div className="space-y-2">
            {medicines.slice(0, 4).map((m) => (
              <div key={m.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition">
                {m.taken ? <CheckCircle2 className="h-5 w-5 text-viora-green" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.type} · {m.time}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Appointments + records */}
      <div className="grid lg:grid-cols-2 gap-5">
        <SectionCard title="Upcoming Appointments" action={<Button variant="ghost" size="sm" asChild><Link to="/patient/appointments">All <ArrowUpRight className="h-3 w-3" /></Link></Button>}>
          <div className="space-y-3">
            {appointments.map((a) => (
              <div key={a.doctor + a.date} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <Avatar className="h-11 w-11">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">{a.doctor.split(" ").slice(-2).map(w => w[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{a.doctor}</div>
                  <div className="text-xs text-muted-foreground">{a.specialty} · {a.hospital}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{a.date}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                    {a.mode === "Video" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                    {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Reports" action={<Button variant="ghost" size="sm" asChild><Link to="/patient/records">All <ArrowUpRight className="h-3 w-3" /></Link></Button>}>
          <div className="divide-y divide-border">
            {records.slice(0, 5).map((r) => (
              <div key={r.title} className="flex items-center gap-3 py-3">
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-primary text-xs font-semibold">{r.type[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.source} · {r.date}</div>
                </div>
                <Badge variant={r.tag === "Attention" ? "destructive" : "secondary"} className="text-[10px]">{r.tag}</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
