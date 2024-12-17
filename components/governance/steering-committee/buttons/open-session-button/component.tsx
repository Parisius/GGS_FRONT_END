"use client";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { Button } from "@/components/ui/button";
import { useCurrentSteeringCommittee } from "@/services/api-sdk/models/steering-committee";
import { SteeringCommitteeRoutes } from "@/config/routes";
import Link from "next/link";
import { FolderOpen, FolderPlus } from "lucide-react";
import AddSteeringCommitteeDialog from "@/components/governance/steering-committee/modals/add-steering-committee-dialog";
export function OpenSessionButton() {
  const { data, isLoading, isError } = useCurrentSteeringCommittee();
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return (
      <Button disabled>
        <EllipsisLoader />
      </Button>
    );
  }
  if (data) {
    return (
      <Button
        asChild
        className="gap-2"
      >
        <Link href={SteeringCommitteeRoutes.session(data.id).index}>
          <FolderOpen />
          Ouvrir la session en cours
        </Link>
      </Button>
    );
  }
  return (
    <AddSteeringCommitteeDialog asChild>
      <Button className="gap-2">
        <FolderPlus />
        Nouveau CA
      </Button>
    </AddSteeringCommitteeDialog>
  );
}
