import { createFileRoute } from "@tanstack/react-router";
import { GenericPage } from "@/components/viora/GenericPage";
import { Settings } from "lucide-react";

export const Route = createFileRoute("/patient/settings")({
  head: () => ({ meta: [{ title: "Settings — Viora" }] }),
  component: () => (
    <GenericPage
      title="Settings"
      subtitle="Preferences, privacy and account controls."
      icon={Settings}
      intro="Fine-grained controls for how Viora handles your health data."
      bullets={[
        "Profile & identity",
        "Notification preferences",
        "Privacy & consent",
        "Connected devices",
        "Two-factor authentication",
        "Data export & deletion",
      ]}
      cards={[
        { title: "2FA", value: "Enabled" },
        { title: "Data region", value: "India" },
        { title: "Plan", value: "Viora Free" },
      ]}
    />
  ),
});
