import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  appointments as seedAppointments,
  medicines as seedMedicines,
  notifications as seedNotifications,
  patientProfile,
  doctorProfile,
} from "./mock-data";

export type Role = "patient" | "doctor";

export interface AuthUser {
  role: Role;
  name: string;
  email: string;
  avatar: string;
  sub: string;
}

export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  mode: "Video" | "In-person";
  hospital: string;
  status: "upcoming" | "cancelled" | "completed";
}

export interface Medicine {
  id: string;
  name: string;
  time: string;
  type: string;
  taken: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  detail: string;
  time: string;
  type: string;
  read: boolean;
}

interface AppState {
  user: AuthUser | null;
  appointments: Appointment[];
  medicines: Medicine[];
  notifications: AppNotification[];
  signIn: (role: Role, email: string, name?: string) => AuthUser;
  signOut: () => void;
  bookAppointment: (a: Omit<Appointment, "id" | "status">) => void;
  rescheduleAppointment: (id: string, date: string, time: string) => void;
  cancelAppointment: (id: string) => void;
  toggleMedicine: (id: string) => void;
  addMedicine: (m: Omit<Medicine, "id" | "taken">) => void;
  markAllNotificationsRead: () => void;
  pushNotification: (n: Omit<AppNotification, "id" | "read" | "time">) => void;
}

const AppCtx = createContext<AppState | null>(null);
const KEY = "viora-app-v1";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function loadInitial() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(
    seedAppointments.map((a) => ({ ...a, id: uid(), status: "upcoming", mode: a.mode as "Video" | "In-person" })),
  );
  const [medicines, setMedicines] = useState<Medicine[]>(
    seedMedicines.map((m) => ({ ...m, id: uid() })),
  );
  const [notifications, setNotifications] = useState<AppNotification[]>(
    seedNotifications.map((n) => ({ ...n, id: uid(), read: false })),
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const data = loadInitial();
    if (data) {
      if (data.user) setUser(data.user);
      if (data.appointments) setAppointments(data.appointments);
      if (data.medicines) setMedicines(data.medicines);
      if (data.notifications) setNotifications(data.notifications);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      KEY,
      JSON.stringify({ user, appointments, medicines, notifications }),
    );
  }, [user, appointments, medicines, notifications, hydrated]);

  const value = useMemo<AppState>(
    () => ({
      user,
      appointments,
      medicines,
      notifications,
      signIn: (role, email, name) => {
        const base = role === "patient" ? patientProfile : doctorProfile;
        const displayName = name?.trim() || base.name;
        const parts = displayName.split(" ").filter(Boolean);
        const avatar = (parts[0]?.[0] ?? "V") + (parts[parts.length - 1]?.[0] ?? "");
        const u: AuthUser = {
          role,
          name: displayName,
          email,
          avatar: avatar.toUpperCase(),
          sub:
            role === "patient"
              ? patientProfile.id
              : `${doctorProfile.specialty} · ${doctorProfile.hospital}`,
        };
        setUser(u);
        return u;
      },
      signOut: () => setUser(null),
      bookAppointment: (a) =>
        setAppointments((prev) => [{ ...a, id: uid(), status: "upcoming" }, ...prev]),
      rescheduleAppointment: (id, date, time) =>
        setAppointments((prev) => prev.map((x) => (x.id === id ? { ...x, date, time } : x))),
      cancelAppointment: (id) =>
        setAppointments((prev) => prev.map((x) => (x.id === id ? { ...x, status: "cancelled" } : x))),
      toggleMedicine: (id) =>
        setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m))),
      addMedicine: (m) =>
        setMedicines((prev) => [...prev, { ...m, id: uid(), taken: false }]),
      markAllNotificationsRead: () =>
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
      pushNotification: (n) =>
        setNotifications((prev) => [
          { ...n, id: uid(), read: false, time: "just now" },
          ...prev,
        ]),
    }),
    [user, appointments, medicines, notifications],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}
