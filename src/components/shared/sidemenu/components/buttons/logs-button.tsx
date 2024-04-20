import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import Link from "next/link";

const SidemenuLogsButton = () => {
  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
      asChild
    >
      <Link href="/logs">
        <Paperclip className="h-4 w-4" />
        <p>Logs</p>
      </Link>
    </Button>
  );
};

export default SidemenuLogsButton;
