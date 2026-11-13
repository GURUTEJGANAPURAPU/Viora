import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/viora/Logo";
import { HeartPulse, Stethoscope, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Viora" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { signIn, user } = useAppStore();
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: user.role === "patient" ? "/patient" : "/doctor" });
  }, [user, navigate]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter your email and password");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    signIn(role, email);
    toast.success("Welcome back to Viora");
    navigate({ to: role === "patient" ? "/patient" : "/doctor" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:flex bg-hero-gradient overflow-hidden">
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/"><Logo /></Link>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Trusted by 40,000+ patients & 500+ clinics
            </div>
            <h2 className="mt-6 text-5xl font-semibold tracking-tight leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Your Health.<br />
              <span className="text-brand-gradient">Connected for Life.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              One lifelong digital health identity across every hospital, lab and wearable — with AI that actually understands your data.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Viora Health</div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Link to="/"><Logo /></Link></div>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your Viora account</p>

          <Tabs value={role} onValueChange={(v) => setRole(v as "patient" | "doctor")} className="mt-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="patient" className="gap-2"><HeartPulse className="h-4 w-4" /> Patient</TabsTrigger>
              <TabsTrigger value="doctor" className="gap-2"><Stethoscope className="h-4 w-4" /> Doctor / Hospital</TabsTrigger>
            </TabsList>
            <TabsContent value="patient" className="mt-6">
              <LoginForm onSubmit={handle} placeholder="you@viora.health" email={email} setEmail={setEmail} password={password} setPassword={setPassword} loading={loading} />
            </TabsContent>
            <TabsContent value="doctor" className="mt-6">
              <LoginForm onSubmit={handle} placeholder="doctor@hospital.com" doctor email={email} setEmail={setEmail} password={password} setPassword={setPassword} loading={loading} />
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-sm text-center text-muted-foreground">
            New to Viora? <Link to="/signup" className="text-primary font-medium">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
  doctor?: boolean;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  loading: boolean;
}

function LoginForm({ onSubmit, placeholder, doctor, email, setEmail, password, setPassword, loading }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {doctor && (
        <div className="space-y-1.5">
          <Label htmlFor="hospital">Hospital / Clinic</Label>
          <Input id="hospital" defaultValue="Aurora Medical Center" />
        </div>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={placeholder} required />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <button
            type="button"
            onClick={() => toast.info("Password reset link sent (demo)")}
            className="text-xs text-primary"
          >Forgot password?</button>
        </div>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-brand-gradient text-white shadow-elevate">
        {loading ? "Signing in…" : "Sign in"}
      </Button>
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-xs uppercase text-muted-foreground"><span className="bg-background px-2">or</span></div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => toast.info("Google sign-in is coming soon")}
      >Continue with Google</Button>
    </form>
  );
}
