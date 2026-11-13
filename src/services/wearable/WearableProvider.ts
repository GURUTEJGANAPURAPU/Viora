import type {
  BloodPressureSample,
  CaloriesSample,
  ConnectedDevice,
  HealthInsight,
  HealthSummary,
  HeartRateSample,
  PermissionState,
  SleepSample,
  Spo2Sample,
  StepsSample,
  TimelineEntry,
  WeightSample,
} from "./types";

/**
 * WearableProvider is the contract every native health integration must
 * implement. Today only a stub GoogleHealthProvider exists; on Android
 * (post-Capacitor conversion) this will be backed by Health Connect.
 *
 * Implementations MUST NOT fabricate data. When no data is available they
 * should return empty arrays / null and throw WearableUnavailableError from
 * lifecycle calls (connect / sync / requestPermissions) that require a
 * native bridge.
 */
export interface WearableProvider {
  readonly id: string;
  readonly displayName: string;

  initialize(): Promise<void>;
  isAvailable(): Promise<boolean>;
  requestPermissions(): Promise<PermissionState>;
  connect(): Promise<ConnectedDevice>;
  disconnect(): Promise<void>;
  sync(): Promise<void>;

  getConnectedDevice(): Promise<ConnectedDevice | null>;
  getHealthSummary(): Promise<HealthSummary | null>;
  getHeartRate(rangeHours?: number): Promise<HeartRateSample[]>;
  getSteps(days?: number): Promise<StepsSample[]>;
  getSleep(days?: number): Promise<SleepSample[]>;
  getCalories(days?: number): Promise<CaloriesSample[]>;
  getWeight(days?: number): Promise<WeightSample[]>;
  getBloodPressure(days?: number): Promise<BloodPressureSample[]>;
  getSpo2(days?: number): Promise<Spo2Sample[]>;
  getTimeline(limit?: number): Promise<TimelineEntry[]>;
  getInsights(): Promise<HealthInsight[]>;
}
