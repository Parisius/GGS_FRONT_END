import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import AddRecoveryDialog from "@/components/recovery/modals/add-recovery-dialog";
export default function CreateRecoveryCard({ className }) {
  return (
    <Card
      className={cn(
        "max-w-96 self-center sm:min-w-96 sm:max-w-[50%]",
        className,
      )}
    >
      <CardHeader>
        <CardTitle>Initier un recouvrement</CardTitle>
        <CardDescription>Initier un nouveau recouvrement</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/recovery/images/create-recovery.svg"
          alt="Initier un recouvrement"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddRecoveryDialog asChild>
          <Button className="gap-2">
            <FolderPlus />
            Nouveau recouvrement
          </Button>
        </AddRecoveryDialog>
      </CardFooter>
    </Card>
  );
}
