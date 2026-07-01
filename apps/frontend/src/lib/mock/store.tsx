"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Campaign, CampaignStatus, ContentRequest, ContentRequestStatus, GeneratedContent, User } from "@/types/domain";
import { currentUser as seedCurrentUser, seedCampaigns, seedContentRequests, seedGeneratedContents } from "./seed";

interface MockDataContextValue {
  campaigns: Campaign[];
  contentRequests: ContentRequest[];
  generatedContents: GeneratedContent[];
  currentUser: User;
  getCampaign: (id: string) => Campaign | undefined;
  getContentRequestsForCampaign: (campaignId: string) => ContentRequest[];
  getLatestGeneratedContent: (contentRequestId: string) => GeneratedContent | undefined;
  addCampaign: (input: { name: string; description?: string; status: CampaignStatus }) => Campaign;
  addContentRequest: (input: { campaignId: string; prompt: string }) => ContentRequest;
  setContentRequestStatus: (id: string, status: ContentRequestStatus) => void;
  addGeneratedContent: (input: { contentRequestId: string; generatedResult: string }) => GeneratedContent;
  updateCurrentUser: (input: { fullName: string; email: string }) => void;
}

const MockDataContext = createContext<MockDataContextValue | null>(null);

function nextId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(seedCampaigns);
  const [contentRequests, setContentRequests] = useState<ContentRequest[]>(seedContentRequests);
  const [generatedContents, setGeneratedContents] = useState<GeneratedContent[]>(seedGeneratedContents);
  const [currentUser, setCurrentUser] = useState<User>(seedCurrentUser);

  const getCampaign = useCallback((id: string) => campaigns.find((c) => c.id === id), [campaigns]);

  const getContentRequestsForCampaign = useCallback(
    (campaignId: string) =>
      contentRequests
        .filter((r) => r.campaignId === campaignId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [contentRequests],
  );

  const getLatestGeneratedContent = useCallback(
    (contentRequestId: string) => {
      const matches = generatedContents.filter((g) => g.contentRequestId === contentRequestId);
      if (matches.length === 0) return undefined;
      return matches.reduce((latest, current) => (current.version > latest.version ? current : latest));
    },
    [generatedContents],
  );

  const addCampaign = useCallback(
    (input: { name: string; description?: string; status: CampaignStatus }) => {
      const campaign: Campaign = {
        id: nextId("c"),
        name: input.name,
        description: input.description,
        status: input.status,
        owner: currentUser,
        createdAt: new Date().toISOString(),
      };
      setCampaigns((prev) => [campaign, ...prev]);
      return campaign;
    },
    [currentUser],
  );

  const addContentRequest = useCallback((input: { campaignId: string; prompt: string }) => {
    const request: ContentRequest = {
      id: nextId("r"),
      campaignId: input.campaignId,
      prompt: input.prompt,
      status: "Processing",
      createdAt: new Date().toISOString(),
    };
    setContentRequests((prev) => [request, ...prev]);
    return request;
  }, []);

  const setContentRequestStatus = useCallback((id: string, status: ContentRequestStatus) => {
    setContentRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const addGeneratedContent = useCallback(
    (input: { contentRequestId: string; generatedResult: string }) => {
      const existingVersions = generatedContents.filter((g) => g.contentRequestId === input.contentRequestId);
      const content: GeneratedContent = {
        id: nextId("g"),
        contentRequestId: input.contentRequestId,
        version: existingVersions.length + 1,
        generatedResult: input.generatedResult,
        createdAt: new Date().toISOString(),
      };
      setGeneratedContents((prev) => [content, ...prev]);
      return content;
    },
    [generatedContents],
  );

  const updateCurrentUser = useCallback((input: { fullName: string; email: string }) => {
    setCurrentUser((prev) => ({ ...prev, fullName: input.fullName, email: input.email }));
  }, []);

  const value = useMemo<MockDataContextValue>(
    () => ({
      campaigns,
      contentRequests,
      generatedContents,
      currentUser,
      getCampaign,
      getContentRequestsForCampaign,
      getLatestGeneratedContent,
      addCampaign,
      addContentRequest,
      setContentRequestStatus,
      addGeneratedContent,
      updateCurrentUser,
    }),
    [
      campaigns,
      contentRequests,
      generatedContents,
      currentUser,
      getCampaign,
      getContentRequestsForCampaign,
      getLatestGeneratedContent,
      addCampaign,
      addContentRequest,
      setContentRequestStatus,
      addGeneratedContent,
      updateCurrentUser,
    ],
  );

  return <MockDataContext.Provider value={value}>{children}</MockDataContext.Provider>;
}

export function useMockData() {
  const ctx = useContext(MockDataContext);
  if (!ctx) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return ctx;
}
