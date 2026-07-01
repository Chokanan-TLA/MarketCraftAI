"use client";

import { useParams } from "next/navigation";
import { CampaignDetailView } from "@/features/campaign/components/CampaignDetailView";

export default function CampaignDetailPage() {
  const params = useParams<{ id: string }>();
  return <CampaignDetailView campaignId={params.id} />;
}
