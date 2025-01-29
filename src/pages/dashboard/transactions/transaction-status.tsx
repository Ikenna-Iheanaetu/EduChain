import { cn } from "@/lib/utils"

interface TransactionStatusProps {
  status: "pending" | "Completed"
  className?: string
}

export default function TransactionStatus({ status, className }: TransactionStatusProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium",
        status === "pending" && "text-red-500",
        status === "Completed" && "text-green-500",
        className,
      )}
    >
      {status}
    </span>
  )
}

