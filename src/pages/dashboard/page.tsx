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

export default function DashboardPage() {
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
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <DashboardHeader setIsSidebarOpen={setIsSidebarOpen} />

        <div className="p-4 space-y-6">
          {/* Welcome Section */}
          <div className="grid gap-4 lg:grid-cols-[1fr,300px]">
            <div className="rounded-xl bg-blue-500 p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Welcome, Samuel</h1>
              <p className="text-blue-100 mb-4 text-sm">
                Search courses, make request, learn
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm" className="text-blue-500">
                  Send
                </Button>
                <Button variant="secondary" size="sm" className="text-blue-500">
                  Create your course
                </Button>
              </div>
            </div>
            <BalanceCard />
          </div>

          {/* Tutors Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">All Tutors</h2>
              <span className="text-sm text-gray-500">244 items</span>
            </div>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 whitespace-nowrap"
              >
                <img src={PopularityIcon} alt="" className="h-4 w-4" />
                Popular
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 whitespace-nowrap"
              >
                <img src={ArtAndDesignIcon} alt="" className="h-4 w-4" />
                Latest
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceCard variant="blue" />
              <ServiceCard variant="beige" />
              <ServiceCard variant="mint" />
              <ServiceCard variant="blue" />
              <ServiceCard variant="beige" />
              <ServiceCard variant="mint" />
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
