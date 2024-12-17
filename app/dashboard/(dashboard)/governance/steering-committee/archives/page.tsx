import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArchivesPageBreadcrumb } from "@/components/governance/steering-committee/breadcrumbs";
import {
  OpenSessionButton,
  OpenSessionButtonErrorBoundary,
} from "@/components/governance/steering-committee/buttons/open-session-button";
import {
  ArchivedSteeringCommitteeList,
  ArchivedSteeringCommitteeListErrorBoundary,
} from "@/components/governance/steering-committee/ui/archived-steering-committee-list";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function ArchivedSteeringCommitteePage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <ArchivesPageBreadcrumb />
          <OpenSessionButtonErrorBoundary>
            <OpenSessionButton />
          </OpenSessionButtonErrorBoundary>
        </div>
        <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Choisir une session de CA
        </h1>
        <div className="flex items-end justify-between gap-10 sm:items-center sm:justify-end">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <span
              id="session-year-label"
              className="text-nowrap text-foreground/75"
            >
              Année de session
            </span>
            <Select defaultValue="2024">
              <SelectTrigger
                aria-labelledby="session-year-label"
                className="min-w-24 bg-card"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <ArchivedSteeringCommitteeListErrorBoundary>
          <ArchivedSteeringCommitteeList />
        </ArchivedSteeringCommitteeListErrorBoundary>
      </div>
    </SearchProvider>
  );
}
