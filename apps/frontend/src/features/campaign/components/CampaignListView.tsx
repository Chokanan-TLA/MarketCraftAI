"use client";

import { useMemo, useState } from "react";
import { CampaignTable } from "@/components/shared/CampaignTable";
import { useMockData } from "@/lib/mock/store";
import type { CampaignStatus } from "@/types/domain";
import { NewCampaignForm } from "./NewCampaignForm";

const STATUS_FILTERS: Array<CampaignStatus | "All"> = ["All", "Draft", "Active", "Paused", "Completed", "Archived"];

export function CampaignListView() {
  const { campaigns, contentRequests } = useMockData();
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "All">("All");

  const filtered = useMemo(() => {
    const list = statusFilter === "All" ? campaigns : campaigns.filter((c) => c.status === statusFilter);
    return [...list]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((c) => ({ ...c, contentRequestCount: contentRequests.filter((r) => r.campaignId === c.id).length }));
  }, [campaigns, contentRequests, statusFilter]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Campaigns</h1>
          <p className="mt-1 text-sm text-zinc-500">{campaigns.length} total</p>
        </div>
        <NewCampaignForm />
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusFilter === status
                ? "bg-zinc-900 text-white"
                : "border border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <CampaignTable campaigns={filtered} />
    </div>
  );
}
