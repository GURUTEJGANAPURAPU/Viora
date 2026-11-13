import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { SectionCard } from "@/components/viora/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Bell,
  HeartPulse,
  Info,
  Link2Off,
  Moon,
  Plug,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Watch,
  Flame,
  Footprints,
  Activity,
  Scale,
  Droplet,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  useBloodPressure,
  useCalories,
  useConnectedDevice,
  useHealthInsights,
  useHealthSummary,
  useHealthTimeline,
  useHeartRate,
  useSleep,
  useSpo2,
  useSteps,
  useWearableActions,
  useWearableAvailability,
  useWeight,
} from "@/hooks/use-wearable";
import { WearableUnavailableError } from "@/services/wearable";
import { useState, type ComponentType, type ReactNode } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/wearables")({
  head: () => ({ meta: [{ title: "Wearables — Viora" }] }),
  component: WearablesPage,
});

/* -------------------------------------------------------------------------- */
/* Building blocks                                                            */
/* -------------------------------------------------------------------------- */

function friendlyError(err: unknown): string {
  if (err instanceof WearableUnavailableError) {
    return "Native Health Connect integration is not installed.";
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong.";
}

function EmptyState({
  icon: Icon,
  title,
  detail,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  detail?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 gap-2 text-muted-foreground">
      <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-sm font-medium text-foreground">{title}</div>
      {detail && <div className="text-xs max-w-xs">{detail}</div>}
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  isLoading,
  error,
  value,
  unit,
  hint,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  isLoading: boolean;
  error: unknown;
  value: number | string | null | undefined;
  unit?: string;
  hint?: string;
}) {
  return (
    <Card className="p-5 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      <div className="mt-4 text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight min-h-[2rem]">
        {isLoading ? (
          <Skeleton className="h-7 w-20" />
        ) : error ? (
          <span className="text-sm text-destructive font-normal">Unavailable</span>
        ) : value === null || value === undefined ? (
          <span className="text-sm text-muted-foreground font-normal">No data</span>
        ) : (
          <>
            {value}
            {unit && <span className="ml-1 text-xs text-muted-foreground font-normal">{unit}</span>}
          </>
        )}
      </div>
    </Card>
  );
}

function ChartFrame({
  isLoading,
  error,
  isEmpty,
  children,
}: {
  isLoading: boolean;
  error: unknown;
  isEmpty: boolean;
  children: ReactNode;
}) {
  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-64">
        <EmptyState icon={AlertCircle} title="Couldn't load data" detail={friendlyError(error)} />
      </div>
    );
  }
  if (isEmpty) {
    return (
      <div className="h-64">
        <EmptyState icon={Info} title="No health data available." />
      </div>
    );
  }
  return <div className="h-64">{children}</div>;
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

function WearablesPage() {
  const availability = useWearableAvailability();
  const device = useConnectedDevice();
  const summary = useHealthSummary();
  const heartRate = useHeartRate(24);
  const steps = useSteps(7);
  const sleep = useSleep(7);
  const calories = useCalories(7);
  const weight = useWeight(30);
  const bloodPressure = useBloodPressure(30);
  const spo2 = useSpo2(7);
  const timeline = useHealthTimeline(25);
  const insights = useHealthInsights();

  const { connect, disconnect, sync, requestPermissions } = useWearableActions();

  const [backgroundSync, setBackgroundSync] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const isAvailable = availability.data === true;
  const connectedDevice = device.data ?? null;
  const status = connectedDevice?.status ?? (isAvailable ? "disconnected" : "no-device");

  const runAction = async (
    fn: () => Promise<unknown>,
    labels: { loading: string; success: string },
  ) => {
    const id = toast.loading(labels.loading);
    try {
      await fn();
      toast.success(labels.success, { id });
    } catch (e) {
      toast.error(friendlyError(e), { id });
    }
  };

  const onSync = () =>
    runAction(() => sync.mutateAsync(), {
      loading: "Syncing health data…",
      success: "Sync complete",
    });
  const onConnect = () =>
    runAction(() => connect.mutateAsync(), {
      loading: "Connecting to Health Connect…",
      success: "Device connected",
    });
  const onDisconnect = () =>
    runAction(() => disconnect.mutateAsync(), {
      loading: "Disconnecting…",
      success: "Device disconnected",
    });
  const onRequestPermissions = () =>
    runAction(() => requestPermissions.mutateAsync(), {
      loading: "Requesting permissions…",
      success: "Permissions granted",
    });

  return (
    <div>
      <PageHeader
        title="Wearables"
        subtitle="Live vitals and lifestyle insights from your connected devices."
        actions={
          <Button variant="outline" onClick={onSync} disabled={sync.isPending}>
            <RefreshCw className={`h-4 w-4 ${sync.isPending ? "animate-spin" : ""}`} />
            {sync.isPending ? "Syncing…" : "Sync"}
          </Button>
        }
      />

      {/* Availability banner */}
      {!availability.isLoading && !isAvailable && (
        <Card className="p-5 rounded-2xl mb-5 border-dashed">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Info className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Native Health Connect integration is not installed.</div>
              <p className="text-sm text-muted-foreground mt-1">
                Wearable data will appear here after this app is installed on Android with Health
                Connect enabled. Every screen is ready — no UI changes are needed once the native
                bridge is available.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* Connected device */}
        <Card className="p-6 rounded-2xl lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-brand-gradient text-white flex items-center justify-center">
              <Watch className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Connected device</div>
              <div className="text-xs text-muted-foreground capitalize">
                {status.replace("-", " ")}
              </div>
            </div>
          </div>

          <div className="mt-5">
            {device.isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-28" />
              </div>
            ) : device.error ? (
              <EmptyState icon={AlertCircle} title="Couldn't load device" detail={friendlyError(device.error)} />
            ) : !connectedDevice ? (
              <div className="text-sm text-muted-foreground">No wearable connected.</div>
            ) : (
              <div className="text-sm space-y-1">
                <div className="font-medium text-foreground">{connectedDevice.name}</div>
                <div className="text-muted-foreground">{connectedDevice.manufacturer}</div>
                <div className="text-muted-foreground">Provider: {connectedDevice.provider}</div>
                <div className="text-muted-foreground">
                  Last sync: {connectedDevice.lastSync ?? "Never"}
                </div>
                <div className="pt-2">
                  <Badge className="bg-viora-green/15 text-viora-green border-transparent hover:bg-viora-green/20">
                    Connected
                  </Badge>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {status === "permission-required" && (
              <Button size="sm" onClick={onRequestPermissions} disabled={requestPermissions.isPending}>
                <ShieldCheck className="h-4 w-4" /> Grant permissions
              </Button>
            )}
            {!connectedDevice ? (
              <Button size="sm" onClick={onConnect} disabled={connect.isPending}>
                <Plug className="h-4 w-4" />
                {connect.isPending ? "Connecting…" : "Connect"}
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={onDisconnect} disabled={disconnect.isPending}>
                <Link2Off className="h-4 w-4" /> Disconnect
              </Button>
            )}
          </div>
        </Card>

        {/* Metrics */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          <MetricCard
            icon={HeartPulse}
            label="Resting heart rate"
            isLoading={summary.isLoading}
            error={summary.error}
            value={summary.data?.restingHeartRate ?? null}
            unit="bpm"
          />
          <MetricCard
            icon={Footprints}
            label="Steps today"
            isLoading={summary.isLoading}
            error={summary.error}
            value={summary.data?.stepsToday ?? null}
          />
          <MetricCard
            icon={Moon}
            label="Sleep last night"
            isLoading={summary.isLoading}
            error={summary.error}
            value={summary.data?.sleepLastNightHours ?? null}
            unit="h"
          />
          <MetricCard
            icon={Flame}
            label="Calories today"
            isLoading={summary.isLoading}
            error={summary.error}
            value={summary.data?.caloriesToday ?? null}
            unit="kcal"
          />
          <MetricCard
            icon={Droplet}
            label="SpO₂"
            isLoading={summary.isLoading}
            error={summary.error}
            value={summary.data?.spo2Latest ?? null}
            unit="%"
          />
          <MetricCard
            icon={Activity}
            label="Blood pressure"
            isLoading={summary.isLoading}
            error={summary.error}
            value={
              summary.data?.bloodPressureLatest
                ? `${summary.data.bloodPressureLatest.systolic}/${summary.data.bloodPressureLatest.diastolic}`
                : null
            }
            unit="mmHg"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <SectionCard title="Heart rate — 24h">
          <ChartFrame
            isLoading={heartRate.isLoading}
            error={heartRate.error}
            isEmpty={(heartRate.data?.length ?? 0) === 0}
          >
            <ResponsiveContainer>
              <AreaChart data={heartRate.data ?? []}>
                <defs>
                  <linearGradient id="hr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--viora-purple)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--viora-purple)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="timestamp" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="bpm" stroke="var(--viora-purple)" strokeWidth={2} fill="url(#hr)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>
        </SectionCard>

        <SectionCard title="Steps — 7 days">
          <ChartFrame
            isLoading={steps.isLoading}
            error={steps.error}
            isEmpty={(steps.data?.length ?? 0) === 0}
          >
            <ResponsiveContainer>
              <BarChart data={steps.data ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="steps" fill="var(--viora-blue)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </SectionCard>

        <SectionCard title="Sleep — 7 days">
          <ChartFrame
            isLoading={sleep.isLoading}
            error={sleep.error}
            isEmpty={(sleep.data?.length ?? 0) === 0}
          >
            <ResponsiveContainer>
              <BarChart data={sleep.data ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="hours" fill="var(--viora-pink)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </SectionCard>

        <SectionCard title="Calories — 7 days">
          <ChartFrame
            isLoading={calories.isLoading}
            error={calories.error}
            isEmpty={(calories.data?.length ?? 0) === 0}
          >
            <ResponsiveContainer>
              <BarChart data={calories.data ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="kcal" fill="var(--viora-amber)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </SectionCard>
      </div>

      {/* Additional metrics */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <SectionCard title="Weight — 30 days">
          <ChartFrame
            isLoading={weight.isLoading}
            error={weight.error}
            isEmpty={(weight.data?.length ?? 0) === 0}
          >
            <ResponsiveContainer>
              <AreaChart data={weight.data ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="timestamp" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="kg" stroke="var(--viora-green)" fill="var(--viora-green)" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Scale className="h-3.5 w-3.5" />
            Data from Health Connect weight records.
          </div>
        </SectionCard>

        <SectionCard title="Blood pressure — 30 days">
          <ChartFrame
            isLoading={bloodPressure.isLoading}
            error={bloodPressure.error}
            isEmpty={(bloodPressure.data?.length ?? 0) === 0}
          >
            <ResponsiveContainer>
              <BarChart data={bloodPressure.data ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="timestamp" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="systolic" fill="var(--viora-purple)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="diastolic" fill="var(--viora-blue)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </SectionCard>

        <SectionCard title="SpO₂ — 7 days">
          <ChartFrame
            isLoading={spo2.isLoading}
            error={spo2.error}
            isEmpty={(spo2.data?.length ?? 0) === 0}
          >
            <ResponsiveContainer>
              <AreaChart data={spo2.data ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="timestamp" fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <YAxis fontSize={10} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="percent" stroke="var(--viora-pink)" fill="var(--viora-pink)" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>
        </SectionCard>
      </div>

      {/* Insights + Timeline */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <SectionCard title="AI insights">
          {insights.isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : insights.error ? (
            <EmptyState icon={AlertCircle} title="Couldn't load insights" detail={friendlyError(insights.error)} />
          ) : (insights.data?.length ?? 0) === 0 ? (
            <EmptyState icon={Sparkles} title="No insights available." detail="Insights appear once your device syncs real health data." />
          ) : (
            <ul className="space-y-3">
              {insights.data!.map((i) => (
                <li key={i.id} className="rounded-xl border p-4">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        i.severity === "positive"
                          ? "bg-viora-green/15 text-viora-green border-transparent"
                          : i.severity === "warning"
                            ? "bg-amber-500/15 text-amber-600 border-transparent"
                            : "bg-primary/10 text-primary border-transparent"
                      }
                    >
                      {i.severity}
                    </Badge>
                    <div className="text-sm font-medium">{i.title}</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{i.detail}</div>
                  <div className="text-xs text-muted-foreground mt-1">Source: {i.source}</div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Health timeline">
          {timeline.isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : timeline.error ? (
            <EmptyState icon={AlertCircle} title="Couldn't load timeline" detail={friendlyError(timeline.error)} />
          ) : (timeline.data?.length ?? 0) === 0 ? (
            <EmptyState icon={Info} title="No health data available." />
          ) : (
            <ol className="relative border-l pl-5 space-y-4">
              {timeline.data!.map((t) => (
                <li key={t.id} className="ml-2">
                  <div className="absolute -left-1.5 h-3 w-3 rounded-full bg-primary" />
                  <div className="text-xs text-muted-foreground">{t.timestamp}</div>
                  <div className="text-sm font-medium">{t.title}</div>
                  {t.detail && <div className="text-sm text-muted-foreground">{t.detail}</div>}
                </li>
              ))}
            </ol>
          )}
        </SectionCard>
      </div>

      {/* Settings */}
      <SectionCard title="Settings">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <div className="text-sm font-medium">Background sync</div>
              <div className="text-xs text-muted-foreground">Keep vitals up to date automatically.</div>
            </div>
            <Switch
              checked={backgroundSync}
              onCheckedChange={(v) => {
                setBackgroundSync(v);
                toast.success(v ? "Background sync enabled" : "Background sync disabled");
              }}
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <div className="text-sm font-medium">Notifications</div>
              <div className="text-xs text-muted-foreground">Alerts for abnormal readings and reminders.</div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={(v) => {
                setNotifications(v);
                toast.success(v ? "Notifications on" : "Notifications off");
              }}
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <div className="text-sm font-medium">Permissions</div>
              <div className="text-xs text-muted-foreground">Manage Health Connect data scopes.</div>
            </div>
            <Button size="sm" variant="outline" onClick={onRequestPermissions} disabled={requestPermissions.isPending}>
              <ShieldCheck className="h-4 w-4" /> Manage
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <div className="text-sm font-medium">Connection</div>
              <div className="text-xs text-muted-foreground">Reconnect or disconnect your device.</div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={onConnect} disabled={connect.isPending}>
                <Plug className="h-4 w-4" /> Reconnect
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onDisconnect}
                disabled={disconnect.isPending || !connectedDevice}
              >
                <Link2Off className="h-4 w-4" /> Disconnect
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl border p-4 sm:col-span-2">
            <div>
              <div className="text-sm font-medium">Alerts channel</div>
              <div className="text-xs text-muted-foreground">Where reminders and abnormal-reading alerts arrive.</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => toast.success("Alert preferences opened")}>
              <Bell className="h-4 w-4" /> Configure
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
