import { createFileRoute } from "@tanstack/react-router";
import { GenericPage } from "@/components/viora/GenericPage";
import { FlaskConical } from "lucide-react";
export const Route = createFileRoute("/doctor/labs")({
  head: () => ({ meta: [{ title: "Lab Reports — Viora Clinician" }] }),
  component: () => <GenericPage title="Lab Reports" subtitle="Order, receive and review labs from every partner lab." icon={FlaskConical}
    intro="AI-normalized values across labs make trend analysis instant."
    bullets={["Multi-lab normalization", "Trend detection", "Critical value alerts", "Auto-attached to visits", "PDF & structured output", "One-tap orders"]}
    cards={[{ title: "Reports today", value: "84" }, { title: "Critical alerts", value: "3" }, { title: "TAT · avg", value: "4h 12m" }]} />,
});
