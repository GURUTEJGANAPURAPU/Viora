import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { patients } from "@/lib/mock-data";
import { Sparkles, HeartPulse, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/doctor/ai")({
  head: () => ({ meta: [{ title: "AI Patient Summary — Viora" }] }),
  component: AIPatientSummary,
});

function AIPatientSummary() {
  const navigate = useNavigate();
  const p = patients[1];
  return (
    <div>
      <PageHeader
        title="AI Patient Summary"
        subtitle="A clinical-grade snapshot of any patient in seconds."
        actions={<Badge className="bg-primary/10 text-primary border-primary/20"><Sparkles className="h-3 w-3" /> Beta</Badge>}
      />

      <Card className="p-6 rounded-2xl mb-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16"><AvatarFallback className="bg-brand-gradient text-white text-xl">{p.name.split(" ").map(w=>w[0]).join("")}</AvatarFallback></Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <Badge variant="destructive">High risk</Badge>
            </div>
            <div className="text-sm text-muted-foreground">{p.id} · {p.age}y · {p.condition}</div>
          </div>
          <Button
            variant="outline"
            onClick={() => { toast.info(`Opening ${p.name}'s chart`); navigate({ to: "/doctor/patients" }); }}
          >
            Open chart
          </Button>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <Card className="p-6 rounded-2xl lg:col-span-2">
          <div className="text-xs text-primary font-medium flex items-center gap-1 mb-2"><Sparkles className="h-3.5 w-3.5" /> Viora AI · Clinical summary</div>
          <p className="text-sm leading-relaxed text-foreground">
            54-year-old male, 6 weeks post-anterior STEMI treated with primary PCI to the LAD (drug-eluting stent). Currently on dual antiplatelet therapy, high-intensity statin, beta-blocker and ACE inhibitor. Adherence trending 94% over 30 days per Viora medication logs.
            <br/><br/>
            Recent vitals show mildly elevated resting heart rate (avg. 82 bpm) and BP 138/86 — above target for secondary prevention. HbA1c stable at 6.1%. LDL improved from 148 → 78 mg/dL. Ejection fraction on last echo: 42%.
            <br/><br/>
            <span className="font-medium">Suggested actions:</span> Titrate beta-blocker; reinforce Mediterranean diet counseling; schedule cardiac rehab follow-up.
          </p>
        </Card>

        <div className="space-y-4">
          <Card className="p-5 rounded-2xl">
            <div className="text-xs text-muted-foreground">Cardio risk score</div>
            <div className="mt-2 text-4xl font-semibold text-viora-pink">62<span className="text-base text-muted-foreground">/100</span></div>
            <div className="mt-1 text-xs text-viora-pink flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Improving</div>
          </Card>
          <Card className="p-5 rounded-2xl">
            <div className="text-xs text-muted-foreground">Medication adherence</div>
            <div className="mt-2 text-4xl font-semibold text-viora-green">94%</div>
            <div className="mt-1 text-xs text-viora-green flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +6% this month</div>
          </Card>
          <Card className="p-5 rounded-2xl border-destructive/30 bg-destructive/5">
            <div className="text-xs text-destructive flex items-center gap-1 font-medium"><AlertTriangle className="h-3 w-3" /> Alert</div>
            <div className="mt-1 text-sm">Resting HR trending above target for 5 consecutive days.</div>
          </Card>
        </div>
      </div>

      <Card className="p-6 rounded-2xl">
        <h3 className="text-sm font-semibold mb-4">AI-suggested follow-ups</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Titrate beta-blocker", d: "Consider bumping metoprolol succinate 25 → 50 mg to reach HR target." },
            { t: "Order lipid panel", d: "Recheck LDL in 6 weeks to confirm statin response." },
            { t: "Cardiac rehab enrollment", d: "Adherence to rehab improves 1-yr outcomes by 25%." },
          ].map((s) => (
            <div key={s.t} className="rounded-xl border border-border p-4 flex flex-col">
              <div className="flex items-start gap-2"><HeartPulse className="h-4 w-4 text-primary mt-0.5" /><div className="font-medium text-sm">{s.t}</div></div>
              <p className="mt-2 text-xs text-muted-foreground flex-1">{s.d}</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={() => toast.success(`${s.t} added to plan`)}
              >
                Accept suggestion
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
