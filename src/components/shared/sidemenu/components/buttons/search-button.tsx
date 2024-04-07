import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SidemenuSearchButton = () => {
  return (
    <Button variant="sidemenu" size="sm" className="justify-start gap-x-3 px-6">
      <Search className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
      <p>Search</p>
    </Button>
  );
};

export default SidemenuSearchButton;
