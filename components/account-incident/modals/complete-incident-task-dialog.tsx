"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useCallback, useId, useRef } from "react";
import { FormProvider } from "react-hook-form";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import CompleteIncidentTaskForm from "@/components/account-incident/forms/complete-incident-task-form";
import { useCompleteIncidentTaskForm } from "@/lib/account-incident/hooks";
export default function CompleteIncidentTaskDialog({
  taskId,
  taskForm,
  ...props
}) {
  const formId = useId();
  const { form } = useCompleteIncidentTaskForm(taskForm.fields);
  const closeRef = useRef(null);
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{taskForm.title}</DialogTitle>
          </DialogHeader>
          <CompleteIncidentTaskForm
            formId={formId}
            taskId={taskId}
            taskForm={taskForm}
            className="-mx-6 -my-3 max-h-[70vh] overflow-y-auto px-6 py-3"
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Completer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
