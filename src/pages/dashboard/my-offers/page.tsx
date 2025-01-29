"use client";

import { useState } from "react";
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import Sidebar from "@/components/sidebar";
import ServiceCard from "@/pages/dashboard/service-card";
import StatusBadge from "@/components/status-badge";
import ActionButtons from "@/components/action-buttons";
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

const offers = [
  {
    title: "Web Development",
    author: "Samuel David",
    authorId: "sjjbjfbjofbehfwbvfbwevbwjbv",
    price: "0.24 VC",
    duration: "1 hour",
  },
  {
    title: "Web Development",
    author: "Samuel David",
    authorId: "sjjbjfbjofbehfwbvfbwevbwjbv",
    price: "0.24 VC",
    duration: "1 hour",
  },
  {
    title: "Web Development",
    author: "Samuel David",
    authorId: "sjjbjfbjofbehfwbvfbwevbwjbv",
    price: "0.24 VC",
    duration: "1 hour",
  },
];

const requests = [
  {
    studentName: "samuel collins",
    studentId: "hhfvhvfvhfb....",
    price: "0.98 VC",
    dateTime: "12-09-2025 -5:30pm",
    status: "pending" as const,
  },
  {
    studentName: "samuel collins",
    studentId: "hhfvhvfvhfb....",
    price: "0.98 VC",
    dateTime: "12-09-2025 -5:30pm",
    status: "pending" as const,
  },
  {
    studentName: "samuel collins",
    studentId: "hhfvhvfvhfb....",
    price: "0.98 VC",
    dateTime: "12-09-2025 -5:30pm",
    status: "accepted" as const,
  },
  {
    studentName: "samuel collins",
    studentId: "hhfvhvfvhfb....",
    price: "0.98 VC",
    dateTime: "12-09-2025 -5:30pm",
    status: "completed" as const,
  },
];

export default function MyOffers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

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
          {/* Page Title */}
          <h1 className="text-xl font-semibold">My Offers</h1>

          {/* Offers Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <ServiceCard
                key={index}
                {...offer}
                mode="offer"
                variant={
                  index % 3 === 0 ? "blue" : index % 3 === 1 ? "mint" : "blue"
                }
                onAction={() => setSelectedOffer(index)}
              />
            ))}
          </div>

          {/* Selected Offer Requests */}
          {selectedOffer !== null && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6">Web Development</h2>

              {/* Desktop Table View */}
              <div className="hidden md:block rounded-lg border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-medium">
                        Student Name
                      </TableHead>
                      <TableHead className="font-medium">Price</TableHead>
                      <TableHead className="font-medium">Date & Time</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                      <TableHead className="font-medium" colSpan={2}>
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p>{request.studentName}</p>
                            <p className="text-gray-500 text-xs">
                              {request.studentId}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{request.price}</TableCell>
                        <TableCell>{request.dateTime}</TableCell>
                        <TableCell>
                          <StatusBadge status={request.status} />
                        </TableCell>
                        <TableCell>
                          <ActionButtons status={request.status} />
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
                          {request.studentName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {request.studentId}
                        </p>
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
                      <ActionButtons status={request.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
