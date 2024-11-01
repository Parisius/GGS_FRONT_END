"use client";
import {
  BookOpenCheck,
  EllipsisVertical,
  Files,
  GanttChart,
  LayoutList,
  ListChecks,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChecklistModal from "@/components/governance/management-committee/modals/checklist-modal";
import ManagementCommitteeFilesModal from "@/components/governance/management-committee/modals/management-committee-files-modal";
import ManagementCommitteeTimelineModal from "@/components/governance/management-committee/modals/management-committee-timeline-modal";
import { ManagementCommitteeDetailsPageBreadcrumb } from "@/components/governance/management-committee/breadcrumbs";
import { useOneManagementCommittee } from "@/services/api-sdk/models/management-committee";
import { notFound } from "next/navigation";
import { ManagementCommitteeDetailsTable } from "@/components/governance/management-committee/tables/management-committee-details-table";
import ProcedureModal from "@/components/governance/management-committee/modals/procedure-modal";
import AttendantsDialog from "@/components/governance/management-committee/modals/attendants-dialog";
import ManagementCommitteeDetailsPageLoading from "./loading";
export default function Page({ params: { id } }) {
  const { data, isLoading, isError } = useOneManagementCommittee(id);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <ManagementCommitteeDetailsPageLoading />;
  }
  if (!data) {
    notFound();
  }
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <ManagementCommitteeDetailsPageBreadcrumb meetingTitle={data.title} />
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        {data.title}
      </h1>
      <div className="flex flex-row items-center justify-between gap-2">
        <ManagementCommitteeTimelineModal
          asChild
          meetingId={data.id}
          meetingDate={data.meetingDate}
          meetingTitle={data.title}
        >
          <Button
            aria-label="Planification du CA"
            className="gap-2"
          >
            <GanttChart />
            Planifier
          </Button>
        </ManagementCommitteeTimelineModal>

        <DropdownMenu>
          <Tooltip>
            <DropdownMenuTrigger
              asChild
              className="cursor-pointer sm:hidden"
            >
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menu"
                  className="gap-2 rounded-full"
                >
                  <EllipsisVertical size={30} />
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <TooltipContent>Menu</TooltipContent>
          </Tooltip>
          <DropdownMenuContent>
            <AttendantsDialog
              asChild
              meetingId={id}
            >
              <DropdownMenuItem
                className="cursor-pointer gap-2 sm:hidden"
                onSelect={(e) => e.preventDefault()}
              >
                <Users />
                Créer la liste de présence
              </DropdownMenuItem>
            </AttendantsDialog>
            <ChecklistModal
              asChild
              meetingId={id}
            >
              <DropdownMenuItem
                className="cursor-pointer gap-2 sm:hidden"
                onSelect={(e) => e.preventDefault()}
              >
                <ListChecks />
                Checklist
              </DropdownMenuItem>
            </ChecklistModal>
            <ProcedureModal
              asChild
              meetingId={id}
            >
              <DropdownMenuItem
                className="cursor-pointer gap-2 sm:hidden"
                onSelect={(e) => e.preventDefault()}
              >
                <LayoutList />
                Procédures
              </DropdownMenuItem>
            </ProcedureModal>
            <ManagementCommitteeFilesModal
              asChild
              meetingId={id}
              meetingTitle={data.title}
            >
              <DropdownMenuItem
                className="cursor-pointer gap-2 sm:hidden"
                onSelect={(e) => e.preventDefault()}
              >
                <Files />
                Archives
              </DropdownMenuItem>
            </ManagementCommitteeFilesModal>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden items-center justify-between gap-2 sm:flex">
          <AttendantsDialog
            asChild
            meetingId={id}
          >
            <Button
              variant="secondary"
              className="gap-2"
            >
              <Users />
              Créer la liste de présence
            </Button>
          </AttendantsDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <BookOpenCheck />
                Tenir CODIR
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <ChecklistModal
                asChild
                meetingId={id}
              >
                <DropdownMenuItem
                  className="cursor-pointer gap-2"
                  onSelect={(e) => e.preventDefault()}
                >
                  <ListChecks />
                  Checklist
                </DropdownMenuItem>
              </ChecklistModal>

              <ProcedureModal
                asChild
                meetingId={id}
              >
                <DropdownMenuItem
                  className="cursor-pointer gap-2"
                  onSelect={(e) => e.preventDefault()}
                >
                  <LayoutList />
                  Procédures
                </DropdownMenuItem>
              </ProcedureModal>
            </DropdownMenuContent>
          </DropdownMenu>
          <Tooltip>
            <ManagementCommitteeFilesModal
              asChild
              meetingId={id}
              meetingTitle={data.title}
            >
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Archives"
                  className="gap-2 rounded-full"
                >
                  <Files size={30} />
                </Button>
              </TooltipTrigger>
            </ManagementCommitteeFilesModal>
            <TooltipContent>Archives</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <ManagementCommitteeDetailsTable
        id={id}
        title={data.title}
        reference={data.reference}
        status={data.status}
        meetingDate={data.meetingDate}
        nextTask={data.nextTask}
      />
    </div>
  );
}
