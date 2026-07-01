"use client";

import { CampaignTable } from "@/components/shared/CampaignTable";
import { StatCard } from "@/components/shared/StatCard";
import { useMockData } from "@/lib/mock/store";
import { RecentContentList } from "./RecentContentList";

export function DashboardView() {
  const { campaigns, contentRequests } = useMockData();

  const stats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter((c) => c.status === "Active").length,
    contentGenerated: contentRequests.filter((r) => r.status === "Completed").length,
    pendingApprovals: contentRequests.filter((r) => r.status === "Pending").length,
  };

  const campaignsWithCounts = [...campaigns]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)
    .map((c) => ({
      ...c,
      contentRequestCount: contentRequests.filter((r) => r.campaignId === c.id).length,
    }));

  const recentContentRequests = [...contentRequests]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)
    .map((r) => ({
      ...r,
      campaignName: campaigns.find((c) => c.id === r.campaignId)?.name ?? "Unknown campaign",
    }));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">Mock data preview — not connected to the API yet.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Campaigns" value={stats.totalCampaigns} />
        <StatCard label="Active Campaigns" value={stats.activeCampaigns} />
        <StatCard label="Content Generated" value={stats.contentGenerated} />
        <StatCard label="Pending Approvals" value={stats.pendingApprovals} />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">Recent Campaigns</h2>
        <CampaignTable campaigns={campaignsWithCounts} />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">Recent Content Requests</h2>
        <RecentContentList requests={recentContentRequests} />
      </div>
    </div>
  );
}
