import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  tone = "purple",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  trend?: string;
  tone?: "purple" | "blue" | "green" | "pink" | "amber";
}) {
  const toneClass = {
    purple: "bg-viora-purple/10 text-viora-purple",
    blue: "bg-viora-blue/10 text-viora-blue",
    green: "bg-viora-green/10 text-viora-green",
    pink: "bg-viora-pink/10 text-viora-pink",
    amber: "bg-viora-amber/10 text-viora-amber",
  }[tone];
  return (
    <Card className="p-5 border-border rounded-2xl hover:shadow-elevate transition">
      <div className="flex items-start justify-between">
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", toneClass)}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && <span className="text-xs text-muted-foreground">{trend}</span>}
      </div>
      <div className="mt-4 text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">
        {value}
        {unit && <span className="ml-1 text-xs text-muted-foreground font-normal">{unit}</span>}
      </div>
    </Card>
  );
}

export function SectionCard({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <Card className={cn("p-6 rounded-2xl", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        {action}
      </div>
      {children}
    </Card>
  );
}
