import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/doctor/teleconsult")({
  head: () => ({ meta: [{ title: "Teleconsultation — Viora Clinician" }] }),
  component: DocTelePage,
});

function DocTelePage() {
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div>
      <PageHeader title="Teleconsultation" subtitle="High-fidelity video visits with AI-assisted notes." />
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 rounded-2xl overflow-hidden">
          <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
            <Avatar className="h-32 w-32"><AvatarFallback className="bg-brand-gradient text-white text-4xl">AS</AvatarFallback></Avatar>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="font-medium">Ananya Sharma</div>
              <div className="text-xs text-white/70">Asthma follow-up · 12:04</div>
            </div>
            <div className="absolute top-4 right-4 w-32 aspect-video rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center">
              <span className="text-xs text-white/60">{camOn ? "You" : "Camera off"}</span>
            </div>
          </div>
          <div className="flex justify-center gap-3 p-4 bg-white">
            <Button
              variant="outline"
              size="icon"
              onClick={() => { setMicOn((v) => !v); toast.info(micOn ? "Microphone muted" : "Microphone on"); }}
              aria-label="Toggle mic"
            >
              {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => { setCamOn((v) => !v); toast.info(camOn ? "Camera off" : "Camera on"); }}
              aria-label="Toggle camera"
            >
              {camOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => { setChatOpen((v) => !v); toast.info(chatOpen ? "Chat closed" : "Chat opened"); }}
              aria-label="Toggle chat"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { toast.success("Call ended"); navigate({ to: "/doctor/appointments" }); }}
              aria-label="End call"
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </Card>
        <Card className="p-5 rounded-2xl">
          <div className="text-xs text-primary font-medium flex items-center gap-1 mb-2"><Sparkles className="h-3.5 w-3.5" /> Live AI transcript</div>
          <div className="space-y-3 text-sm">
            <div><span className="font-medium">Patient:</span> The mornings have been the toughest — some tightness around 6 AM.</div>
            <div><span className="font-medium">You:</span> Are you using the salbutamol inhaler as needed?</div>
            <div><span className="font-medium">Patient:</span> Only twice this week.</div>
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-2 text-xs">
              <div className="font-medium text-primary flex items-center gap-1"><Sparkles className="h-3 w-3" /> AI suggestion</div>
              Consider adding low-dose ICS for morning symptoms; peak flow trending 12% below baseline.
            </div>
          </div>
          <Button
            className="w-full mt-4 bg-brand-gradient text-white"
            onClick={() => { toast.success("AI note generated"); navigate({ to: "/doctor/notes" }); }}
          >
            <FileText className="h-4 w-4" /> Generate note
          </Button>
        </Card>
      </div>
    </div>
  );
}
