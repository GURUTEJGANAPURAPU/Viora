import { createFileRoute } from "@tanstack/react-router";
import { GenericPage } from "@/components/viora/GenericPage";
import { FlaskConical } from "lucide-react";
import { records } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/patient/labs")({
  head: () => ({ meta: [{ title: "Lab Reports — Viora" }] }),
  component: () => (
    <GenericPage
      title="Lab Reports"
      subtitle="All your lab reports from every partner lab in one view."
      icon={FlaskConical}
      intro="AI flags out-of-range values and trends across time."
      cards={[
        { title: "Reports this year", value: "18" },
        { title: "Attention flags", value: "1", sub: "Lipid Profile — Nov 2" },
        { title: "Partner labs", value: "12+" },
      ]}
    >
      <div className="mt-6 grid gap-3">
        {records.filter(r => r.type === "Lab Report").map((r) => (
          <Card key={r.title} className="p-4 rounded-xl flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-viora-green/15 text-viora-green flex items-center justify-center"><FlaskConical className="h-4 w-4" /></div>
            <div className="flex-1"><div className="text-sm font-medium">{r.title}</div><div className="text-xs text-muted-foreground">{r.source} · {r.date}</div></div>
            <Badge variant={r.tag === "Attention" ? "destructive" : "secondary"}>{r.tag}</Badge>
          </Card>
        ))}
      </div>
    </GenericPage>
  ),
});
