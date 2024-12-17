"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import mime from "mime";
import AddFilesButton from "@/components/governance/steering-committee/buttons/add-files-button";
import { useOneSteeringCommittee } from "@/services/api-sdk/models/steering-committee";
import { fileTypes } from "@/services/api-sdk/types/steering-committee";
const getIcon = (filename) => {
  const fileType = mime.getType(filename);
  const extension = fileType ? mime.getExtension(fileType) : null;
  switch (extension) {
    case "pdf":
      return "pdf-icon.svg";
    case "doc":
    case "docx":
      return "doc-icon.svg";
    case "xls":
    case "xlsx":
      return "xls-icon.svg";
    case "ppt":
    case "pptx":
      return "ppt-icon.svg";
    case "txt":
      return "txt-icon.svg";
    default:
      return "file-unknown-icon.svg";
  }
};
export default function SteeringCommitteeFilesModal({
  meetingId,
  meetingTitle,
  ...props
}) {
  const { data, isLoading, isError } = useOneSteeringCommittee(meetingId);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Sheet>
      <SheetTrigger {...props} />
      <SheetContent
        side="right"
        className="flex flex-col gap-5"
      >
        <SheetHeader>
          <SheetTitle>Archives</SheetTitle>
          <SheetDescription className="line-clamp-1">
            {meetingTitle}
          </SheetDescription>
        </SheetHeader>
        <AddFilesButton meetingId={meetingId} />
        {data?.files && data.files.length > 0 ? (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-3 gap-5">
              {data.files.map(({ fileUrl, fileType, filename }) => (
                <a
                  key={fileUrl}
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    style={{
                      backgroundImage: `url('/global/images/${getIcon(fileUrl)}')`,
                    }}
                    className="block h-20 bg-contain bg-center bg-no-repeat"
                  />
                  <span className="line-clamp-2 text-center">
                    {fileType === "other"
                      ? filename
                      : (fileTypes.find((type) => type.value === fileType)
                          ?.label ?? filename)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 text-center font-medium italic sm:text-lg">
            Aucun fichier n&apos;a été ajouté à cette session.
          </div>
        )}
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="destructive">Fermer</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}