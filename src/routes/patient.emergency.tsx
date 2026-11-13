import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { patientProfile } from "@/lib/mock-data";
import { QrCode, Phone, AlertTriangle, Heart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/emergency")({
  head: () => ({ meta: [{ title: "Emergency QR — Viora" }] }),
  component: EmergencyPage,
});

function EmergencyPage() {
  return (
    <div>
      <PageHeader title="Emergency QR" subtitle="A tap-away digital medical card for first responders." />
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1 p-6 rounded-2xl text-center bg-gradient-to-br from-white to-primary/5">
          <div className="mx-auto h-56 w-56 rounded-2xl bg-white border border-border shadow-elevate p-3 grid place-items-center">
            <QrCode className="h-full w-full text-foreground" strokeWidth={0.6} />
          </div>
          <div className="mt-4 font-medium">{patientProfile.name}</div>
          <div className="text-xs text-muted-foreground">Viora ID: {patientProfile.id}</div>
          <Button
            className="mt-4 w-full bg-brand-gradient text-white"
            onClick={() => {
              toast.success("Emergency card ready", { description: "Opening print dialog…" });
              setTimeout(() => window.print(), 300);
            }}
          >
            Download / Print card
          </Button>
        </Card>
        <Card className="lg:col-span-2 p-6 rounded-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <Info label="Blood group" value={patientProfile.bloodGroup} tone="pink" />
            <Info label="Age" value={`${patientProfile.age}`} tone="blue" />
            <Info label="Allergies" value={patientProfile.allergies.join(", ")} tone="amber" />
            <Info label="Conditions" value={patientProfile.conditions.join(", ")} tone="green" />
          </div>
          <div className="mt-6">
            <h3 className="font-medium mb-2 flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> Emergency contacts</h3>
            <div className="space-y-2">
              {[
                { name: "Rohit Sharma (Spouse)", phone: "+91 98102 44119" },
                { name: "Dr. Rohan Verma (Cardiologist)", phone: "+91 98111 20320" },
                { name: "Aurora Medical Center", phone: "+91 11 4567 8900" },
              ].map((c) => (
                <a
                  key={c.name}
                  href={`tel:${c.phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-between rounded-xl border border-border p-3 text-sm hover:bg-secondary/40 transition"
                >
                  <span>{c.name}</span>
                  <Badge variant="secondary">{c.phone}</Badge>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
            <div className="text-sm">
              <div className="font-medium">Critical alert</div>
              <div className="text-muted-foreground">Severe penicillin allergy. Do not administer beta-lactam antibiotics.</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value, tone }: { label: string; value: string; tone: "pink"|"blue"|"amber"|"green" }) {
  const cls = { pink: "text-viora-pink", blue: "text-viora-blue", amber: "text-viora-amber", green: "text-viora-green" }[tone];
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="text-xs uppercase text-muted-foreground tracking-wider flex items-center gap-2"><Heart className={`h-3 w-3 ${cls}`} /> {label}</div>
      <div className="mt-2 font-medium">{value || "—"}</div>
    </div>
  );
}
