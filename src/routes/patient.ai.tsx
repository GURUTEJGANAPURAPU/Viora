import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aiInsights } from "@/lib/mock-data";
import { Sparkles, Send, FileText, HeartPulse, TrendingUp, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/patient/ai")({
  head: () => ({ meta: [{ title: "AI Assistant — Viora" }] }),
  component: AIPage,
});

const suggested = [
  "Summarize my last 3 lab reports",
  "Am I at risk for diabetes?",
  "What foods interact with my medication?",
  "Explain my ECG in plain English",
];


function generateReply(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("lab") || t.includes("report")) {
    return "Across your last 3 panels: CBC is normal, LDL rose from 108 → 124 mg/dL (worth a lifestyle nudge), HbA1c stable at 5.3%, and thyroid within range. I've flagged the LDL trend for your next visit.";
  }
  if (t.includes("diabet") || t.includes("sugar") || t.includes("glucose")) {
    return "Your fasting glucose (94 mg/dL) and HbA1c (5.3%) are optimal. With your BMI, activity level and family history, your 10-year type-2 risk is Low. Keep steps above 8k/day and limit refined carbs.";
  }
  if (t.includes("ecg") || t.includes("heart") || t.includes("cardio")) {
    return "Your latest ECG is unremarkable — normal sinus rhythm, no ST changes. Resting HR trend is 62–74 bpm and HRV is trending up. Overall cardio profile: Excellent.";
  }
  if (t.includes("food") || t.includes("diet") || t.includes("interact")) {
    return "Watch grapefruit and high-vitamin-K greens if you're ever prescribed statins or warfarin. With Montelukast and your current inhaler, no notable food interactions — but avoid alcohol close to dosing.";
  }
  if (t.includes("sleep")) {
    return "Deep sleep improved 18% over 2 weeks (avg 1h 42m). Keep the 10:30pm wind-down. Consider dimming lights 60 minutes earlier for another 6–8% gain.";
  }
  if (t.includes("weight") || t.includes("bmi")) {
    return "Your weight is stable at 62 ± 1.5 kg over 12 months. BMI 22.4 (healthy). No action needed — trend is favorable.";
  }
  return "I've cross-referenced your records and wearables. Everything I can see is within safe parameters. Ask about your labs, ECG, sleep, medications or risk of a specific condition — I can go deep.";
}

interface Msg { role: "user" | "ai"; text: string }

function AIPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi Ananya — I've reviewed your latest records. Your cardio profile looks strong. What can I help with today?" },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const send = (text: string) => {
    if (!text.trim() || thinking) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: generateReply(text) }]);
      setThinking(false);
    }, 600);
  };
  return (
    <div>
      <PageHeader
        title="Viora AI Assistant"
        subtitle="An AI that actually understands your health — trained for clinical nuance, private by design."
        actions={<Badge className="bg-primary/10 text-primary border-primary/20"><Sparkles className="h-3 w-3" /> Beta</Badge>}
      />
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 p-0 rounded-2xl overflow-hidden flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-secondary/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-white border border-border"}`}>
                  {m.role === "ai" && <div className="text-[10px] font-medium text-primary flex items-center gap-1 mb-1"><Sparkles className="h-3 w-3" /> Viora AI</div>}
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border bg-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {suggested.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition">{s}</button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your health, records, or symptoms…" />
              <Button type="submit" className="bg-brand-gradient text-white"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5 rounded-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Capabilities</div>
            <div className="space-y-3 text-sm">
              {[
                { icon: FileText, text: "Report summarization" },
                { icon: HeartPulse, text: "Risk prediction" },
                { icon: TrendingUp, text: "Trend analysis" },
                { icon: ShieldCheck, text: "Preventive insights" },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><c.icon className="h-4 w-4" /></div>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5 rounded-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Today's insights</div>
            <div className="space-y-3">
              {aiInsights.map((i) => (
                <div key={i.title}>
                  <div className="text-sm font-medium">{i.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{i.detail}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
