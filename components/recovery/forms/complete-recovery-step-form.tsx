"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  DateField,
  NumberField,
  RadioField,
  SelectField,
  TextField,
} from "@/components/recovery/inputs/complete-recovery-step-fields";
import { useCompleteRecoveryStepForm } from "@/lib/recovery/hooks";
import { useCompleteRecoveryStep } from "@/services/api-sdk/models/recovery";
import DocumentsSectionForm from "@/components/recovery/forms/documents-section-form";
export default function CompleteRecoveryStepForm({
  formId,
  stepId,
  stepForm,
  className,
  onError,
  onSuccess,
}) {
  const { form, filesArray } = useCompleteRecoveryStepForm(stepForm.fields);
  const { mutateAsync } = useCompleteRecoveryStep(stepId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Etape complétée avec succès.",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la complétion.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("space-y-5", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {stepForm.fields.map((item) => (
          <FormField
            key={item.name}
            control={form.control}
            name={item.name}
            render={({ field }) => {
              if (item.type === "text") {
                return (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <TextField
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }
              if (item.type === "radio") {
                return (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="text-md">{item.label}</FormLabel>
                    <FormControl>
                      <RadioField
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }
              if (item.type === "number") {
                return (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <NumberField
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }
              if (item.type === "date") {
                return (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <DateField
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }
              if (item.type === "select") {
                return (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <SelectField
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }
              return (
                <DocumentsSectionForm
                  label="Documents"
                  fieldName={item.name}
                  form={form}
                  fieldArray={filesArray}
                  className="col-span-2 rounded-xl border-2 p-5"
                />
              );
            }}
          />
        ))}
      </form>
    </Form>
  );
}
