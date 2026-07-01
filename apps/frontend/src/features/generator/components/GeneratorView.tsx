"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/shared/Button";
import { FormField, inputClass } from "@/components/shared/FormField";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useMockData } from "@/lib/mock/store";
import { generatorSchema, type GeneratorFormValues } from "../schema";
import { simulateGeneratedContent } from "../simulate";

const GENERATION_DELAY_MS = 1400;

export function GeneratorView() {
  const {
    campaigns,
    contentRequests,
    generatedContents,
    addContentRequest,
    setContentRequestStatus,
    addGeneratedContent,
  } = useMockData();
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GeneratorFormValues>({
    resolver: zodResolver(generatorSchema),
    defaultValues: { campaignId: campaigns[0]?.id ?? "", prompt: "" },
  });

  const onSubmit = handleSubmit((values) => {
    const request = addContentRequest({ campaignId: values.campaignId, prompt: values.prompt });
    setPendingIds((prev) => new Set(prev).add(request.id));

    setTimeout(() => {
      addGeneratedContent({
        contentRequestId: request.id,
        generatedResult: simulateGeneratedContent(values.prompt),
      });
      setContentRequestStatus(request.id, "Completed");
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(request.id);
        return next;
      });
    }, GENERATION_DELAY_MS);

    reset({ campaignId: values.campaignId, prompt: "" });
  });

  const recent = [...contentRequests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Generator</h1>
        <p className="mt-1 text-sm text-zinc-500">Simulated generation — no live LLM call yet.</p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <FormField label="Campaign" htmlFor="campaignId" error={errors.campaignId?.message}>
          <select id="campaignId" className={inputClass} {...register("campaignId")}>
            <option value="">Select a campaign</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Prompt" htmlFor="prompt" error={errors.prompt?.message}>
          <textarea
            id="prompt"
            rows={3}
            className={inputClass}
            placeholder="e.g. Write 3 Instagram captions announcing our summer sale"
            {...register("prompt")}
          />
        </FormField>
        <div>
          <Button type="submit" disabled={isSubmitting || campaigns.length === 0}>
            Generate
          </Button>
        </div>
      </form>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">Results</h2>
        <ul className="flex flex-col gap-3">
          {recent.map((request) => {
            const campaign = campaigns.find((c) => c.id === request.campaignId);
            const generated = generatedContents
              .filter((g) => g.contentRequestId === request.id)
              .sort((a, b) => b.version - a.version)[0];
            const isPending = pendingIds.has(request.id);

            return (
              <li key={request.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{request.prompt}</p>
                    <p className="mt-1 text-xs text-zinc-500">{campaign?.name ?? "Unknown campaign"}</p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
                {isPending && <p className="mt-3 text-sm text-zinc-500">Generating…</p>}
                {generated && (
                  <p className="mt-3 whitespace-pre-line rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700">
                    {generated.generatedResult}
                  </p>
                )}
              </li>
            );
          })}
          {recent.length === 0 && (
            <li className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500">
              No content generated yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
