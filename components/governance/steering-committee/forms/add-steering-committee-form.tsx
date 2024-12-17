"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useSteeringCommitteeForm } from "@/lib/governance/steering-committee/hooks";
import { useCreateSteeringCommittee } from "@/services/api-sdk/models/steering-committee";
import SteeringCommitteeForm from "@/components/governance/steering-committee/forms/steering-committee-form";
export default function AddSteeringCommitteeForm({
  formId,
  onSuccess,
  onError,
}) {
  const form = useSteeringCommitteeForm();
  const { mutateAsync } = useCreateSteeringCommittee();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Session de CA planifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la planification.",
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
    <SteeringCommitteeForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
