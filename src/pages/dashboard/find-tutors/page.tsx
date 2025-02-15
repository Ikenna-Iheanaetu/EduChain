import { useState } from "react";
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import Sidebar from "@/components/sidebar";
import ServiceCard from "@/pages/dashboard/service-card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import ArtAndDesignIcon from "@/assets/art-and-design 1.png";
import PopularityIcon from "@/assets/popularity 1.png";
import DashboardHeader from "../dashboard-header";
import { useGetLatestCourses, useGetPoplarCourses } from "@/hooks/course";

export default function FindTutors() {
  const { data: latestCourses } = useGetLatestCourses();
  const { data: popularCourses } = useGetPoplarCourses();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewType, setViewType] = useState<"popular" | "latest">("popular"); //* State to track view type

  //* Determine which data to display based on the selected view type
  const displayedCourses =
    viewType === "popular" ? popularCourses?.courses : latestCourses?.courses;

  const getVariantForCourse = (courseColor: string) => {
    return courseColor === "#F0F7FF"
      ? "blue"
      : courseColor === "#FFFAF0"
      ? "beige"
      : "mint";
  };

  return (
    <DashboardLayout>
      z
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <main className="flex-1 overflow-auto bg-white">
        {/* Header */}
        <DashboardHeader setIsSidebarOpen={setIsSidebarOpen} />

        <div className="p-6 space-y-6">
          {/* Tutors Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">All Tutors</h1>
              <span className="text-sm text-gray-500">
                {(latestCourses?.courses.length ?? 0) +
                  (popularCourses?.courses.length ?? 0)}{" "}
                items
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "gap-2",
                viewType === "popular" && "bg-blue-50 border-blue-200"
              )}
              onClick={() => setViewType("popular")}
            >
              <img src={PopularityIcon} alt="" className="h-4 w-4" />
              Popular
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "gap-2",
                viewType === "latest" && "bg-blue-50 border-blue-200"
              )}
              onClick={() => setViewType("latest")}
            >
              <img src={ArtAndDesignIcon} alt="" className="h-4 w-4" />
              Latest
            </Button>
          </div>

          {/* Tutors Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedCourses?.map((course, index) => (
              <ServiceCard
                key={index}
                variant={getVariantForCourse(course.color)}
                title={course.course_name}
                author={course.tutor_name}
                authorId={course.tutor_id}
                price={`${course.price} VC`}
                duration={`${course.duration} hours`}
              />
            ))}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
