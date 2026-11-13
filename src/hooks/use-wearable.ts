import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WearableService, WearableUnavailableError } from "@/services/wearable";

const KEYS = {
  availability: ["wearable", "availability"] as const,
  device: ["wearable", "device"] as const,
  summary: ["wearable", "summary"] as const,
  heartRate: ["wearable", "heartRate"] as const,
  steps: ["wearable", "steps"] as const,
  sleep: ["wearable", "sleep"] as const,
  calories: ["wearable", "calories"] as const,
  weight: ["wearable", "weight"] as const,
  bloodPressure: ["wearable", "bloodPressure"] as const,
  spo2: ["wearable", "spo2"] as const,
  timeline: ["wearable", "timeline"] as const,
  insights: ["wearable", "insights"] as const,
};

export const wearableQueryKeys = KEYS;

export function useWearableAvailability() {
  return useQuery({
    queryKey: KEYS.availability,
    queryFn: () => WearableService.isAvailable(),
    staleTime: 60_000,
  });
}

export function useConnectedDevice() {
  return useQuery({
    queryKey: KEYS.device,
    queryFn: () => WearableService.getConnectedDevice(),
  });
}

export function useHealthSummary() {
  return useQuery({
    queryKey: KEYS.summary,
    queryFn: () => WearableService.getHealthSummary(),
  });
}

export function useHeartRate(rangeHours = 24) {
  return useQuery({
    queryKey: [...KEYS.heartRate, rangeHours],
    queryFn: () => WearableService.getHeartRate(rangeHours),
  });
}

export function useSteps(days = 7) {
  return useQuery({
    queryKey: [...KEYS.steps, days],
    queryFn: () => WearableService.getSteps(days),
  });
}

export function useSleep(days = 7) {
  return useQuery({
    queryKey: [...KEYS.sleep, days],
    queryFn: () => WearableService.getSleep(days),
  });
}

export function useCalories(days = 7) {
  return useQuery({
    queryKey: [...KEYS.calories, days],
    queryFn: () => WearableService.getCalories(days),
  });
}

export function useWeight(days = 30) {
  return useQuery({
    queryKey: [...KEYS.weight, days],
    queryFn: () => WearableService.getWeight(days),
  });
}

export function useBloodPressure(days = 30) {
  return useQuery({
    queryKey: [...KEYS.bloodPressure, days],
    queryFn: () => WearableService.getBloodPressure(days),
  });
}

export function useSpo2(days = 7) {
  return useQuery({
    queryKey: [...KEYS.spo2, days],
    queryFn: () => WearableService.getSpo2(days),
  });
}

export function useHealthTimeline(limit = 25) {
  return useQuery({
    queryKey: [...KEYS.timeline, limit],
    queryFn: () => WearableService.getTimeline(limit),
  });
}

export function useHealthInsights() {
  return useQuery({
    queryKey: KEYS.insights,
    queryFn: () => WearableService.getInsights(),
  });
}

export function useWearableActions() {
  const qc = useQueryClient();
  const invalidateAll = () => qc.invalidateQueries({ queryKey: ["wearable"] });

  const connect = useMutation({
    mutationFn: () => WearableService.connect(),
    onSuccess: invalidateAll,
  });

  const disconnect = useMutation({
    mutationFn: () => WearableService.disconnect(),
    onSuccess: invalidateAll,
  });

  const sync = useMutation({
    mutationFn: () => WearableService.sync(),
    onSuccess: invalidateAll,
  });

  const requestPermissions = useMutation({
    mutationFn: () => WearableService.requestPermissions(),
    onSuccess: invalidateAll,
  });

  return { connect, disconnect, sync, requestPermissions };
}

export { WearableUnavailableError };
