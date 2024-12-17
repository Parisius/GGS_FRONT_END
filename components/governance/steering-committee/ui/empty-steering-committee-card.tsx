import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import AddSteeringCommitteeDialog from "@/components/governance/steering-committee/modals/add-steering-committee-dialog";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";
export default function EmptySteeringCommitteeCard({ className }) {
  return (
    <Card className={cn("max-w-96", className)}>
      <CardHeader>
        <CardTitle>Planifier une session de Conseil d'Administration</CardTitle>
        <CardDescription>
          Vous n&apos;avez aucune session de CA en cours de préparation
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/governance/steering-committee/images/plan-session.svg"
          alt="Plan a session"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddSteeringCommitteeDialog asChild>
          <Button className="gap-2">
            <FolderPlus />
            Nouveau CA
          </Button>
        </AddSteeringCommitteeDialog>
      </CardFooter>
    </Card>
  );
}
