"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useId, useRef } from "react";
import { FormProvider } from "react-hook-form";
import { useSteeringCommitteeForm } from "@/lib/governance/steering-committee/hooks";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { useOneSteeringCommittee } from "@/services/api-sdk/models/steering-committee";
import UpdateSteeringCommitteeForm from "@/components/governance/steering-committee/forms/update-steering-committee-form";
import { UpdateSteeringCommitteeDialogSuspense } from "./suspense";
export function UpdateSteeringCommitteeDialog({ meetingId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneSteeringCommittee(meetingId);
  const form = useSteeringCommitteeForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch administration meeting");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
        meetingType: data.meetingType,
        meetingDate: data.meetingDate,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier CA</DialogTitle>
            <DialogDescription>
              Modifier les informations de la session de conseil
              d&apos;administration.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateSteeringCommitteeDialogSuspense />
          ) : (
            <>
              <UpdateSteeringCommitteeForm
                formId={formId}
                meetingId={meetingId}
                onSuccess={handleSuccess}
              />
              <DialogFooter className="gap-2">
                <DialogClose ref={closeRef} />
                <DialogClose asChild>
                  <Button
                    variant="muted"
                    onClick={() => form.reset()}
                  >
                    Annuler
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  form={formId}
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <EllipsisLoader />
                  ) : (
                    "Modifier"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
