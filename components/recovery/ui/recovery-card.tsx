import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ContractRoutes,
  MortgageRoutes,
  RecoveryRoutes,
} from "@/config/routes";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
export default function RecoveryCard({
  recoveryId,
  title,
  reference,
  type,
  guaranteeId,
  contractId,
}) {
  return (
    <Card className="w-72 sm:w-96">
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription>
          <span className="font-bold">Référence:</span>{" "}
          <span className="italic">{reference}</span>
        </CardDescription>
        {guaranteeId && (
          <CardDescription>
            <Button
              asChild
              variant="link"
              className="gap-1 px-0 italic"
            >
              <Link href={MortgageRoutes.mortgagePage(guaranteeId).index}>
                Voir la garantie
              </Link>
            </Button>
          </CardDescription>
        )}

        {contractId && (
          <CardDescription>
            <Button
              asChild
              variant="link"
              className="gap-1 px-0 italic"
            >
              <Link href={ContractRoutes.contractPage(contractId).index}>
                Voir le contrat
              </Link>
            </Button>
          </CardDescription>
        )}
        <div className="flex items-center justify-between gap-2">
          <Badge className="line-clamp-1 w-fit bg-muted text-muted-foreground hover:bg-muted/90">
            {type.includes("friendly") ? "Amiable" : "Forcée"}
          </Badge>
          <Button
            asChild
            variant="link"
            className="gap-2 px-0 italic"
          >
            <Link href={RecoveryRoutes.recoveryPage(recoveryId).index}>
              Voir details <MoveRight />
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
