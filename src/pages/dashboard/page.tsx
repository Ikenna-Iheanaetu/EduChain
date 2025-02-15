import { useState } from "react";
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import Sidebar from "@/components/sidebar";
import ServiceCard from "@/pages/dashboard/service-card";
import BalanceCard from "@/pages/dashboard/balance-card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ArtAndDesignIcon from "@/assets/art-and-design 1.png";
import PopularityIcon from "@/assets/popularity 1.png";
import DashboardHeader from "./dashboard-header";
import CreateCourseDialog from "./create-course-dialog";
import SendDialog from "./send-dialog";
import { useGetLatestCourses, useGetPoplarCourses } from "@/hooks/course";
import { useProfile } from "@/hooks/profile";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewType, setViewType] = useState<"popular" | "latest">("popular"); //* State to track view type

  const { data: latestCourses } = useGetLatestCourses();
  const { data: popularCourses } = useGetPoplarCourses();
  const { data: profile } = useProfile();

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
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <DashboardHeader setIsSidebarOpen={setIsSidebarOpen} />

        <div className="p-4 space-y-6">
          {/* Welcome Section */}
          <div className="grid gap-4 lg:grid-cols-[1fr,300px]">
            <div className="rounded-xl bg-blue-500 p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">
                Welcome, {profile?.firstname}
              </h1>
              <p className="text-blue-100 mb-4 text-sm">
                Search courses, make request, learn
              </p>
              <div className="flex flex-wrap gap-3">
                <SendDialog />
                <CreateCourseDialog />
              </div>
            </div>
            <BalanceCard />
          </div>

          {/* Tutors Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">All Tutors</h2>
              <span className="text-sm text-gray-500">
                {(latestCourses?.courses.length ?? 0) +
                  (popularCourses?.courses.length ?? 0)}{" "}
                items
              </span>
            </div>

            {/* Toggle between Popular and Latest  */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
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

            {/* Display Courses */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayedCourses?.map((course) => (
                <ServiceCard
                  key={course.courseid}
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
        </div>
      </main>
    </DashboardLayout>
  );
}
