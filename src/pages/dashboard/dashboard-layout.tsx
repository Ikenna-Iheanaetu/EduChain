import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <div className="flex min-h-screen bg-white">{children}</div>
}

