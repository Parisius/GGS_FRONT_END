import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModulesRoutes, MortgageRoutes } from "@/config/routes";
import { Component } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
export function MortgageDetailsPageBreadcrumb({ mortgageTitle }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ModulesRoutes.modules}>
              <Component />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BreadcrumbEllipsis aria-label="Toggle menu" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={ModulesRoutes.submodules("safety")}>Sûreté</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={MortgageRoutes.mortgagesList}>Hypothèques</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <div className="hidden sm:contents">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={ModulesRoutes.submodules("safety")}>Sûreté</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={MortgageRoutes.mortgagesList}>Hypothèques</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </div>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{mortgageTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
