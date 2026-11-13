import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/viora/DashboardShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { records } from "@/lib/mock-data";
import { Search, Upload, Filter, FileText, Download, Eye } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/records")({
  head: () => ({ meta: [{ title: "Medical Records — Viora" }] }),
  component: RecordsPage,
});

function RecordsPage() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string>("All");
  const fileRef = useRef<HTMLInputElement>(null);

  const all = useMemo(() => [...records, ...records].map((r, i) => ({ ...r, key: i })), []);
  const filtered = all.filter((r) => {
    const matches = `${r.title} ${r.type} ${r.source}`.toLowerCase().includes(q.toLowerCase());
    const okTag = tag === "All" || r.tag === tag;
    return matches && okTag;
  });

  const cycleTag = () => {
    const opts = ["All", "Normal", "Attention", "Reviewed"];
    setTag((t) => opts[(opts.indexOf(t) + 1) % opts.length]);
  };

  const onUpload = (files: FileList | null) => {
    if (!files || !files.length) return;
    toast.success(`Uploaded ${files.length} file${files.length > 1 ? "s" : ""}`, {
      description: files[0].name,
    });
  };

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => onUpload(e.target.files)}
      />
      <PageHeader
        title="Medical Records"
        subtitle="Every report, prescription and clinical note — organized and searchable."
        actions={
          <Button
            className="bg-brand-gradient text-white"
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="h-4 w-4" /> Upload record
          </Button>
        }
      />
      <Card className="p-4 rounded-2xl mb-5">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records by name, doctor or type…"
              className="pl-9"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={cycleTag}>
            <Filter className="h-4 w-4" /> {tag === "All" ? "Filter" : tag}
          </Button>
        </div>
      </Card>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3 p-8 rounded-2xl text-center text-sm text-muted-foreground">
            No records match your search.
          </Card>
        )}
        {filtered.map((r) => (
          <Card key={r.key} className="p-5 rounded-2xl hover:shadow-elevate transition group">
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <Badge variant={r.tag === "Attention" ? "destructive" : "secondary"}>{r.tag}</Badge>
            </div>
            <h3 className="mt-4 font-medium truncate">{r.title}</h3>
            <div className="text-xs text-muted-foreground mt-1">{r.type} · {r.source}</div>
            <div className="text-xs text-muted-foreground">{r.date}</div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => toast.info(`Opening ${r.title}`)}
              >
                <Eye className="h-3.5 w-3.5" /> View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.success(`Downloading ${r.title}`)}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
