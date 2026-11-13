import { createFileRoute } from "@tanstack/react-router";
import { GenericPage } from "@/components/viora/GenericPage";
import { Settings } from "lucide-react";
export const Route = createFileRoute("/doctor/settings")({
  head: () => ({ meta: [{ title: "Settings — Viora Clinician" }] }),
  component: () => <GenericPage title="Settings" subtitle="Clinician profile, credentials and clinic preferences." icon={Settings}
    intro="Manage your professional identity across the Viora network."
    bullets={["Profile & credentials", "License verification", "Consult rates", "Clinic branding", "Team access", "API access"]}
    cards={[{ title: "License", value: "Verified" }, { title: "2FA", value: "Enabled" }, { title: "Plan", value: "Viora Clinic Pro" }]} />,
});
