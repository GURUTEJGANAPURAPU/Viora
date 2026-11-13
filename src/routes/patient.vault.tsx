import { createFileRoute } from "@tanstack/react-router";
import { GenericPage } from "@/components/viora/GenericPage";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/patient/vault")({
  head: () => ({ meta: [{ title: "Health Vault — Viora" }] }),
  component: () => (
    <GenericPage
      title="Health Vault"
      subtitle="End-to-end encrypted storage for your most sensitive records."
      icon={Lock}
      intro="Zero-knowledge encryption, biometric access and granular sharing consents."
      bullets={[
        "AES-256 end-to-end encryption",
        "Biometric-only unlock",
        "Consent-based, time-boxed sharing",
        "Immutable audit log",
        "Zero-knowledge architecture",
        "HIPAA & DPDP compliant",
      ]}
      cards={[
        { title: "Files stored", value: "128" },
        { title: "Storage used", value: "412 MB", sub: "of 5 GB free tier" },
        { title: "Active shares", value: "3" },
      ]}
    />
  ),
});
