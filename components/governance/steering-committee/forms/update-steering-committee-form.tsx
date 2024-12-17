"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateSteeringCommittee } from "@/services/api-sdk/models/steering-committee";
import SteeringCommitteeForm from "@/components/governance/steering-committee/forms/steering-committee-form";
export default function UpdateSteeringCommitteeForm({
  formId,
  meetingId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateSteeringCommittee(meetingId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Session d'AG modifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la modification.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <SteeringCommitteeForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
