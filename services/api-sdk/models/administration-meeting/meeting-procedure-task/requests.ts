"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all meeting tasks of type procedure from the server.
 * @param meetingId - The id of the administration meeting.
 * @returns A promise that resolves to an array of meeting tasks.
 * @throws {ApiError} if the request fails.
 */
export const getAllMeetingProcedureTasks = async (meetingId) => {
  const response = await fetchService.get(
    `/task_session_administrators?session_administrator_id=${meetingId}&type=procedure`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.libelle,
            completed: item.status,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((task) => task !== null);
  }
  throw new ApiError("Failed to fetch all meeting tasks");
};
/**
 * Fetches one meeting task of type procedure from the server.
 * @param taskId - The id of the meeting task.
 * @returns A promise that resolves to the meeting task.
 * @throws {ApiError} if the request fails.
 */
export const getOneMeetingProcedureTask = async (taskId) => {
  const response = await fetchService.get(
    `/task_session_administrators/${taskId}`,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.libelle,
      completed: item.status,
    };
  }
  throw new ApiError("Failed to fetch this meeting task");
};
/**
 * Creates a meeting task of type procedure.
 * @param meetingId - The id of the administration meeting.
 * @param args - The form data to create the meeting task.
 * @returns The created meeting task.
 * @throws {ApiError} if the request fails.
 */
export const createMeetingProcedureTask = async (meetingId, args) => {
  const response = await fetchService.post(
    "/task_session_administrators",
    JSON.stringify({
      session_administrator_id: meetingId,
      libelle: args.title,
      type: "procedure",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the meeting task");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    completed: item.status,
  };
};
/**
 * Updates a meeting task of type procedure.
 * @param taskId - The id of the meeting task.
 * @param args - The form data to update the meeting task.
 * @returns The updated meeting task.
 * @throws {ApiError} if the request fails.
 */
export const updateMeetingProcedureTask = async (taskId, args) => {
  const response = await fetchService.put(
    `/task_session_administrators/${taskId}`,
    JSON.stringify({
      libelle: args.title,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the meeting task");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    completed: item.status,
  };
};
export const updateMeetingProcedureTaskStatus = async (taskId, args) => {
  const response = await fetchService.put(
    `/task_session_administrators/${taskId}`,
    JSON.stringify({
      status: args.completed,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to toggle the meeting task status");
  }
};
/**
 * Toggles the status of multiple meeting tasks of type procedure.
 * @param tasks - The list of meeting tasks to toggle.
 * @throws {ApiError} if the request fails.
 */
export const toggleMeetingProcedureTasksStatus = async (tasks) => {
  const response = await fetchService.put(
    "/update_status_task_session_administrators",
    JSON.stringify({
      tasks: tasks.map(({ id, completed }) => ({
        id,
        status: completed,
      })),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to toggle the meeting task status");
  }
};
/**
 * Deletes a meeting task of type procedure.
 * @param taskId
 * @throws {ApiError} if the request fails.
 */
export const deleteMeetingProcedureTask = async (taskId) => {
  const response = await fetchService.delete(
    `/task_session_administrators/${taskId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to delete the meeting task");
  }
};
