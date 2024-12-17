"use client";
import { useCurrentSteeringCommittee } from "@/services/api-sdk/models/steering-committee";
import CurrentSteeringCommitteeCard from "@/components/governance/steering-committee/ui/current-steering-committee-card";
import EmptySteeringCommitteeCard from "@/components/governance/steering-committee/ui/empty-steering-committee-card";
import { CurrentSteeringCommitteeViewSuspense } from "./suspense";
export function CurrentSteeringCommitteeView() {
  const { data, isError, isLoading } = useCurrentSteeringCommittee();
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return (
      <CurrentSteeringCommitteeViewSuspense className="self-center sm:min-w-96 sm:max-w-[50%]" />
    );
  }
  if (!data) {
    return <EmptySteeringCommitteeCard className="self-center" />;
  }
  return (
    <CurrentSteeringCommitteeCard
      key={data.id}
      meetingId={data.id}
      title={data.title}
      reference={data.reference}
      meetingType={data.meetingType}
      meetingDate={data.meetingDate}
      status={data.status}
      nextTask={data.nextTask}
      className="self-center sm:min-w-96 sm:max-w-[50%]"
    />
  );
}
