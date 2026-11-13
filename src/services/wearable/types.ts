// Wearable service types. These types are the contract between the UI layer
// and any native health provider implementation (e.g. Android Health Connect
// via Capacitor). The UI must only depend on this file and WearableService.

export type ConnectionStatus =
  | "no-device"
  | "permission-required"
  | "connecting"
  | "syncing"
  | "connected"
  | "disconnected"
  | "error";

export interface ConnectedDevice {
  id: string;
  name: string;
  manufacturer: string;
  provider: string;
  lastSync: string | null;
  status: ConnectionStatus;
}

export interface HeartRateSample {
  timestamp: string; // ISO
  bpm: number;
}

export interface StepsSample {
  date: string; // ISO date
  steps: number;
}

export interface SleepSample {
  date: string; // ISO date
  hours: number;
  stages?: { deep: number; light: number; rem: number; awake: number };
}

export interface CaloriesSample {
  date: string;
  kcal: number;
}

export interface WeightSample {
  timestamp: string;
  kg: number;
}

export interface BloodPressureSample {
  timestamp: string;
  systolic: number;
  diastolic: number;
}

export interface Spo2Sample {
  timestamp: string;
  percent: number;
}

export interface HealthSummary {
  restingHeartRate: number | null;
  stepsToday: number | null;
  sleepLastNightHours: number | null;
  caloriesToday: number | null;
  spo2Latest: number | null;
  weightLatestKg: number | null;
  bloodPressureLatest: { systolic: number; diastolic: number } | null;
}

export interface TimelineEntry {
  id: string;
  timestamp: string;
  kind: "workout" | "sleep" | "measurement" | "note" | "sync";
  title: string;
  detail?: string;
}

export interface HealthInsight {
  id: string;
  title: string;
  detail: string;
  severity: "info" | "positive" | "warning";
  source: string;
}

export interface PermissionState {
  granted: boolean;
  missing: string[]; // list of permission scopes not yet granted
}

export class WearableUnavailableError extends Error {
  constructor(message = "Native implementation required") {
    super(message);
    this.name = "WearableUnavailableError";
  }
}
