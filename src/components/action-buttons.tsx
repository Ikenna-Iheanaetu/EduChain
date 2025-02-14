import { Button } from "@/components/ui/button"

interface ActionButtonsProps {
  status: "pending" | "accepted" | "completed"
  onAccept?: () => void
  onReject?: () => void
  onComplete?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ActionButtons({ status }: ActionButtonsProps) {
  if (status === "pending") {
    return (
      <div className="flex gap-2">
        <Button size="sm" className="bg-[#0095FF] hover:bg-blue-600 text-white h-7 px-4">
          Accept
        </Button>
        <Button size="sm" className="bg-[#0095FF] hover:bg-blue-600 text-white h-7 px-4">
          reject
        </Button>
      </div>
    )
  }

  if (status === "accepted") {
    return (
      <Button size="sm" className="bg-[#0095FF] hover:bg-blue-600 text-white h-7 px-4">
        complete
      </Button>
    )
  }

  if (status === "completed") {
    return (
      <Button size="sm" className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-7 px-4">
        complete
      </Button>
    )
  }

  return null
}

