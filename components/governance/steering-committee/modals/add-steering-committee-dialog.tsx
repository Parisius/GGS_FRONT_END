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
import React, { useCallback, useId, useRef } from "react";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next13-progressbar";
import { useSteeringCommitteeForm } from "@/lib/governance/steering-committee/hooks";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { SteeringCommitteeRoutes } from "@/config/routes";
import AddSteeringCommitteeForm from "@/components/governance/steering-committee/forms/add-steering-committee-form";
export default function AddSteeringCommitteeDialog(props) {
  const formId = useId();
  const form = useSteeringCommitteeForm();
  const closeRef = useRef(null);
  const router = useRouter();
  const handleSuccess = useCallback(
    ({ id }) => {
      closeRef.current?.click();
      router.push(SteeringCommitteeRoutes.session(id).index);
    },
    [router],
  );
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nouvelle session de CA</DialogTitle>
            <DialogDescription>
              Planifier une nouvelle session de conseil d&apos;administration
            </DialogDescription>
          </DialogHeader>
          <AddSteeringCommitteeForm
            formId={formId}
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Planifier"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
