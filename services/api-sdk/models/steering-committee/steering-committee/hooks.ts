import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { changeTmzFromLocalToUTC } from "@/lib/utils";
// eslint-disable-next-line import/no-cycle
import {
  printSteeringCommittee,
  printSteeringCommitteeChecklist,
  printSteeringCommitteeProcedures,
  useInvalidateAllMeetingTasks,
} from "@/services/api-sdk/models/steering-committee";
import {
  addSteeringCommitteeFile,
  createSteeringCommittee,
  getArchivedSteeringCommittees,
  getCurrentSteeringCommittee,
  getOneSteeringCommittee,
  updateSteeringCommittee,
} from "./requests";
/**
 * Tag for the query to fetch all administration meetings
 */
export const ARCHIVED_ADMINISTRATION_MEETINGS_QUERY_KEY = [
  "ADMINISTRATION_MEETINGS/ARCHIVED_ADMINISTRATION_MEETINGS",
];
/**
 * Tag for the query to fetch the current administration meeting
 */
export const CURRENT_ADMINISTRATION_MEETING_QUERY_KEY = [
  "ADMINISTRATION_MEETINGS/CURRENT_ADMINISTRATION_MEETING",
];
/**
 * Tag generator for the query to fetch one administration meeting
 */
export const getOneSteeringCommitteeQueryKey = (id) => [
  "ADMINISTRATION_MEETINGS/ONE_ADMINISTRATION_MEETING",
  id,
];
/**
 * Tag for the mutation to create a administration meeting.
 */
export const CREATE_ADMINISTRATION_MEETING_MUTATION_KEY = [
  "ADMINISTRATION_MEETINGS/CREATE_ADMINISTRATION_MEETING",
];
/**
 * Tag generator for the mutation to update a administration meeting.
 * @param id - The id of the administration meeting to update.
 * @returns The mutation key.
 */
export const getUpdateSteeringCommitteeMutationKey = (id) => [
  "ADMINISTRATION_MEETINGS/UPDATE_ADMINISTRATION_MEETING",
  id,
];
/**
 * Tag generator for the mutation to print a meeting.
 * @param meetingId - The id of the meeting.
 * @returns The mutation tag.
 */
export const getPrintSteeringCommitteeMutationKey = (meetingId) => [
  "ADMINISTRATION_MEETING",
  "PRINT_ADMINISTRATION_MEETING",
  meetingId,
];
/**
 * Tag generator for the mutation to print a meeting checklist.
 * @param meetingId - The id of the meeting.
 * @returns The mutation tag.
 */
export const getPrintSteeringCommitteeChecklistMutationKey = (
  meetingId,
) => [
  "ADMINISTRATION_MEETING",
  "PRINT_ADMINISTRATION_MEETING_CHECKLIST",
  meetingId,
];
/**
 * Tag generator for the mutation to print a meeting procedures.
 * @param meetingId - The id of the meeting.
 * @returns The mutation tag.
 */
export const getPrintSteeringCommitteeProceduresMutationKey = (
  meetingId,
) => [
  "ADMINISTRATION_MEETING",
  "PRINT_ADMINISTRATION_MEETING_PROCEDURES",
  meetingId,
];
/**
 * Hook to invalidate the current administration meeting query.
 * @returns A function to invalidate the current administration meeting query.
 */
export const useCurrentSteeringCommitteeInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: CURRENT_ADMINISTRATION_MEETING_QUERY_KEY,
    });
};
/**
 * Hook to invalidate the one administration meeting query.
 * @returns A function to invalidate the one administration meeting query.
 */
export const useOneSteeringCommitteeInvalidate = () => {
  const queryClient = useQueryClient();
  return (meetingId) =>
    queryClient.invalidateQueries({
      queryKey: getOneSteeringCommitteeQueryKey(meetingId),
    });
};
/**
 * Hook to fetch archived administration meetings.
 * @returns The query result.
 */
export const useArchivedSteeringCommittees = () =>
  useQuery({
    queryKey: ARCHIVED_ADMINISTRATION_MEETINGS_QUERY_KEY,
    queryFn: () => getArchivedSteeringCommittees(),
  });
/**
 * Hook to fetch the current administration meeting.
 * @returns The query result.
 */
export const useCurrentSteeringCommittee = () =>
  useQuery({
    queryKey: CURRENT_ADMINISTRATION_MEETING_QUERY_KEY,
    queryFn: () => getCurrentSteeringCommittee(),
  });
/**
 * Hook to fetch a administration meeting by its id.
 * @param id
 * @returns The query result.
 */
export const useOneSteeringCommittee = (id) =>
  useQuery({
    queryKey: getOneSteeringCommitteeQueryKey(id),
    queryFn: () => getOneSteeringCommittee(id),
  });
/**
 * Hook to create a administration meeting.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateSteeringCommittee = (options) => {
  const invalidateCurrentSteeringCommittee =
    useCurrentSteeringCommitteeInvalidate();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateCurrentSteeringCommittee();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateCurrentSteeringCommittee],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      createSteeringCommittee({
        ...args,
        meetingDate: changeTmzFromLocalToUTC(args.meetingDate),
      }),
    mutationKey: CREATE_ADMINISTRATION_MEETING_MUTATION_KEY,
    ...getMutationOptions(options),
  });
  const mutate = (mutateArgs, mutateOptions) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));
  const mutateAsync = (mutateArgs, mutateOptions) =>
    mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));
  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
/**
 * Hook to update a administration meeting.
 * @param meetingId - The id of the administration meeting to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateSteeringCommittee = (meetingId, options) => {
  const invalidateOneSteeringCommittee =
    useOneSteeringCommitteeInvalidate();
  const invalidateAllMeetingTasks = useInvalidateAllMeetingTasks(meetingId);
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneSteeringCommittee(meetingId);
        await invalidateAllMeetingTasks();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllMeetingTasks, invalidateOneSteeringCommittee, meetingId],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      updateSteeringCommittee(meetingId, {
        ...args,
        meetingDate:
          args.meetingDate && changeTmzFromLocalToUTC(args.meetingDate),
      }),
    mutationKey: getUpdateSteeringCommitteeMutationKey(meetingId),
    ...getMutationOptions(options),
  });
  const mutate = (mutateArgs, mutateOptions) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));
  const mutateAsync = (mutateArgs, mutateOptions) =>
    mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));
  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
/**
 * Hook to add a file to a administration meeting.
 * @param meetingId - The id of the administration meeting.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useAddSteeringCommitteeFile = (meetingId, options) => {
  const invalidateOneSteeringCommittee =
    useOneSteeringCommitteeInvalidate();
  const invalidateAllMeetingTasks = useInvalidateAllMeetingTasks(meetingId);
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneSteeringCommittee(meetingId);
        await invalidateAllMeetingTasks();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllMeetingTasks, invalidateOneSteeringCommittee, meetingId],
  );
  const mutation = useMutation({
    mutationFn: (args) => {
      const formData = new FormData();
      formData.set("file", args.file);
      return addSteeringCommitteeFile(meetingId, {
        fileType: args.fileType,
        formData,
      });
    },
    mutationKey: getUpdateSteeringCommitteeMutationKey(meetingId),
    ...getMutationOptions(options),
  });
  const mutate = (mutateArgs, mutateOptions) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));
  const mutateAsync = (mutateArgs, mutateOptions) =>
    mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));
  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
/**
 * Hook to print a meeting.
 * @param meetingId - The id of the meeting to print.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const usePrintSteeringCommittee = (meetingId, options) => {
  const mutation = useMutation({
    mutationFn: () => printSteeringCommittee(meetingId),
    mutationKey: getPrintSteeringCommitteeMutationKey(meetingId),
    ...options,
  });
  const mutate = (mutateOptions) => mutation.mutate(undefined, mutateOptions);
  const mutateAsync = (mutateOptions) =>
    mutation.mutateAsync(undefined, mutateOptions);
  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
/**
 * Hook to print a meeting checklist.
 * @param meetingId - The id of the meeting.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const usePrintSteeringCommitteeChecklist = (meetingId, options) => {
  const mutation = useMutation({
    mutationFn: () => printSteeringCommitteeChecklist(meetingId),
    mutationKey: getPrintSteeringCommitteeChecklistMutationKey(meetingId),
    ...options,
  });
  const mutate = (mutateOptions) => mutation.mutate(undefined, mutateOptions);
  const mutateAsync = (mutateOptions) =>
    mutation.mutateAsync(undefined, mutateOptions);
  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
/**
 * Hook to print a meeting procedures.
 * @param meetingId - The id of the meeting.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const usePrintSteeringCommitteeProcedures = (meetingId, options) => {
  const mutation = useMutation({
    mutationFn: () => printSteeringCommitteeProcedures(meetingId),
    mutationKey: getPrintSteeringCommitteeProceduresMutationKey(meetingId),
    ...options,
  });
  const mutate = (mutateOptions) => mutation.mutate(undefined, mutateOptions);
  const mutateAsync = (mutateOptions) =>
    mutation.mutateAsync(undefined, mutateOptions);
  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
