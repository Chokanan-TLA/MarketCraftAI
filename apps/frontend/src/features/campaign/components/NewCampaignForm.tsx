"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/shared/Button";
import { FormField, inputClass } from "@/components/shared/FormField";
import { useMockData } from "@/lib/mock/store";
import { campaignSchema, type CampaignFormValues } from "../schema";

export function NewCampaignForm() {
  const { addCampaign } = useMockData();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: { name: "", description: "", status: "Draft" },
  });

  if (!open) {
    return <Button onClick={() => setOpen(true)}>New Campaign</Button>;
  }

  const onSubmit = handleSubmit((values) => {
    addCampaign({ name: values.name, description: values.description || undefined, status: values.status });
    reset();
    setOpen(false);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <FormField label="Name" htmlFor="name" error={errors.name?.message}>
        <input id="name" className={inputClass} placeholder="Campaign name" {...register("name")} />
      </FormField>
      <FormField label="Description" htmlFor="description" error={errors.description?.message}>
        <textarea id="description" rows={2} className={inputClass} placeholder="Optional" {...register("description")} />
      </FormField>
      <FormField label="Status" htmlFor="status" error={errors.status?.message}>
        <select id="status" className={inputClass} {...register("status")}>
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
          <option value="Archived">Archived</option>
        </select>
      </FormField>
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          Create Campaign
        </Button>
        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
