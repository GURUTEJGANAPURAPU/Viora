import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { familyMembers, patientProfile } from "@/lib/mock-data";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/family")({
  head: () => ({ meta: [{ title: "Family — Viora" }] }),
  component: FamilyPage,
});

type Member = { name: string; relation: string; age: number; score: number; avatar: string; self?: boolean };

function FamilyPage() {
  const [members, setMembers] = useState<Member[]>([
    { name: patientProfile.name, relation: "You", age: patientProfile.age, score: patientProfile.healthScore, avatar: patientProfile.avatar, self: true },
    ...familyMembers,
  ]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [age, setAge] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !relation || !age) { toast.error("Fill in all fields"); return; }
    const parts = name.split(" ").filter(Boolean);
    const avatar = ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
    setMembers((prev) => [...prev, { name, relation, age: Number(age), score: 80, avatar }]);
    toast.success(`${name} added to your family`);
    setName(""); setRelation(""); setAge(""); setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Family Members"
        subtitle="Manage the health of loved ones from one account."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-gradient text-white"><Plus className="h-4 w-4" /> Add member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add family member</DialogTitle></DialogHeader>
              <form onSubmit={add} className="space-y-4">
                <div className="space-y-1.5"><Label>Full name</Label><Input value={name} onChange={(e) => setName(e.target.value)} required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>Relation</Label><Input value={relation} onChange={(e) => setRelation(e.target.value)} placeholder="e.g. Mother" required /></div>
                  <div className="space-y-1.5"><Label>Age</Label><Input type="number" value={age} onChange={(e) => setAge(e.target.value)} required /></div>
                </div>
                <DialogFooter><Button type="submit" className="bg-brand-gradient text-white">Add</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => (
          <Card key={m.name} className="p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14"><AvatarFallback className="bg-brand-gradient text-white text-base">{m.avatar}</AvatarFallback></Avatar>
              <div>
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.relation} · {m.age}y</div>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-secondary/50 p-4">
              <div className="text-xs text-muted-foreground">Health Score</div>
              <div className="mt-1 text-3xl font-semibold">{m.score}</div>
            </div>
            <div className="mt-4 flex gap-2">
              {m.self ? (
                <Badge className="bg-primary/10 text-primary border-primary/20"><Users className="h-3 w-3" /> Primary account</Badge>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.info(`Opening ${m.name}'s profile`)}>View profile</Button>
                  <Button size="sm" className="flex-1 bg-brand-gradient text-white" onClick={() => toast.success(`Switched to ${m.name}`)}>Switch</Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
