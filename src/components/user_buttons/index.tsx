import { cn } from "@/lib/utils";

interface UserButtonsProps {
  className?: string;
}

const UserButtons = ({ className = "" }: UserButtonsProps) => {
  return (
    <div className={cn("flex gap-x-3", className)} data-testid="avatar">
      {/* TODO: Update */}
      Avatar
    </div>
  );
};

export default UserButtons;
