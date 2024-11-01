"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAllUsers,
  useCurrentUser,
} from "@/services/api-sdk/models/user/user";
import { useMemo } from "react";
export function UserSelectComponent({ className, ...props }) {
  const { data: currentUser } = useCurrentUser();
  const { data, isLoading, isError } = useAllUsers();
  if (isError) {
    throw new Error("Failed to load users");
  }
  const users = useMemo(() => {
    if (!currentUser || !data) return [];
    return data?.filter((user) => user.id !== currentUser?.id);
  }, [currentUser, data]);
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner un destinataire" />
      </SelectTrigger>
      <SelectContent>
        {isLoading && (
          <SelectItem
            disabled
            value="__loading__"
          >
            Chargement...
          </SelectItem>
        )}
        {!data ||
          (data.length === 0 && (
            <SelectItem
              disabled
              value="__empty__"
            >
              Aucun destinataire trouvé
            </SelectItem>
          ))}
        {users?.map((collaborator) => (
          <SelectItem
            key={collaborator.id}
            value={collaborator.id}
          >
            {collaborator.lastname} {collaborator.firstname}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
