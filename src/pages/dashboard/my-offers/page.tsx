import { useState } from "react";
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import Sidebar from "@/components/sidebar";
import ServiceCard from "@/pages/dashboard/service-card";
import StatusBadge from "@/components/status-badge";
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
import {
  useAcceptOffers,
  useGetMyOffers,
  useRejectOffers,
} from "@/hooks/my-offers";
import { format } from "date-fns";
import ActionButtons from "@/components/action-buttons";
import { useDeleteCourse } from "@/hooks/course";

export default function MyOffers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: {
      accepting: boolean;
      rejecting: boolean;
      deleting: boolean;
    };
  }>({});
  const deleteCourse = useDeleteCourse();
  const acceptOffer = useAcceptOffers();
  const rejectOffer = useRejectOffers();

  const { data: myOffers } = useGetMyOffers();

  const updateLoadingState = (
    requestId: string,
    key: "rejecting" | "accepting" | "deleting",
    value: boolean
  ) => {
    setLoadingStates((prev) => ({
      ...prev,
      [requestId]: {
        ...prev[requestId],
        [key]: value,
      },
    }));
  };

  const handleAcceptOffer = (requestId: string) => {
    updateLoadingState(requestId, "accepting", true);

    try {
      acceptOffer.mutateAsync(requestId);
    } finally {
      updateLoadingState(requestId, "accepting", false);
    }
  };

  const handleRejectOffer = (requestId: string) => {
    updateLoadingState(requestId, "rejecting", true);

    try {
      rejectOffer.mutateAsync(requestId);
    } finally {
      updateLoadingState(requestId, "rejecting", false);
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    updateLoadingState(courseId, "deleting", true);
    try {
      deleteCourse.mutateAsync(courseId);
    } finally {
      updateLoadingState(courseId, "deleting", false);
    }
  };

  const offers = myOffers || [];

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
                courseId={offer.courseid}
                title={offer.course.course_name}
                author={offer.course.tutor_name}
                authorId={offer.course.tutor_id}
                price={`${offer.course.duration} VC`} // Assuming price is based on duration
                duration={`${offer.course.duration} hours`}
                mode="offer"
                variant={
                  index % 3 === 0 ? "blue" : index % 3 === 1 ? "mint" : "blue"
                }
                onAction={() => setSelectedOffer(index)}
                onDelete={() => handleDeleteCourse(offer.courseid)}
                isDeletingCheck={
                  loadingStates[offer.courseid]?.deleting || false
                }
              />
            ))}
          </div>

          {/* Selected Offer Requests */}
          {selectedOffer !== null && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6">
                {offers[selectedOffer].course.course_name}
              </h2>

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
                    {offers[selectedOffer].course.total_requests > 0 ? (
                      offers
                        .filter(
                          (offer) =>
                            offer.courseid === offers[selectedOffer].courseid
                        )
                        .map((request, index) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell>
                              <div>
                                <p>
                                  {request.student.firstname}{" "}
                                  {request.student.lastname}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  {request.studentid}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{`${request.course.duration} VC`}</TableCell>
                            <TableCell>
                              {format(request.created_at, "PPpp")}
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={request.status} />
                            </TableCell>
                            <TableCell>
                              <ActionButtons
                                status={request.status}
                                onAcceptIsPendingCheck={
                                  loadingStates[request.requestid]?.accepting ||
                                  false
                                }
                                onRejectIsPendingCheck={
                                  loadingStates[request.requestid]?.rejecting ||
                                  false
                                }
                                onAccept={() =>
                                  handleAcceptOffer(request.requestid)
                                }
                                onReject={() =>
                                  handleRejectOffer(request.requestid)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No requests found for this offer.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="space-y-4 md:hidden">
                {offers
                  .filter(
                    (offer) => offer.courseid === offers[selectedOffer].courseid
                  ) // Filter requests for the selected course
                  .map((request, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 p-4 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {request.student.firstname}{" "}
                            {request.student.lastname}
                          </p>
                          <p className="text-xs text-gray-500">
                            {request.studentid}
                          </p>
                        </div>
                        <StatusBadge status={request.status} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Price</p>
                          <p className="font-medium">{`${request.course.duration} VC`}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Date & Time</p>
                          <p className="font-medium">
                            {format(new Date(request.created_at), "PPpp")}
                          </p>
                        </div>
                        <div className="pt-2">
                          <ActionButtons
                            status={request.status}
                            onAcceptIsPendingCheck={
                              loadingStates[request.requestid]?.accepting ||
                              false
                            }
                            onRejectIsPendingCheck={
                              loadingStates[request.requestid]?.rejecting ||
                              false
                            }
                            onAccept={() =>
                              handleAcceptOffer(request.requestid)
                            }
                            onReject={() =>
                              handleRejectOffer(request.requestid)
                            }
                          />
                        </div>
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
