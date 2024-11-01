import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AccountIncidentRoutes } from "@/config/routes";
import { HomePageBreadcrumb } from "@/components/account-incident/breadcrumbs";
import CreateAccountIncidentCard from "@/components/account-incident/ui/create-account-incident-card";
export default function AccountIncidentPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <HomePageBreadcrumb />
        <Button
          asChild
          className="gap-2"
        >
          <Link href={AccountIncidentRoutes.accountIncidentsList}>
            <FolderSearch />
            Consulter les incidents
          </Link>
        </Button>
      </div>
      <CreateAccountIncidentCard />
    </div>
  );
}
