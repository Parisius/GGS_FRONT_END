import { Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import StakeholderNameSpan from "@/components/contract/ui/stakeholder-name-span";
export default function StakeholdersGroupView({
  label,
  stakeholdersGroup,
  className,
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-5 rounded-xl border-2 p-5",
        className,
      )}
    >
      {label && (
        <span className="absolute left-3 top-0 -translate-y-1/2 bg-background px-2 text-sm font-semibold">
          {label}
        </span>
      )}
      {stakeholdersGroup.map(({ stakeholderId, description }) => (
        <div
          key={stakeholderId}
          className="flex gap-5"
        >
          <div className="flex-1 space-y-2">
            <span>Membre</span>
            <div className="flex items-center gap-2">
              <User className="flex-shrink-0" />
              <StakeholderNameSpan stakeholderId={stakeholderId} />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <span>Description</span>
            <div className="flex items-center gap-2">
              <Tag className="flex-shrink-0" />
              <span>{description}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
