import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { patients as seedPatients } from "@/lib/mock-data";
import { Search, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/doctor/patients")({
  head: () => ({ meta: [{ title: "Patients — Viora Clinician" }] }),
  component: PatientsList,
});

function PatientsList() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(seedPatients);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");

  const filtered = useMemo(
    () => patients.filter((p) => `${p.name} ${p.id}`.toLowerCase().includes(q.toLowerCase())),
    [patients, q],
  );

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !condition) { toast.error("Fill in all fields"); return; }
    const id = `V-${Math.floor(100000 + Math.random() * 900000)}`;
    setPatients((prev) => [
      { id, name, age: Number(age), condition, risk: "Low", last: "just now" },
      ...prev,
    ]);
    toast.success(`${name} added to your roster`);
    setName(""); setAge(""); setCondition(""); setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Patients"
        subtitle="Your active patient roster."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-gradient text-white"><Plus className="h-4 w-4" /> Add patient</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add patient</DialogTitle></DialogHeader>
              <form onSubmit={add} className="space-y-4">
                <div className="space-y-1.5"><Label>Full name</Label><Input value={name} onChange={(e) => setName(e.target.value)} required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>Age</Label><Input type="number" value={age} onChange={(e) => setAge(e.target.value)} required /></div>
                  <div className="space-y-1.5"><Label>Condition</Label><Input value={condition} onChange={(e) => setCondition(e.target.value)} required /></div>
                </div>
                <DialogFooter><Button type="submit" className="bg-brand-gradient text-white">Add patient</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <Card className="p-3 rounded-2xl mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patient by name or Viora ID…"
            className="pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </Card>
      <Card className="rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Patient</th>
              <th className="text-left px-4 py-3 font-medium">Viora ID</th>
              <th className="text-left px-4 py-3 font-medium">Age</th>
              <th className="text-left px-4 py-3 font-medium">Condition</th>
              <th className="text-left px-4 py-3 font-medium">Risk</th>
              <th className="text-left px-4 py-3 font-medium">Last visit</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10 text-primary text-xs">{p.name.split(" ").map((w) => w[0]).join("")}</AvatarFallback></Avatar>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3">{p.age}</td>
                <td className="px-4 py-3">{p.condition}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={p.risk === "High" ? "destructive" : p.risk === "Medium" ? "default" : "secondary"}
                    className={p.risk === "Medium" ? "bg-viora-amber/20 text-viora-amber border-transparent hover:bg-viora-amber/25" : ""}
                  >
                    {p.risk}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.last}</td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { toast.info(`Opening ${p.name}'s chart`); navigate({ to: "/doctor/ai" }); }}
                  >
                    Open
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-muted-foreground">No patients match.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
