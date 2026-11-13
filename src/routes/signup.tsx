import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/viora/Logo";
import { HeartPulse, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your Viora account" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { signIn, user } = useAppStore();
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [firstName, setFirstName] = useState("Ananya");
  const [lastName, setLastName] = useState("Sharma");
  const [doctorName, setDoctorName] = useState("Dr. Rohan Verma");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) navigate({ to: user.role === "patient" ? "/patient" : "/doctor" });
  }, [user, navigate]);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length < 6) {
      toast.error("Enter a valid email and a password with 6+ characters");
      return;
    }
    const name = role === "patient" ? `${firstName} ${lastName}`.trim() : doctorName.trim();
    signIn(role, email, name);
    toast.success("Your Viora health identity is ready");
    navigate({ to: role === "patient" ? "/patient" : "/doctor" });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10 bg-hero-gradient">
      <div className="w-full max-w-lg">
        <Link to="/" className="flex justify-center mb-8"><Logo /></Link>
        <div className="rounded-3xl border border-border bg-white p-8 shadow-elevate">
          <h1 className="text-2xl font-semibold tracking-tight text-center">Create your Viora account</h1>
          <p className="mt-1 text-sm text-muted-foreground text-center">Your lifelong digital health identity</p>

          <Tabs value={role} onValueChange={(v) => setRole(v as "patient" | "doctor")} className="mt-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="patient" className="gap-2"><HeartPulse className="h-4 w-4" /> Patient</TabsTrigger>
              <TabsTrigger value="doctor" className="gap-2"><Stethoscope className="h-4 w-4" /> Doctor</TabsTrigger>
            </TabsList>
            <TabsContent value="patient" className="mt-6">
              <form onSubmit={handle} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>First name</Label><Input value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
                  <div className="space-y-1.5"><Label>Last name</Label><Input value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
                </div>
                <div className="space-y-1.5"><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@viora.health" /></div>
                <div className="space-y-1.5"><Label>Password</Label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></div>
                <Button className="w-full bg-brand-gradient text-white shadow-elevate">Create account</Button>
              </form>
            </TabsContent>
            <TabsContent value="doctor" className="mt-6">
              <form onSubmit={handle} className="space-y-4">
                <div className="space-y-1.5"><Label>Full name</Label><Input value={doctorName} onChange={(e) => setDoctorName(e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>Hospital</Label><Input defaultValue="Aurora Medical" /></div>
                  <div className="space-y-1.5"><Label>Specialty</Label><Input defaultValue="Cardiology" /></div>
                </div>
                <div className="space-y-1.5"><Label>Work email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="doctor@hospital.com" /></div>
                <div className="space-y-1.5"><Label>Password</Label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <Button className="w-full bg-brand-gradient text-white shadow-elevate">Create clinician account</Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-sm text-center text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-medium">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
