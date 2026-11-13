import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { insurance as seedInsurance } from "@/lib/mock-data";
import { Shield, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/insurance")({
  head: () => ({ meta: [{ title: "Insurance — Viora" }] }),
  component: InsurancePage,
});

function InsurancePage() {
  const [insurance, setInsurance] = useState(seedInsurance);
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState("");
  const [policy, setPolicy] = useState("");
  const [cover, setCover] = useState("");
  const [renewal, setRenewal] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider || !policy || !cover || !renewal) { toast.error("Fill in all fields"); return; }
    setInsurance((prev) => [...prev, { provider, policy, cover, renewal, status: "Active" }]);
    toast.success(`${provider} policy linked`);
    setProvider(""); setPolicy(""); setCover(""); setRenewal(""); setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Insurance"
        subtitle="All policies, one place. Claim faster with connected records."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-gradient text-white"><Plus className="h-4 w-4" /> Link policy</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Link insurance policy</DialogTitle></DialogHeader>
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-1.5"><Label>Provider</Label><Input value={provider} onChange={(e) => setProvider(e.target.value)} required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>Policy #</Label><Input value={policy} onChange={(e) => setPolicy(e.target.value)} required /></div>
                  <div className="space-y-1.5"><Label>Sum insured</Label><Input value={cover} onChange={(e) => setCover(e.target.value)} placeholder="₹10L" required /></div>
                </div>
                <div className="space-y-1.5"><Label>Renewal date</Label><Input value={renewal} onChange={(e) => setRenewal(e.target.value)} placeholder="Mar 2026" required /></div>
                <DialogFooter><Button type="submit" className="bg-brand-gradient text-white">Link policy</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="grid md:grid-cols-2 gap-5">
        {insurance.map((p) => (
          <Card key={p.policy} className="relative overflow-hidden p-6 rounded-2xl bg-brand-gradient text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-white/70 uppercase tracking-wider">Provider</div>
                <div className="mt-1 text-xl font-semibold">{p.provider}</div>
              </div>
              <Shield className="h-8 w-8 text-white/40" />
            </div>
            <div className="mt-8 text-3xl font-semibold">{p.cover}</div>
            <div className="text-xs text-white/70">Sum insured</div>
            <div className="mt-6 flex items-center justify-between text-sm">
              <div>
                <div className="text-white/70 text-xs">Policy</div>
                <div>{p.policy}</div>
              </div>
              <div>
                <div className="text-white/70 text-xs">Renewal</div>
                <div>{p.renewal}</div>
              </div>
              <Badge className="bg-white/20 text-white border-white/20 hover:bg-white/25">{p.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
