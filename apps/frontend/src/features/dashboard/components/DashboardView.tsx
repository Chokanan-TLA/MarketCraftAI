import { StatCard } from "@/components/shared/StatCard";
import type { Campaign, ContentRequest, DashboardStats } from "@/types/domain";
import { CampaignTable } from "./CampaignTable";
import { RecentContentList } from "./RecentContentList";

export function DashboardView({
  stats,
  campaigns,
  recentContentRequests,
}: {
  stats: DashboardStats;
  campaigns: Campaign[];
  recentContentRequests: ContentRequest[];
}) {
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
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">Campaigns</h2>
        <CampaignTable campaigns={campaigns} />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">Recent Content Requests</h2>
        <RecentContentList requests={recentContentRequests} />
      </div>
    </div>
  );
}
