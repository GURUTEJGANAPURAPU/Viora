import { PageHeader } from "@/components/viora/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ComponentType, ReactNode as RN } from "react";
import { toast } from "sonner";

export function GenericPage({
  title,
  subtitle,
  icon: Icon,
  intro,
  bullets,
  cards,
  actionLabel = "Take action",
  onAction,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: ComponentType<{ className?: string }>;
  intro?: string;
  bullets?: string[];
  cards?: { title: string; value: string; sub?: string }[];
  actionLabel?: string;
  onAction?: () => void;
  children?: RN;
}) {
  const handleAction = () => {
    if (onAction) return onAction();
    toast.success(`${actionLabel} — ${title}`, {
      description: "Action completed successfully.",
    });
  };
  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <Button className="bg-brand-gradient text-white" onClick={handleAction}>
            {actionLabel}
          </Button>
        }
      />
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{intro}</p>
            </div>
          </div>
          {bullets && (
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <Badge variant="secondary" className="mt-0.5 h-1.5 w-1.5 rounded-full p-0" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          )}
          {children}
        </Card>
        <div className="space-y-4">
          {(cards ?? []).map((c) => (
            <Card key={c.title} className="p-5 rounded-2xl">
              <div className="text-xs text-muted-foreground">{c.title}</div>
              <div className="mt-2 text-2xl font-semibold">{c.value}</div>
              {c.sub && <div className="mt-1 text-xs text-muted-foreground">{c.sub}</div>}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
