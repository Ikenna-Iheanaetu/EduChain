import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "pending" | "accepted" | "completed" | "rejected"
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        status === "pending" && "bg-red-50 text-red-500",
        status === "rejected" && "bg-red-50 text-red-900",
        status === "accepted" && "bg-green-50 text-green-500",
        status === "completed" && "bg-gray-100 text-gray-500",
        className,
      )}
    >
      {status}
    </span>
  )
}

