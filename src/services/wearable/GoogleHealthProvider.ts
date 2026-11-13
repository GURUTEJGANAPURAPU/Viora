import type { WearableProvider } from "./WearableProvider";
import {
  WearableUnavailableError,
  type BloodPressureSample,
  type CaloriesSample,
  type ConnectedDevice,
  type HealthInsight,
  type HealthSummary,
  type HeartRateSample,
  type PermissionState,
  type SleepSample,
  type Spo2Sample,
  type StepsSample,
  type TimelineEntry,
  type WeightSample,
} from "./types";

/**
 * GoogleHealthProvider — placeholder for Android Health Connect integration.
 *
 * TODO(capacitor): implement using @capacitor-community/health-connect (or
 * equivalent) once the project is wrapped as a Capacitor Android app.
 * TODO(capacitor): request Health Connect permissions
 * (HeartRate, Steps, Sleep, TotalCaloriesBurned, Weight, BloodPressure,
 * OxygenSaturation) via the native bridge in requestPermissions().
 * TODO(capacitor): read aggregated records via HealthConnect readRecords
 * and map them to the sample types in ./types.ts. Never synthesize data.
 *
 * Until the native bridge exists every lifecycle call throws
 * WearableUnavailableError and every read returns an empty result so the UI
 * naturally renders the "No health data available." states.
 */
export class GoogleHealthProvider implements WearableProvider {
  readonly id = "google-health-connect";
  readonly displayName = "Google Health Connect";

  async initialize(): Promise<void> {
    // No-op on web. Native bridge sets up the Health Connect client here.
  }

  async isAvailable(): Promise<boolean> {
    // TODO(capacitor): return HealthConnect.isAvailable() on Android.
    return false;
  }

  async requestPermissions(): Promise<PermissionState> {
    throw new WearableUnavailableError();
  }

  async connect(): Promise<ConnectedDevice> {
    throw new WearableUnavailableError();
  }

  async disconnect(): Promise<void> {
    throw new WearableUnavailableError();
  }

  async sync(): Promise<void> {
    throw new WearableUnavailableError();
  }

  async getConnectedDevice(): Promise<ConnectedDevice | null> {
    return null;
  }

  async getHealthSummary(): Promise<HealthSummary | null> {
    return null;
  }

  async getHeartRate(): Promise<HeartRateSample[]> {
    return [];
  }

  async getSteps(): Promise<StepsSample[]> {
    return [];
  }

  async getSleep(): Promise<SleepSample[]> {
    return [];
  }

  async getCalories(): Promise<CaloriesSample[]> {
    return [];
  }

  async getWeight(): Promise<WeightSample[]> {
    return [];
  }

  async getBloodPressure(): Promise<BloodPressureSample[]> {
    return [];
  }

  async getSpo2(): Promise<Spo2Sample[]> {
    return [];
  }

  async getTimeline(): Promise<TimelineEntry[]> {
    return [];
  }

  async getInsights(): Promise<HealthInsight[]> {
    return [];
  }
}
