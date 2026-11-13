import { createFileRoute } from "@tanstack/react-router";
import { GenericPage } from "@/components/viora/GenericPage";
import { FileBarChart } from "lucide-react";
export const Route = createFileRoute("/doctor/reports")({
  head: () => ({ meta: [{ title: "Hospital Reports — Viora" }] }),
  component: () => <GenericPage title="Hospital Reports" subtitle="Operational, clinical and financial reporting." icon={FileBarChart}
    intro="Real-time dashboards for administrators — from occupancy to outcomes."
    bullets={["Bed occupancy & flow", "Physician utilization", "Revenue by department", "Readmission analysis", "Length-of-stay trends", "Quality & safety KPIs"]}
    cards={[{ title: "Reports available", value: "24" }, { title: "Auto-scheduled", value: "12" }, { title: "Export formats", value: "PDF · CSV · API" }]} />,
});
