"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useMockData } from "@/lib/mock/store";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function CampaignDetailView({ campaignId }: { campaignId: string }) {
  const { getCampaign, getContentRequestsForCampaign, getLatestGeneratedContent } = useMockData();
  const campaign = getCampaign(campaignId);

  if (!campaign) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/campaign" className="text-sm text-zinc-500 hover:underline">
          ← Back to campaigns
        </Link>
        <p className="text-zinc-600">Campaign not found.</p>
      </div>
    );
  }

  const requests = getContentRequestsForCampaign(campaignId);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/campaign" className="text-sm text-zinc-500 hover:underline">
        ← Back to campaigns
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{campaign.name}</h1>
          {campaign.description && <p className="mt-1 text-sm text-zinc-500">{campaign.description}</p>}
        </div>
        <StatusBadge status={campaign.status} />
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-xl border border-zinc-200 bg-white p-5 text-sm shadow-sm sm:grid-cols-3">
        <div>
          <dt className="text-zinc-500">Owner</dt>
          <dd className="mt-1 font-medium text-zinc-900">{campaign.owner.fullName}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Created</dt>
          <dd className="mt-1 font-medium text-zinc-900">{formatDate(campaign.createdAt)}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Content Requests</dt>
          <dd className="mt-1 font-medium text-zinc-900">{requests.length}</dd>
        </div>
      </dl>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">Content Requests</h2>
        <ul className="flex flex-col gap-3">
          {requests.map((request) => {
            const generated = getLatestGeneratedContent(request.id);
            return (
              <li key={request.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-medium text-zinc-900">{request.prompt}</p>
                  <StatusBadge status={request.status} />
                </div>
                <p className="mt-1 text-xs text-zinc-500">{formatDate(request.createdAt)}</p>
                {generated && (
                  <p className="mt-3 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700">{generated.generatedResult}</p>
                )}
              </li>
            );
          })}
          {requests.length === 0 && (
            <li className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500">
              No content requests for this campaign yet. Generate one from the Generator page.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
