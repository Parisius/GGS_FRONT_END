"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { saveAs } from "file-saver";
import { usePrintAdministrationMeetingProcedures } from "@/services/api-sdk/models/administration-meeting";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
export default function PrintProceduresButton({
  meetingId,
  className,
  children,
  ...props
}) {
  const form = useForm();
  const { mutateAsync } = usePrintAdministrationMeetingProcedures(meetingId);
  const handlePrint = useCallback(async () => {
    await mutateAsync({
      onSuccess: ({ buffer, filename }) => {
        saveAs(new Blob([new Uint8Array(buffer)]), filename);
      },
      onError: () => {
        toast({
          description:
            "Une erreur s'est produite lors de l'impression des procédures.",
          className: "bg-destructive text-destructive-foreground",
        });
      },
    });
  }, [mutateAsync]);
  return (
    <form
      className="contents"
      onSubmit={form.handleSubmit(handlePrint)}
    >
      <Button
        {...props}
        type="submit"
        disabled={form.formState.isSubmitting}
        className={className}
      >
        {form.formState.isSubmitting ? <EllipsisLoader /> : children}
      </Button>
    </form>
  );
}
