import { createFileRoute } from "@tanstack/react-router";
import { GenericPage } from "@/components/viora/GenericPage";
import { FileText } from "lucide-react";
export const Route = createFileRoute("/doctor/records")({
  head: () => ({ meta: [{ title: "Medical Records — Viora" }] }),
  component: () => <GenericPage title="Medical Records" subtitle="Longitudinal patient records across the network." icon={FileText}
    intro="Search across every hospital and lab your patient has visited — subject to consent."
    bullets={["Cross-institution retrieval", "Consent-gated access", "AI summarization on open", "Interop via FHIR R4", "PDF & DICOM support", "Immutable audit trail"]}
    cards={[{ title: "Records this month", value: "3,242" }, { title: "Consent-gated", value: "100%" }, { title: "Avg. retrieval", value: "0.9s" }]} />,
});
