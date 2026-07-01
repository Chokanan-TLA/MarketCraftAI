import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Campaign } from "@/types/domain";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function CampaignTable({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-zinc-200 text-sm">
        <thead className="bg-zinc-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-zinc-500">Campaign</th>
            <th className="px-4 py-3 text-left font-medium text-zinc-500">Owner</th>
            <th className="px-4 py-3 text-left font-medium text-zinc-500">Status</th>
            <th className="px-4 py-3 text-left font-medium text-zinc-500">Content</th>
            <th className="px-4 py-3 text-left font-medium text-zinc-500">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td className="px-4 py-3">
                <div className="font-medium text-zinc-900">{campaign.name}</div>
                {campaign.description && (
                  <div className="text-xs text-zinc-500">{campaign.description}</div>
                )}
              </td>
              <td className="px-4 py-3 text-zinc-700">{campaign.owner.fullName}</td>
              <td className="px-4 py-3">
                <StatusBadge status={campaign.status} />
              </td>
              <td className="px-4 py-3 text-zinc-700">{campaign.contentRequestCount}</td>
              <td className="px-4 py-3 text-zinc-500">{formatDate(campaign.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
