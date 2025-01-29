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

const transactions = [
  {
    id: "hjjhvhjvjvjhvhghg",
    blockHash: "00c88bhbubjb",
    fee: "VC 0.8",
    gasFee: "VC 0.8",
    index: "4",
    status: "pending" as const,
    nonce: "99999",
    time: "12-09-2024 :30",
  },
  {
    id: "hjjhvhjvjvjhvhghg",
    blockHash: "00c88bhbubjb",
    fee: "VC 0.8",
    gasFee: "VC 0.8",
    index: "4",
    status: "pending" as const,
    nonce: "99999",
    time: "12-09-2024 :30",
  },
  {
    id: "hjjhvhjvjvjhvhghg",
    blockHash: "00c88bhbubjb",
    fee: "VC 0.8",
    gasFee: "VC 0.8",
    index: "4",
    status: "Completed" as const,
    nonce: "99999",
    time: "12-09-2024 :30",
  },
  {
    id: "hjjhvhjvjvjhvhghg",
    blockHash: "00c88bhbubjb",
    fee: "VC 0.8",
    gasFee: "VC 0.8",
    index: "4",
    status: "Completed" as const,
    nonce: "99999",
    time: "12-09-2024 :30",
  },
  {
    id: "hjjhvhjvjvjhvhghg",
    blockHash: "00c88bhbubjb",
    fee: "VC 0.8",
    gasFee: "VC 0.8",
    index: "4",
    status: "Completed" as const,
    nonce: "99999",
    time: "12-09-2024 :30",
  },
];

export default function Transactions() {
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

        <div className="p-6">
          {/* Page Title */}
          <h1 className="text-xl font-semibold mb-6">Transactions</h1>

          {/* Desktop Table View */}
          <div className="hidden md:block rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium">Transaction ID</TableHead>
                  <TableHead className="font-medium">block hash</TableHead>
                  <TableHead className="font-medium">fee</TableHead>
                  <TableHead className="font-medium">gas fee</TableHead>
                  <TableHead className="font-medium">Index</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">nonce</TableHead>
                  <TableHead className="font-medium">time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">
                      {transaction.id}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {transaction.blockHash}
                    </TableCell>
                    <TableCell>{transaction.fee}</TableCell>
                    <TableCell>{transaction.gasFee}</TableCell>
                    <TableCell>{transaction.index}</TableCell>
                    <TableCell>
                      <TransactionStatus status={transaction.status} />
                    </TableCell>
                    <TableCell>{transaction.nonce}</TableCell>
                    <TableCell>{transaction.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="font-mono text-sm">{transaction.id}</p>
                  </div>
                  <TransactionStatus status={transaction.status} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Block Hash</p>
                    <p className="font-mono text-sm">{transaction.blockHash}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Index</p>
                    <p className="text-sm">{transaction.index}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fee</p>
                    <p className="text-sm">{transaction.fee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gas Fee</p>
                    <p className="text-sm">{transaction.gasFee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nonce</p>
                    <p className="text-sm">{transaction.nonce}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-sm">{transaction.time}</p>
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
