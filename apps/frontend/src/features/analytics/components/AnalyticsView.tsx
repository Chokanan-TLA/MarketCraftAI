"use client";

import { StatCard } from "@/components/shared/StatCard";
import { useMockData } from "@/lib/mock/store";
import type { CampaignStatus, ContentRequestStatus } from "@/types/domain";

const CAMPAIGN_STATUSES: CampaignStatus[] = ["Draft", "Active", "Paused", "Completed", "Archived"];
const REQUEST_STATUSES: ContentRequestStatus[] = ["Pending", "Processing", "Completed", "Failed"];

const STATUS_COLORS: Record<string, string> = {
  Draft: "bg-zinc-400",
  Active: "bg-emerald-500",
  Paused: "bg-amber-500",
  Completed: "bg-blue-500",
  Archived: "bg-zinc-300",
  Pending: "bg-amber-500",
  Processing: "bg-blue-500",
  Failed: "bg-red-500",
};

function BarRow({
  label,
  count,
  total,
  colorClass,
  labelClassName = "w-24 shrink-0 text-sm text-zinc-600",
}: {
  label: string;
  count: number;
  total: number;
  colorClass: string;
  labelClassName?: string;
}) {
  const pct = total === 0 ? 0 : Math.round((count / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className={labelClassName}>{label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 shrink-0 text-right text-sm text-zinc-500">{count}</span>
    </div>
  );
}

export function AnalyticsView() {
  const { campaigns, contentRequests } = useMockData();

  const totalRequests = contentRequests.length;
  const completed = contentRequests.filter((r) => r.status === "Completed").length;
  const failed = contentRequests.filter((r) => r.status === "Failed").length;
  const completionRate = totalRequests === 0 ? 0 : Math.round((completed / totalRequests) * 100);

  const topCampaigns = [...campaigns]
    .map((c) => ({ ...c, count: contentRequests.filter((r) => r.campaignId === c.id).length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const maxCampaignCount = Math.max(1, ...topCampaigns.map((c) => c.count));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Analytics</h1>
        <p className="mt-1 text-sm text-zinc-500">Derived from mock campaign and content-request data.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Requests" value={totalRequests} />
        <StatCard label="Completed" value={completed} />
        <StatCard label="Failed" value={failed} />
        <StatCard label="Completion Rate" value={`${completionRate}%`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-zinc-900">Campaigns by Status</h2>
          <div className="flex flex-col gap-3">
            {CAMPAIGN_STATUSES.map((status) => (
              <BarRow
                key={status}
                label={status}
                count={campaigns.filter((c) => c.status === status).length}
                total={campaigns.length}
                colorClass={STATUS_COLORS[status]}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-zinc-900">Content Requests by Status</h2>
          <div className="flex flex-col gap-3">
            {REQUEST_STATUSES.map((status) => (
              <BarRow
                key={status}
                label={status}
                count={contentRequests.filter((r) => r.status === status).length}
                total={totalRequests}
                colorClass={STATUS_COLORS[status]}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-zinc-900">Top Campaigns by Content Volume</h2>
        <div className="flex flex-col gap-3">
          {topCampaigns.map((c) => (
            <BarRow
              key={c.id}
              label={c.name}
              count={c.count}
              total={maxCampaignCount}
              colorClass="bg-zinc-900"
              labelClassName="w-40 shrink-0 truncate text-sm text-zinc-600"
            />
          ))}
          {topCampaigns.length === 0 && <p className="text-sm text-zinc-500">No campaigns yet.</p>}
        </div>
      </div>
    </div>
  );
}
