import { createFileRoute } from "@tanstack/react-router";
import {
  Home, FileText, Pill, FlaskConical, Activity, LineChart, Watch, Bell,
  Calendar, Video, Shield, Users, QrCode, Lock, Sparkles, BellRing, Settings,
} from "lucide-react";
import { DashboardShell, type NavGroup } from "@/components/viora/DashboardShell";
import { patientProfile } from "@/lib/mock-data";

export const Route = createFileRoute("/patient")({
  head: () => ({ meta: [{ title: "Viora — Patient" }] }),
  component: PatientLayout,
});

const groups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Home", to: "/patient", icon: Home },
      { label: "Health Analytics", to: "/patient/analytics", icon: LineChart },
      { label: "Health Timeline", to: "/patient/timeline", icon: Activity },
    ],
  },
  {
    label: "Records",
    items: [
      { label: "Medical Records", to: "/patient/records", icon: FileText },
      { label: "Prescriptions", to: "/patient/prescriptions", icon: Pill },
      { label: "Lab Reports", to: "/patient/labs", icon: FlaskConical },
      { label: "Health Vault", to: "/patient/vault", icon: Lock },
    ],
  },
  {
    label: "Care",
    items: [
      { label: "Appointments", to: "/patient/appointments", icon: Calendar },
      { label: "Teleconsultation", to: "/patient/teleconsult", icon: Video },
      { label: "Medicine Reminder", to: "/patient/medicines", icon: Bell },
      { label: "Wearables", to: "/patient/wearables", icon: Watch },
    ],
  },
  {
    label: "Personal",
    items: [
      { label: "Family Members", to: "/patient/family", icon: Users },
      { label: "Insurance", to: "/patient/insurance", icon: Shield },
      { label: "Emergency QR", to: "/patient/emergency", icon: QrCode },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { label: "AI Assistant", to: "/patient/ai", icon: Sparkles, badge: "New" },
      { label: "Notifications", to: "/patient/notifications", icon: BellRing },
      { label: "Settings", to: "/patient/settings", icon: Settings },
    ],
  },
];

function PatientLayout() {
  return (
    <DashboardShell
      groups={groups}
      userName={patientProfile.name}
      userSub={patientProfile.id}
      userAvatar={patientProfile.avatar}
      role="Patient"
    />
  );
}
