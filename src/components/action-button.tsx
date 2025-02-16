import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  action: "pending" | "completed" | "rejected" | "accepted";
  onClick?: () => void;
  className?: string;
  onCompleteIsPendingCheck: boolean;
  onCancelIsPendingCheck: boolean;
}

export default function ActionButton({
  action,
  onClick,
  className,
  onCompleteIsPendingCheck,
  onCancelIsPendingCheck,
}: ActionButtonProps) {
  const getActionLabel = () => {
    if (action === "accepted") {
      return onCompleteIsPendingCheck ? "Completing..." : "Complete";
    }
    if (action === "pending") {
      return onCancelIsPendingCheck ? "Cancelling..." : "Cancel";
    }
    if (action === "completed") {
      return "Done";
    }
    return "Rejected";
  };

  return (
    <Button
      size="sm"
      disabled={action === "rejected" || action === "completed"}
      onClick={onClick}
      className={cn(
        "px-4 py-1 h-7 rounded-md font-medium",
        action === "completed"
          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
          : action === "rejected"
          ? "bg-transparent text-gray-800"
          : "bg-[#0095FF] text-white hover:bg-blue-600",
        className
      )}
    >
      {getActionLabel()}
    </Button>
  );
}
