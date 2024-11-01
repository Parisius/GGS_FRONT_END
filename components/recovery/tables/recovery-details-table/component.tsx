import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ContractRoutes, MortgageRoutes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Printer } from "lucide-react";
import PrintRecoveryButton from "@/components/recovery/buttons/print-recovery-button";
export function RecoveryDetailsTable({
  recoveryId,
  title,
  reference,
  type,
  guaranteeId,
  contractId,
  currentStep,
  nextStep,
  isArchived,
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Référence</TableHead>
          {guaranteeId && <TableHead>Garantie</TableHead>}
          {contractId && <TableHead>Contrat</TableHead>}
          <TableHead>Etape actuelle</TableHead>
          <TableHead className={cn(nextStep && "text-destructive")}>
            Prochaine étape
          </TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-card">
          <TableCell>{title}</TableCell>
          <TableCell>{reference}</TableCell>
          {guaranteeId && (
            <TableCell>
              <Button
                asChild
                variant="link"
                className="gap-1 px-0 italic"
              >
                <Link href={MortgageRoutes.mortgagePage(guaranteeId).index}>
                  Voir la garantie
                </Link>
              </Button>
            </TableCell>
          )}
          {contractId && (
            <TableCell>
              <Button
                asChild
                variant="link"
                className="gap-1 px-0 italic"
              >
                <Link href={ContractRoutes.contractPage(contractId).index}>
                  Voir le contrat
                </Link>
              </Button>
            </TableCell>
          )}
          <TableCell>{currentStep?.title ?? "-"}</TableCell>
          <TableCell className={cn(nextStep && "text-destructive")}>
            {nextStep?.title ?? "-"}
          </TableCell>
          <TableCell>
            <Badge className="text-nowrap bg-muted text-muted-foreground">
              {type.includes("friendly") ? "Amiable" : "Forcée"}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge className="text-nowrap bg-muted text-muted-foreground">
              {isArchived ? "Archivé" : "En cours"}
            </Badge>
          </TableCell>
          <TableCell>
            <Tooltip>
              <TooltipTrigger asChild>
                <PrintRecoveryButton
                  recoveryId={recoveryId}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintRecoveryButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
