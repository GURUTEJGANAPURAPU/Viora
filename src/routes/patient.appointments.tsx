import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doctors } from "@/lib/mock-data";
import { useAppStore, type Appointment } from "@/lib/app-store";
import { Video, MapPin, Plus, Star, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/appointments")({
  head: () => ({ meta: [{ title: "Appointments — Viora" }] }),
  component: AppointmentsPage,
});

function AppointmentsPage() {
  const { appointments, bookAppointment, rescheduleAppointment, cancelAppointment, pushNotification } = useAppStore();
  const [bookOpen, setBookOpen] = useState(false);
  const [reschedule, setReschedule] = useState<Appointment | null>(null);
  const [prefill, setPrefill] = useState<string | undefined>();

  const upcoming = appointments.filter((a) => a.status === "upcoming");

  const handleBook = (data: Omit<Appointment, "id" | "status">) => {
    bookAppointment(data);
    pushNotification({ title: "Appointment booked", detail: `${data.doctor} on ${data.date} at ${data.time}`, type: "appointment" });
    toast.success(`Booked with ${data.doctor}`);
    setBookOpen(false);
    setPrefill(undefined);
  };

  const openBookWith = (doctorName: string) => {
    setPrefill(doctorName);
    setBookOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Appointments"
        subtitle="Manage upcoming visits and book new consultations."
        actions={
          <Dialog open={bookOpen} onOpenChange={(o) => { setBookOpen(o); if (!o) setPrefill(undefined); }}>
            <DialogTrigger asChild>
              <Button className="bg-brand-gradient text-white"><Plus className="h-4 w-4" /> Book appointment</Button>
            </DialogTrigger>
            <BookDialog onBook={handleBook} prefillDoctor={prefill} />
          </Dialog>
        }
      />

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {upcoming.length === 0 && (
          <Card className="lg:col-span-3 p-8 rounded-2xl text-center text-sm text-muted-foreground">
            No upcoming appointments. Book one below.
          </Card>
        )}
        {upcoming.map((a) => (
          <Card key={a.id} className="p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary/10 text-primary">{a.doctor.split(" ").slice(-2).map(w => w[0]).join("")}</AvatarFallback></Avatar>
              <div className="flex-1">
                <div className="font-medium">{a.doctor}</div>
                <div className="text-xs text-muted-foreground">{a.specialty}</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { cancelAppointment(a.id); toast.success("Appointment cancelled"); }}
                aria-label="Cancel appointment"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{a.date}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{a.time}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Mode</span>
                <Badge variant="secondary" className="gap-1">
                  {a.mode === "Video" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}{a.mode}
                </Badge>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setReschedule(a)}>Reschedule</Button>
              <Button
                size="sm"
                className="flex-1 bg-brand-gradient text-white"
                onClick={() =>
                  a.mode === "Video"
                    ? toast.success(`Joining video call with ${a.doctor}…`)
                    : toast.info(`Directions to ${a.hospital} opened`)
                }
              >
                {a.mode === "Video" ? "Join" : "Directions"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-3">Recommended doctors</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((d) => (
          <Card key={d.name} className="p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11"><AvatarFallback className="bg-primary/10 text-primary">{d.name.split(" ").slice(-2).map(w => w[0]).join("")}</AvatarFallback></Avatar>
              <div className="flex-1">
                <div className="font-medium">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.specialty} · {d.exp}</div>
              </div>
              <div className="flex items-center gap-1 text-xs"><Star className="h-3 w-3 fill-viora-amber text-viora-amber" />{d.rating}</div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">from ₹{d.fee}</div>
              <Button size="sm" className="bg-brand-gradient text-white" onClick={() => openBookWith(d.name)}>Book</Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!reschedule} onOpenChange={(o) => { if (!o) setReschedule(null); }}>
        {reschedule && (
          <RescheduleDialog
            appointment={reschedule}
            onSave={(date, time) => {
              rescheduleAppointment(reschedule.id, date, time);
              toast.success("Appointment rescheduled");
              setReschedule(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}

function BookDialog({
  onBook,
  prefillDoctor,
}: {
  onBook: (a: Omit<Appointment, "id" | "status">) => void;
  prefillDoctor?: string;
}) {
  const initialDoctor = prefillDoctor ?? doctors[0].name;
  const initialSpec = doctors.find((d) => d.name === initialDoctor)?.specialty ?? doctors[0].specialty;
  const [doctor, setDoctor] = useState(initialDoctor);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState<"Video" | "In-person">("Video");

  const specialty = doctors.find((d) => d.name === doctor)?.specialty ?? initialSpec;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) { toast.error("Pick a date and time"); return; }
    const d = new Date(date);
    const dateLabel = isNaN(d.getTime())
      ? date
      : d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });
    onBook({
      doctor,
      specialty,
      date: dateLabel,
      time,
      mode,
      hospital: mode === "Video" ? "Viora Cloud Clinic" : "Aurora Medical Center",
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Book appointment</DialogTitle>
        <DialogDescription>Choose a clinician and a time that works for you.</DialogDescription>
      </DialogHeader>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label>Doctor</Label>
          <Select value={doctor} onValueChange={setDoctor}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {doctors.map((d) => (
                <SelectItem key={d.name} value={d.name}>{d.name} · {d.specialty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label>Time</Label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Mode</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as "Video" | "In-person")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Video">Video consultation</SelectItem>
              <SelectItem value="In-person">In-person visit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-brand-gradient text-white">Confirm booking</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

function RescheduleDialog({
  appointment,
  onSave,
}: {
  appointment: Appointment;
  onSave: (date: string, time: string) => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState(appointment.time);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) { toast.error("Pick a date and time"); return; }
    const d = new Date(date);
    const label = isNaN(d.getTime())
      ? date
      : d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });
    onSave(label, time);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Reschedule</DialogTitle>
        <DialogDescription>Change date or time for your visit with {appointment.doctor}.</DialogDescription>
      </DialogHeader>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>New date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label>New time</Label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-brand-gradient text-white">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
