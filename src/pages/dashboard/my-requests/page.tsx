import { useState } from "react";
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import Sidebar from "@/components/sidebar";
import StatusBadge from "@/components/status-badge";
import ActionButton from "@/components/action-button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardHeader from "../dashboard-header";
import { useGetMyRequests } from "@/hooks/my-requests";

const requests = [
  {
    courseName: "Web developmment",
    tutorName: "samuel collins",
    tutorId: "hhfvhvfvhfb....",
    price: "0.98 VC",
    dateTime: "12-09-2025 -5:30pm",
    status: "pending" as const,
    action: "Cancel" as const,
  },
  {
    courseName: "Web developmment",
    tutorName: "samuel collins",
    tutorId: "hhfvhvfvhfb....",
    price: "0.98 VC",
    dateTime: "12-09-2025 -5:30pm",
    status: "accepted" as const,
    action: "Complete" as const,
  },
  {
    courseName: "Web developmment",
    tutorName: "samuel collins",
    tutorId: "hhfvhvfvhfb....",
    price: "0.98 VC",
    dateTime: "12-09-2025 -5:30pm",
    status: "completed" as const,
    action: "Done" as const,
  },
  {
    courseName: "Web developmment",
    tutorName: "samuel collins",
    tutorId: "hhfvhvfvhfb....",
    price: "0.98 VC",
    dateTime: "12-09-2025 -5:30pm",
    status: "accepted" as const,
    action: "Complete" as const,
  },
  {
    courseName: "Web developmment",
    tutorName: "samuel collins",
    tutorId: "hhfvhvfvhfb....",
    price: "0.98 VC",
    dateTime: "12-09-2025 -5:30pm",
    status: "accepted" as const,
    action: "Complete" as const,
  },
  {
    courseName: "Web developmment",
    tutorName: "samuel collins",
    tutorId: "hhfvhvfvhfb....",
    price: "0.98 VC",
    dateTime: "12-09-2025 -5:30pm",
    status: "accepted" as const,
    action: "Complete" as const,
  },
];

export default function MyRequests() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: mrequests } = useGetMyRequests()

  console.log(mrequests)

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

        <div className="p-6">
          {/* Page Title */}
          <h1 className="text-xl font-semibold mb-6">My Requests</h1>

          {/* Desktop Table View */}
          <div className="hidden md:block rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium">Course Name</TableHead>
                  <TableHead className="font-medium">Tutor Name</TableHead>
                  <TableHead className="font-medium">Price</TableHead>
                  <TableHead className="font-medium">Date & Time</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {request.courseName}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{request.tutorName}</p>
                        <p className="text-gray-500 text-xs">
                          {request.tutorId}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{request.price}</TableCell>
                    <TableCell>{request.dateTime}</TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell>
                      <ActionButton action={request.action} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {requests.map((request, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {request.courseName}
                    </p>
                    <p className="text-sm text-gray-500">{request.tutorName}</p>
                    <p className="text-xs text-gray-500">{request.tutorId}</p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p className="font-medium">{request.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date & Time</p>
                    <p className="font-medium">{request.dateTime}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <ActionButton action={request.action} className="w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
