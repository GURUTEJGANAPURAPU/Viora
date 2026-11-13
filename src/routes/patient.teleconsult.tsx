import { createFileRoute } from "@tanstack/react-router";
import { GenericPage } from "@/components/viora/GenericPage";
import { Video } from "lucide-react";
import { doctors } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/teleconsult")({
  head: () => ({ meta: [{ title: "Teleconsultation — Viora" }] }),
  component: TelePage,
});

function TelePage() {
  return (
    <GenericPage
      title="Teleconsultation"
      subtitle="Video consultations with specialists — with automatic notes and prescriptions."
      icon={Video}
      intro="HD video, secure chat, AI-generated visit summaries and e-prescriptions in one flow."
      actionLabel="Start instant visit"
      onAction={() => toast.success("Connecting you to the next available specialist…")}
      cards={[
        { title: "Available now", value: "42" },
        { title: "Avg. wait", value: "3 min" },
        { title: "Languages", value: "9" },
      ]}
    >
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {doctors.slice(0, 4).map((d) => (
          <Card key={d.name} className="p-4 rounded-xl flex items-center gap-3">
            <Avatar className="h-11 w-11"><AvatarFallback className="bg-primary/10 text-primary">{d.name.split(" ").slice(-2).map((w) => w[0]).join("")}</AvatarFallback></Avatar>
            <div className="flex-1"><div className="text-sm font-medium">{d.name}</div><div className="text-xs text-muted-foreground">{d.specialty}</div></div>
            <Button
              size="sm"
              className="bg-brand-gradient text-white"
              onClick={() => toast.success(`Connecting to ${d.name}…`)}
            >
              Connect
            </Button>
          </Card>
        ))}
      </div>
    </GenericPage>
  );
}

