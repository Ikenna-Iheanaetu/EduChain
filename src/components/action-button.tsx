import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ActionButtonProps {
  action: "Cancel" | "Complete" | "Done"
  onClick?: () => void
  className?: string
}

export default function ActionButton({ action, onClick, className }: ActionButtonProps) {
  return (
    <Button
      size="sm"
      onClick={onClick}
      className={cn(
        "px-4 py-1 h-7 rounded-md font-medium",
        action === "Done" ? 
          "bg-gray-200 text-gray-700 hover:bg-gray-300" : 
          "bg-[#0095FF] text-white hover:bg-blue-600",
        className
      )}
    >
      {action}
    </Button>
  )
}
