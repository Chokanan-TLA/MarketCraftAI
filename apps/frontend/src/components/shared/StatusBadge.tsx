import type { ApprovalStatus, CampaignStatus, ContentRequestStatus } from "@/types/domain";

type Status = CampaignStatus | ContentRequestStatus | ApprovalStatus;

const STATUS_STYLES: Record<Status, string> = {
  Draft: "bg-zinc-100 text-zinc-700",
  Active: "bg-emerald-100 text-emerald-700",
  Paused: "bg-amber-100 text-amber-700",
  Completed: "bg-blue-100 text-blue-700",
  Archived: "bg-zinc-100 text-zinc-500",
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Failed: "bg-red-100 text-red-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
