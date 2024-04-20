import { Button } from "@/components/ui/button";
import { PackageOpen } from "lucide-react";
import Link from "next/link";

const SidemenuAttachmentsButton = () => {
  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
      asChild
    >
      <Link href="/attachments">
        <PackageOpen className="h-4 w-4" />
        <p>Attachments</p>
      </Link>
    </Button>
  );
};

export default SidemenuAttachmentsButton;
