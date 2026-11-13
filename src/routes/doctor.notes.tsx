import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/doctor/notes")({
  head: () => ({ meta: [{ title: "Clinical Notes — Viora" }] }),
  component: NotesPage,
});

type Section = { t: string; v: string };
const seed: Section[] = [
  { t: "Subjective", v: "Patient reports mild fatigue but no chest pain or dyspnea. Adherence to medications good. Sleep is restful." },
  { t: "Objective", v: "BP 138/86, HR 82, SpO2 98%. Auscultation clear. ECG unchanged from last visit." },
  { t: "Assessment", v: "Stable 6-week post-anterior STEMI on optimal medical therapy. HR and BP mildly above target." },
  { t: "Plan", v: "Titrate metoprolol succinate 25 → 50 mg. Repeat lipid panel in 6 weeks. Continue cardiac rehab. Follow-up 4 weeks." },
];

function NotesPage() {
  const [sections, setSections] = useState<Section[]>(seed);
  const [signed, setSigned] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selected, setSelected] = useState("Vikram Iyer · Post-MI follow-up");

  const regen = () => {
    setGenerating(true);
    setTimeout(() => {
      setSections((prev) =>
        prev.map((s) =>
          s.t === "Plan"
            ? { ...s, v: s.v + " Reinforce Mediterranean diet and stress reduction." }
            : s,
        ),
      );
      setGenerating(false);
      toast.success("AI regenerated the note");
    }, 700);
  };

  const update = (t: string, v: string) =>
    setSections((prev) => prev.map((s) => (s.t === t ? { ...s, v } : s)));

  return (
    <div>
      <PageHeader
        title="Clinical Notes"
        subtitle="AI-assisted SOAP notes that write themselves during consults."
        actions={
          <Button className="bg-brand-gradient text-white" onClick={regen} disabled={generating}>
            <Sparkles className="h-4 w-4" /> {generating ? "Generating…" : "Generate with AI"}
          </Button>
        }
      />
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium">{selected}</div>
              <div className="text-xs text-muted-foreground">14 Nov 2025 · 10:30 AM</div>
            </div>
            {signed ? (
              <Badge className="bg-viora-green/15 text-viora-green border-transparent"><Check className="h-3 w-3" /> Signed</Badge>
            ) : (
              <Badge className="bg-primary/10 text-primary border-primary/20"><Sparkles className="h-3 w-3" /> AI drafted</Badge>
            )}
          </div>
          <div className="space-y-4">
            {sections.map((s) => (
              <div key={s.t}>
                <div className="text-xs font-medium text-primary uppercase tracking-wider">{s.t}</div>
                <Textarea
                  value={s.v}
                  onChange={(e) => update(s.t, e.target.value)}
                  disabled={signed}
                  className="mt-1 min-h-[70px]"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => toast.success("Draft saved")} disabled={signed}>
              Save draft
            </Button>
            <Button
              className="bg-brand-gradient text-white"
              onClick={() => { setSigned(true); toast.success("Note signed & finalized"); }}
              disabled={signed}
            >
              {signed ? "Finalized" : "Sign & finalize"}
            </Button>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Recent notes</div>
          <div className="space-y-3">
            {[
              "Ananya Sharma · Asthma follow-up",
              "Neha Kapoor · Hypertension",
              "Rahul Chawla · Chest pain",
              "Divya Rao · Arrhythmia",
            ].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => { setSelected(n); setSigned(false); toast.info(`Loaded note: ${n}`); }}
                className={`w-full text-left rounded-xl border border-border p-3 text-sm hover:bg-secondary/40 transition ${selected === n ? "bg-secondary/60" : ""}`}
              >
                <div className="font-medium truncate">{n}</div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
