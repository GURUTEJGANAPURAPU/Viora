import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { SectionCard } from "@/components/viora/StatCard";
import { StatCard } from "@/components/viora/StatCard";
import { Users, HeartPulse, Bed, Stethoscope } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/doctor/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Viora Clinician" }] }),
  component: DoctorAnalytics,
});

const trend = Array.from({ length: 30 }, (_, i) => ({ d: i + 1, v: 40 + Math.round(Math.sin(i/3) * 10 + Math.random() * 8) }));
const dept = [{ n: "Cardio", v: 42 }, { n: "Pulm", v: 24 }, { n: "Endo", v: 18 }, { n: "Derm", v: 12 }, { n: "GP", v: 30 }];
const outcomes = [{ n: "Recovered", v: 62, c: "var(--viora-green)" }, { n: "Ongoing", v: 28, c: "var(--viora-purple)" }, { n: "Referred", v: 10, c: "var(--viora-amber)" }];

function DoctorAnalytics() {
  return (
    <div>
      <PageHeader title="Analytics" subtitle="Operational and clinical insights across your practice." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard icon={Users} label="Active patients" value="1,284" trend="+12%" tone="purple" />
        <StatCard icon={Stethoscope} label="Consultations · 30d" value="642" trend="+8%" tone="blue" />
        <StatCard icon={HeartPulse} label="Readmission" value="4.2%" trend="-1.1%" tone="green" />
        <StatCard icon={Bed} label="Avg. LOS" value="3.4 days" trend="stable" tone="amber" />
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        <SectionCard title="Consultations · 30 days" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer><AreaChart data={trend}>
              <defs><linearGradient id="c1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--viora-purple)" stopOpacity={0.35}/><stop offset="1" stopColor="var(--viora-purple)" stopOpacity={0}/></linearGradient></defs>
              <XAxis dataKey="d" fontSize={10} tickLine={false} axisLine={false} stroke="var(--muted-foreground)"/><Tooltip/>
              <Area type="monotone" dataKey="v" stroke="var(--viora-purple)" strokeWidth={2} fill="url(#c1)" />
            </AreaChart></ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Outcomes">
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={outcomes} dataKey="v" nameKey="n" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {outcomes.map((o, i) => <Cell key={i} fill={o.c} />)}
                </Pie>
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Departments · 7 days" className="lg:col-span-3">
          <div className="h-56">
            <ResponsiveContainer><BarChart data={dept}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="n" fontSize={11} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" /><Tooltip/>
              <Bar dataKey="v" fill="var(--viora-blue)" radius={[6,6,0,0]} />
            </BarChart></ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
