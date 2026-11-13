import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { SectionCard } from "@/components/viora/StatCard";
import { Card } from "@/components/ui/card";
import { heartRateData, stepsData } from "@/lib/mock-data";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/patient/analytics")({
  head: () => ({ meta: [{ title: "Health Analytics — Viora" }] }),
  component: AnalyticsPage,
});

const weightData = Array.from({ length: 12 }, (_, i) => ({ m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], kg: 62 + Math.sin(i/2) * 1.5 + Math.random() }));
const sleepData = Array.from({ length: 7 }, (_, i) => ({ day: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i], hours: 6 + Math.random() * 2.5 }));

function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Health Analytics" subtitle="Beautiful, trustworthy insights across every dimension of your health." />
      <div className="grid lg:grid-cols-2 gap-5">
        <SectionCard title="Heart Rate — 24h">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={heartRateData}>
                <defs>
                  <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--viora-purple)" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="var(--viora-purple)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="time" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} interval={3}/>
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false}/>
                <Tooltip />
                <Area type="monotone" dataKey="bpm" stroke="var(--viora-purple)" strokeWidth={2} fill="url(#a1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Weekly steps">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={stepsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false}/>
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false}/>
                <Tooltip />
                <Bar dataKey="steps" fill="var(--viora-blue)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Weight (kg) — 12 months">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false}/>
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip />
                <Line type="monotone" dataKey="kg" stroke="var(--viora-green)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Sleep (hours)">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false}/>
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false}/>
                <Tooltip />
                <Bar dataKey="hours" fill="var(--viora-pink)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
