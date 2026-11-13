import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { useAppStore } from "@/lib/app-store";
import { Pill, Bell, Plus, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/medicines")({
  head: () => ({ meta: [{ title: "Medicine Reminder — Viora" }] }),
  component: MedicinesPage,
});

function MedicinesPage() {
  const { medicines, toggleMedicine, addMedicine } = useAppStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Tablet");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !time) { toast.error("Add a name and time"); return; }
    addMedicine({ name, time, type });
    toast.success(`${name} added to your schedule`);
    setName(""); setTime(""); setType("Tablet"); setOpen(false);
  };

  return (
    <div>
      <PageHeader title="Medicine Reminder" subtitle="Never miss a dose. Smart reminders adapt to your day."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-gradient text-white"><Plus className="h-4 w-4" /> Add medicine</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add medicine</DialogTitle></DialogHeader>
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-1.5"><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Vitamin D3" required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>Time</Label><Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required /></div>
                  <div className="space-y-1.5"><Label>Type</Label><Input value={type} onChange={(e) => setType(e.target.value)} /></div>
                </div>
                <DialogFooter><Button type="submit" className="bg-brand-gradient text-white">Add</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        } />
      <Card className="rounded-2xl divide-y divide-border">
        {medicines.map((m) => (
          <div key={m.id} className="p-4 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Pill className="h-5 w-5" /></div>
            <div className="flex-1">
              <div className="font-medium">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.type} · daily at {m.time}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toast.success(`Reminder set for ${m.time}`)}><Bell className="h-4 w-4" /></Button>
            <Button
              variant={m.taken ? "secondary" : "default"}
              size="sm"
              className={m.taken ? "" : "bg-brand-gradient text-white"}
              onClick={() => toggleMedicine(m.id)}
            >
              {m.taken ? <><CheckCircle2 className="h-4 w-4" /> Taken</> : <><Circle className="h-4 w-4" /> Mark taken</>}
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
