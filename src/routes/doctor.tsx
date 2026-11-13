import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, Calendar, FileText, ClipboardList, Pill, FlaskConical,
  LineChart, Sparkles, CalendarClock, Video, FileBarChart, BellRing, Settings,
} from "lucide-react";
import { DashboardShell, type NavGroup } from "@/components/viora/DashboardShell";
import { doctorProfile } from "@/lib/mock-data";

export const Route = createFileRoute("/doctor")({
  head: () => ({ meta: [{ title: "Viora — Clinician" }] }),
  component: DoctorLayout,
});

const groups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Hospital Overview", to: "/doctor", icon: LayoutDashboard },
      { label: "Analytics", to: "/doctor/analytics", icon: LineChart },
      { label: "Hospital Reports", to: "/doctor/reports", icon: FileBarChart },
    ],
  },
  {
    label: "Patients",
    items: [
      { label: "Patients", to: "/doctor/patients", icon: Users },
      { label: "Appointments", to: "/doctor/appointments", icon: Calendar },
      { label: "Doctor Schedule", to: "/doctor/schedule", icon: CalendarClock },
      { label: "Teleconsultation", to: "/doctor/teleconsult", icon: Video },
    ],
  },
  {
    label: "Clinical",
    items: [
      { label: "Medical Records", to: "/doctor/records", icon: FileText },
      { label: "Clinical Notes", to: "/doctor/notes", icon: ClipboardList },
      { label: "Prescriptions", to: "/doctor/prescriptions", icon: Pill },
      { label: "Lab Reports", to: "/doctor/labs", icon: FlaskConical },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { label: "AI Patient Summary", to: "/doctor/ai", icon: Sparkles, badge: "New" },
      { label: "Notifications", to: "/doctor/notifications", icon: BellRing },
      { label: "Settings", to: "/doctor/settings", icon: Settings },
    ],
  },
];

function DoctorLayout() {
  return (
    <DashboardShell
      groups={groups}
      userName={doctorProfile.name}
      userSub={`${doctorProfile.specialty} · ${doctorProfile.hospital}`}
      userAvatar={doctorProfile.avatar}
      role="Doctor"
    />
  );
}
