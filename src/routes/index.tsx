import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/viora/Logo";
import {
  Activity, Brain, Shield, Watch, HeartPulse, Users, Sparkles, ArrowRight,
  Stethoscope, FlaskConical, Building2, Pill, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Viora — Your Health. Connected for Life." }] }),
  component: Landing,
});

const features = [
  { icon: Brain, title: "AI Health Intelligence", desc: "Report summarization, risk prediction and personalized lifestyle insights — all on your data." },
  { icon: Shield, title: "One Lifelong Identity", desc: "A single, encrypted health identity that follows you across every hospital, lab and pharmacy." },
  { icon: Watch, title: "Wearables Connected", desc: "Apple Health, Google Health Connect, Fitbit, Garmin and Samsung — synced live." },
  { icon: HeartPulse, title: "Timeline of Everything", desc: "Every visit, prescription, vaccine and vital in one beautiful chronological view." },
  { icon: Users, title: "Family Care", desc: "Manage parents, children and elderly loved ones from one secure account." },
  { icon: Sparkles, title: "Preventive Insights", desc: "Catch problems early with AI-driven trend analysis and preventive nudges." },
];

const stakeholders = [
  { icon: HeartPulse, label: "Patients" },
  { icon: Stethoscope, label: "Doctors" },
  { icon: Building2, label: "Hospitals" },
  { icon: FlaskConical, label: "Labs" },
  { icon: Pill, label: "Pharmacies" },
  { icon: Watch, label: "Wearables" },
  { icon: Shield, label: "Insurance" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur">
        <div className="mx-auto max-w-7xl h-16 px-6 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Platform</a>
            <a href="#ai" className="hover:text-foreground">AI</a>
            <a href="#partners" className="hover:text-foreground">For providers</a>
            <a href="#security" className="hover:text-foreground">Security</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild><Link to="/login">Sign in</Link></Button>
            <Button asChild className="bg-brand-gradient text-white shadow-elevate"><Link to="/signup">Get started</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-28 md:pb-36 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Now with AI-powered clinical summaries
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
            Your Health.<br />
            <span className="text-brand-gradient">Connected for Life.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
            Viora unifies patients, doctors, hospitals, labs, pharmacies, wearables and insurance into one intelligent, lifelong digital health identity.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button size="lg" asChild className="bg-brand-gradient text-white shadow-elevate">
              <Link to="/signup">Create your health identity <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          </div>

          {/* Product mock */}
          <div className="relative mt-16 mx-auto max-w-5xl">
            <div className="absolute -inset-6 bg-brand-gradient opacity-20 blur-3xl rounded-[3rem]" />
            <div className="relative rounded-3xl border border-border bg-white shadow-elevate overflow-hidden">
              <div className="h-9 bg-secondary/60 border-b border-border flex items-center gap-1.5 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-xs text-muted-foreground">app.viora.health</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 p-6 text-left">
                <div className="rounded-2xl border border-border p-5 bg-gradient-to-br from-white to-primary/5">
                  <div className="text-xs text-muted-foreground">Health Score</div>
                  <div className="mt-2 text-4xl font-semibold">87</div>
                  <div className="mt-2 text-xs text-emerald-600">+4 this month</div>
                </div>
                <div className="rounded-2xl border border-border p-5">
                  <div className="text-xs text-muted-foreground">Heart Rate</div>
                  <div className="mt-2 flex items-end gap-1 h-16">
                    {[24,28,22,30,26,34,28,32,30,36,32,38,30,34,28].map((h, i) => (
                      <div key={i} className="w-1.5 rounded-full bg-brand-gradient" style={{ height: `${h}px` }} />
                    ))}
                  </div>
                  <div className="mt-1 text-sm font-medium">72 bpm</div>
                </div>
                <div className="rounded-2xl border border-border p-5">
                  <div className="text-xs text-muted-foreground">AI Insight</div>
                  <div className="mt-2 text-sm font-medium">Sleep quality trending up</div>
                  <p className="mt-1 text-xs text-muted-foreground">Deep sleep improved 18% over 2 weeks. Keep the wind-down routine.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section id="partners" className="border-y border-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="text-center text-xs uppercase tracking-widest text-muted-foreground">One platform · Every stakeholder</div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {stakeholders.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-muted-foreground">
                <s.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-sm font-medium text-primary">The platform</div>
          <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The operating system for your health.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Modern healthcare is fragmented. Viora is the connective tissue — a beautifully designed, AI-native platform that makes fragmentation obsolete.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-white p-6 hover:shadow-elevate transition group">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-brand-gradient group-hover:text-white transition">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI section */}
      <section id="ai" className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-medium text-primary">Viora Intelligence</div>
            <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              An AI that actually understands your health.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From OCR of handwritten prescriptions to natural-language search across your entire lifetime of records — Viora's AI is trained for clinical nuance and privacy by default.
            </p>
            <ul className="mt-6 space-y-3">
              {["Medical report summarization", "Prescription OCR & structured parsing", "Health risk prediction models", "Natural language health search"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-elevate">
            <div className="rounded-xl bg-secondary/60 p-4">
              <div className="text-xs text-muted-foreground">You</div>
              <div className="text-sm mt-1">"Summarize my last 3 lab reports and flag anything trending in the wrong direction."</div>
            </div>
            <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="text-xs text-primary font-medium flex items-center gap-1"><Sparkles className="h-3 w-3" /> Viora AI</div>
              <div className="text-sm mt-1 text-foreground">
                Across your last 3 panels, LDL cholesterol rose from 108 → 124 mg/dL — worth a lifestyle check-in. Fasting glucose, HbA1c and thyroid remain in optimal range. Full trend chart ready.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="mx-auto max-w-7xl px-6 py-24 text-center">
        <Shield className="h-10 w-10 text-primary mx-auto" />
        <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Encrypted. Consent-first. Yours.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          End-to-end encryption, role-based access, granular consent management and immutable audit logs. Your health data is a fundamental right — we treat it that way.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-12 md:p-16 text-white">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Build your lifelong health identity today.
            </h2>
            <p className="mt-4 text-white/85">Free for individuals and families. Enterprise-grade for hospitals and clinics.</p>
            <div className="mt-8 flex gap-3">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link to="/signup">Get Viora free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/40 text-white hover:bg-white/10 bg-transparent">
                <Link to="/login">I already have an account</Link>
              </Button>
            </div>
          </div>
          <Activity className="absolute right-8 bottom-8 h-56 w-56 text-white/10" />
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Logo />
          <div>© {new Date().getFullYear()} Viora Health. Your Health. Connected for Life.</div>
        </div>
      </footer>
    </div>
  );
}
