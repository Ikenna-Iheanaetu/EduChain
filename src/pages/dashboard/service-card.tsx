import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  courseId: string;
  variant?: "blue" | "beige" | "mint";
  title?: string;
  author?: string;
  authorId?: string;
  price?: string;
  duration?: string;
  mode?: "request" | "offer";
  onDelete?: () => void;
  onAction?: (mode: "request" | "offer", courseId?: string) => void;
  isLoading?: boolean;
  loadingCourseId?: string | null;
}

export default function ServiceCard({
  courseId,
  variant = "blue",
  title = "Web Development",
  author = "Samuel David",
  authorId = "dkmdkd03944in494949",
  price = "0.24 VC",
  duration = "1 hour",
  mode = "request",
  onDelete,
  onAction,
  loadingCourseId = null,
}: ServiceCardProps) {
  const bgColors = {
    blue: "bg-[#F0F7FF]",
    beige: "bg-[#FFFAF0]",
    mint: "bg-[#F0FFF4]",
  };

  const isLoading = loadingCourseId === courseId;
  const handleAction = () => {
    if (onAction) {
      onAction(mode, courseId);
    }
  };

  return (
    <Card className={`${bgColors[variant]} border-none`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold leading-none">{title}</h3>
            <p className="text-base text-gray-900">{author}</p>
            <p className="text-sm text-gray-500">{authorId}</p>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <p className="text-sm font-medium">{price}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="text-sm font-medium">{duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className={cn(
                "flex-1 font-medium",
                mode === "offer"
                  ? "bg-[#0095FF] hover:bg-blue-500 text-white"
                  : "bg-[#0095FF] hover:bg-blue-600 text-white"
              )}
              size="sm"
              onClick={handleAction}
              disabled={isLoading}
            >
              {mode === "offer"
                ? "View Requests"
                : isLoading
                ? "Requesting Service..."
                : "Request Service"}
            </Button>
            {mode === "offer" && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-500 hover:text-gray-700"
                onClick={onDelete}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
