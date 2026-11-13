import { createFileRoute } from "@tanstack/react-router";
import { GenericPage } from "@/components/viora/GenericPage";
import { Pill } from "lucide-react";
export const Route = createFileRoute("/doctor/prescriptions")({
  head: () => ({ meta: [{ title: "Prescriptions — Viora Clinician" }] }),
  component: () => <GenericPage title="Prescriptions" subtitle="E-prescribe with drug-drug interaction and allergy checks." icon={Pill}
    intro="Digital prescriptions instantly delivered to the patient's pharmacy of choice."
    bullets={["Formulary-aware autocomplete", "Interaction & allergy checks", "Refill tracking", "Direct-to-pharmacy delivery", "Digital signature", "Patient adherence signals"]}
    cards={[{ title: "Prescriptions · month", value: "412" }, { title: "Interaction flags", value: "18" }, { title: "Refill rate", value: "88%" }]} />,
});
