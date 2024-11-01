"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAccountIncidentForm } from "@/lib/account-incident/hooks";
import { useCreateAccountIncident } from "@/services/api-sdk/models/account-incident/account-incident";
import AccountIncidentForm from "@/components/account-incident/forms/account-incident-form";
export default function AddAccountIncidentForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useAccountIncidentForm();
  const { mutateAsync } = useCreateAccountIncident();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Incident imputé avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de l'imputation de l'incident",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form]);
  return (
    <AccountIncidentForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
