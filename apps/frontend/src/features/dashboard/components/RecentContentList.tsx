import { StatusBadge } from "@/components/shared/StatusBadge";
import type { ContentRequest } from "@/types/domain";

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function RecentContentList({ requests }: { requests: ContentRequest[] }) {
  return (
    <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      {requests.map((request) => (
        <li key={request.id} className="flex items-start justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-900">{request.prompt}</p>
            <p className="mt-1 text-xs text-zinc-500">
              {request.campaignName} · {formatTime(request.createdAt)}
            </p>
          </div>
          <StatusBadge status={request.status} />
        </li>
      ))}
    </ul>
  );
}
