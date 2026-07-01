import { DashboardView } from "@/features/dashboard/components/DashboardView";
import { mockCampaigns, mockDashboardStats, mockRecentContentRequests } from "@/features/dashboard/mock-data";

export default function DashboardPage() {
  return (
    <DashboardView
      stats={mockDashboardStats}
      campaigns={mockCampaigns}
      recentContentRequests={mockRecentContentRequests}
    />
  );
}
