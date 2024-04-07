import { Button } from "@/components/ui/button";
import { BotMessageSquare } from "lucide-react";
import Link from "next/link";

const SidemenuAIResponsesButton = () => {
  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
      asChild
    >
      <Link href="/ai-orientations">
        <BotMessageSquare className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>AI Orientations</p>
      </Link>
    </Button>
  );
};

export default SidemenuAIResponsesButton;
