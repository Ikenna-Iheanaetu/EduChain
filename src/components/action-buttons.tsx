import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  status: "pending" | "accepted" | "completed";
  onAccept?: () => void;
  onReject?: () => void;
  onComplete?: () => void;
  onAcceptIsPendingCheck: boolean;
  onRejectIsPendingCheck: boolean;
  onCompleteIsPendingCheck: boolean;
}

export default function ActionButtons({
  status,
  onAccept,
  onReject,
  onComplete,
  onAcceptIsPendingCheck,
  onRejectIsPendingCheck,
  onCompleteIsPendingCheck,
}: ActionButtonsProps) {
  if (status === "pending") {
    return (
      <div className="flex gap-2">
        <Button
          disabled={onAcceptIsPendingCheck}
          onClick={onAccept}
          size="sm"
          className="bg-[#0095FF] hover:bg-blue-600 text-white h-7 px-4"
        >
          {onAcceptIsPendingCheck ? "Accepting..." : "Accept"}
        </Button>
        <Button
          disabled={onRejectIsPendingCheck}
          onClick={onReject}
          size="sm"
          className="bg-[#0095FF] hover:bg-blue-600 text-white h-7 px-4"
        >
          {onRejectIsPendingCheck ? "Rejecting..." : "Reject"}
        </Button>
      </div>
    );
  }

  // if (status === "accepted") {
  //   return (
  //     <Button
  //       disabled={onCompleteIsPendingCheck}
  //       onClick={onComplete}
  //       size="sm"
  //       className="bg-[#0095FF] hover:bg-blue-600 text-white h-7 px-4"
  //     >
  //       {onCompleteIsPendingCheck ? "Completing..." : "Complete"}
  //     </Button>
  //   );
  // }

  if (status === "accepted") {
    return (
      <Button
        disabled={onCompleteIsPendingCheck}
        onClick={onComplete}
        size="sm"
        className="bg-[#0095FF] hover:bg-blue-600 text-white h-7 px-4"
      >
        {onCompleteIsPendingCheck ? "Completing..." : "Complete"}
      </Button>
    );
  }

  return null;
}
