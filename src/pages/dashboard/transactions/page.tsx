import { useState } from "react";
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import DashboardHeader from "@/pages/dashboard/dashboard-header";
import Sidebar from "@/components/sidebar";
import TransactionStatus from "@/pages/dashboard/transactions/transaction-status";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTransactions } from "@/hooks/transactions";
import { format } from "date-fns";

export default function Transactions() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: transactions } = useGetTransactions();
  console.log(transactions);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return format(date, "PPpp");
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
          <h1 className="text-xl font-semibold mb-6">Transactions</h1>

          {/* Desktop Table View */}
          <div className="hidden md:block rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium">Transaction ID</TableHead>
                  <TableHead className="font-medium">Sender Address</TableHead>
                  <TableHead className="font-medium">
                    Receiver Address
                  </TableHead>
                  <TableHead className="font-medium">Amount</TableHead>
                  <TableHead className="font-medium">Gas fee</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Nonce</TableHead>
                  <TableHead className="font-medium">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(transactions || []).map((transaction, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm max-w-[150px]">
                      <div className="truncate">
                        {" "}
                        {transaction.transaction.transaction_id}{" "}
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.transaction.sender_address}
                    </TableCell>
                    <TableCell>
                      {transaction.transaction.receiver_address}
                    </TableCell>
                    <TableCell>{transaction.transaction.amount}</TableCell>
                    <TableCell>{transaction.transaction.gas_fee}</TableCell>
                    <TableCell>
                      <TransactionStatus status={transaction.status} />
                    </TableCell>
                    <TableCell>{transaction.nonce}</TableCell>
                    <TableCell>
                      {formatTimestamp(transaction.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {(transactions || []).map((transaction, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="font-mono text-sm">
                      {transaction.transaction.transaction_id}
                    </p>
                  </div>
                  <TransactionStatus status={transaction.status} />
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-[360px]">
                  <div>
                    <p className="text-sm text-gray-500">Sender Address</p>
                    <p className="font-mono text-sm">
                      {transaction.transaction.sender_address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Receiver Address</p>
                    <p className="font-mono text-sm">
                      {transaction.transaction.receiver_address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-sm">{transaction.transaction.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gas Fee</p>
                    <p className="text-sm">{transaction.transaction.gas_fee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nonce</p>
                    <p className="text-sm">{transaction.nonce}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-sm">
                      {formatTimestamp(transaction.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
