import { useState } from "react";
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import Sidebar from "@/components/sidebar";
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
  useAcceptRequest,
  useCompleteRequest,
  useGetMyRequests,
  useRejectRequest,
} from "@/hooks/my-requests";
import ActionButtons from "@/components/action-buttons";
import { format } from "date-fns";

export default function MyRequests() {
  const acceptRequest = useAcceptRequest();
  const rejectRequest = useRejectRequest();
  const completeRequest = useCompleteRequest();
  const { data: requests } = useGetMyRequests();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: {
      accepting: boolean;
      rejecting: boolean;
      completing: boolean;
    };
  }>({});

  const formatTimestamp = (timestamp: Date) => {
    return format(timestamp, "PPpp");
  };

  const handleAcceptRequest = async (requestId: string) => {
    setLoadingStates((prev) => ({
      ...prev,
      [requestId]: { ...(prev[requestId] || {}), accepting: true },
    }));

    try {
      await acceptRequest.mutateAsync(requestId);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [requestId]: { ...(prev[requestId] || {}), accepting: false },
      }));
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    setLoadingStates((prev) => ({
      ...prev,
      [requestId]: { ...(prev[requestId] || {}), rejecting: true },
    }));

    try {
      await rejectRequest.mutateAsync(requestId);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [requestId]: { ...(prev[requestId] || {}), rejecting: false },
      }));
    }
  };

  const handleCompleteRequest = async (requestId: string) => {
    setLoadingStates((prev) => ({
      ...prev,
      [requestId]: { ...(prev[requestId] || {}), completing: true },
    }));

    try {
      await completeRequest.mutateAsync(requestId);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [requestId]: { ...(prev[requestId] || {}), completing: false },
      }));
    }
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
                  <TableHead className="font-medium" colSpan={2}>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(requests || []).map((request, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {request.course_name}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{request.tutor_name}</p>
                        <p className="text-gray-500 text-xs">
                          {request.requestid}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{request.price}VC</TableCell>
                    <TableCell>{formatTimestamp(request.created_at)}</TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell>
                      <ActionButtons
                        onAccept={() => handleAcceptRequest(request.requestid)}
                        onReject={() => handleRejectRequest(request.requestid)}
                        onComplete={() =>
                          handleCompleteRequest(request.requestid)
                        }
                        onAcceptIsPendingCheck={
                          loadingStates[request.requestid]?.accepting || false
                        }
                        onRejectIsPendingCheck={
                          loadingStates[request.requestid]?.rejecting || false
                        }
                        onCompleteIsPendingCheck={
                          loadingStates[request.requestid]?.completing || false
                        }
                        status={request.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {(requests || []).map((request, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {request.course_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {request.tutor_name}
                    </p>
                    <p className="text-xs text-gray-500">{request.requestid}</p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p className="font-medium">{request.price}VC</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date & Time</p>
                    <p className="font-medium">
                      {formatTimestamp(request.created_at)}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <ActionButtons
                    onAccept={() => handleAcceptRequest(request.requestid)}
                    onReject={() => handleRejectRequest(request.requestid)}
                    onComplete={() => handleCompleteRequest(request.requestid)}
                    onAcceptIsPendingCheck={
                      loadingStates[request.requestid]?.accepting || false
                    }
                    onRejectIsPendingCheck={
                      loadingStates[request.requestid]?.rejecting || false
                    }
                    onCompleteIsPendingCheck={
                      loadingStates[request.requestid]?.completing || false
                    }
                    status={request.status}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
