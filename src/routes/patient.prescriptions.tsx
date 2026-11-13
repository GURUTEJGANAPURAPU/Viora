import { createFileRoute } from "@tanstack/react-router";
import { GenericPage } from "@/components/viora/GenericPage";
import { Pill } from "lucide-react";
import { medicines } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/patient/prescriptions")({
  head: () => ({ meta: [{ title: "Prescriptions — Viora" }] }),
  component: () => (
    <GenericPage
      title="Prescriptions"
      subtitle="Every prescription across every doctor, structured and searchable."
      icon={Pill}
      intro="Viora AI parses handwritten and digital prescriptions into structured, refillable records."
      cards={[
        { title: "Active prescriptions", value: "5" },
        { title: "Refills due this week", value: "2" },
        { title: "Adherence — 30d", value: "92%" },
      ]}
    >
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {medicines.map((m) => (
          <Card key={m.name} className="p-4 rounded-xl flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Pill className="h-4 w-4" /></div>
            <div className="flex-1">
              <div className="text-sm font-medium">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.type} · {m.time}</div>
            </div>
            <Badge variant="secondary" className="text-[10px]">Active</Badge>
          </Card>
        ))}
      </div>
    </GenericPage>
  ),
});
