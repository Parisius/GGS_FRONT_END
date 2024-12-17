"use client";
import { useArchivedSteeringCommittees } from "@/services/api-sdk/models/steering-committee";
import SteeringCommitteeCard from "@/components/governance/steering-committee/ui/steering-committee-card";
import { useSearchResults } from "@/providers/search-provider";
import { ArchivedSteeringCommitteeListSuspense } from "./suspense";
export function ArchivedSteeringCommitteeList() {
  const { data, isError } = useArchivedSteeringCommittees();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (!data) {
    return <ArchivedSteeringCommitteeListSuspense />;
  }
  if (data.length === 0) {
    return (
      <p className="text-center text-lg italic text-foreground/75">
        Aucune session de CA archivée n&apos;a été trouvée
      </p>
    );
  }
  if (filteredData.length === 0) {
    return (
      <p className="text-center text-lg italic text-foreground/75">
        Aucune session de CA archivée ne correspond à votre recherche
      </p>
    );
  }
  return (
    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
      {filteredData.map(({ id, title, reference, meetingDate, status }) => (
        <SteeringCommitteeCard
          key={id}
          meetingId={id}
          title={title}
          reference={reference}
          meetingDate={meetingDate}
          status={status}
        />
      ))}
    </div>
  );
}
