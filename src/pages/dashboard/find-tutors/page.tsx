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

const tutors = Array(9)
  .fill(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .map((_, i) => ({
    title: "Web Development",
    author: "Samuel David",
    authorId: "sjjbjfbjofbehfwbvfbwevbwjbv",
    price: "0.24 VC",
    duration: "1 hour",
  }));

export default function FindTutors() {
  const [activeFilter, setActiveFilter] = useState("popular");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

      <main className="flex-1 overflow-auto bg-white">
        {/* Header */}
        <DashboardHeader setIsSidebarOpen={setIsSidebarOpen} />

        <div className="p-6 space-y-6">
          {/* Tutors Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">All Tutors</h1>
              <span className="text-sm text-gray-500">244 items</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "gap-2",
                activeFilter === "popular" && "bg-blue-50 border-blue-200"
              )}
              onClick={() => setActiveFilter("popular")}
            >
              <img src={PopularityIcon} alt="" className="h-4 w-4" />
              Popular
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "gap-2",
                activeFilter === "latest" && "bg-blue-50 border-blue-200"
              )}
              onClick={() => setActiveFilter("latest")}
            >
              <img src={ArtAndDesignIcon} alt="" className="h-4 w-4" />
              Latest
            </Button>
          </div>

          {/* Tutors Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor, index) => (
              <ServiceCard
                key={index}
                variant={
                  index % 3 === 0 ? "blue" : index % 3 === 1 ? "beige" : "mint"
                }
                {...tutor}
              />
            ))}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
