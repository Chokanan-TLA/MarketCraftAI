"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/shared/Button";
import { FormField, inputClass } from "@/components/shared/FormField";
import { useMockData } from "@/lib/mock/store";
import { settingsSchema, type SettingsFormValues } from "../schema";

export function SettingsView() {
  const { currentUser, updateCurrentUser } = useMockData();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { fullName: currentUser.fullName, email: currentUser.email },
  });

  const onSubmit = handleSubmit((values) => {
    updateCurrentUser(values);
    setSaved(true);
  });

  return (
    <div className="flex max-w-xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">Profile changes are kept in memory for this session only.</p>
      </div>

      <form
        onSubmit={onSubmit}
        onChange={() => setSaved(false)}
        className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
      >
        <FormField label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
          <input id="fullName" className={inputClass} {...register("fullName")} />
        </FormField>
        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <input id="email" type="email" className={inputClass} {...register("email")} />
        </FormField>
        <FormField label="Role" htmlFor="role">
          <input id="role" value={currentUser.role} disabled className={`${inputClass} bg-zinc-50 text-zinc-500`} />
        </FormField>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isSubmitting}>
            Save changes
          </Button>
          {saved && <span className="text-sm text-emerald-600">Saved</span>}
        </div>
      </form>
    </div>
  );
}
