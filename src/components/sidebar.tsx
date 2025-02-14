"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  Grid,
  MessageSquare,
  ClipboardList,
  Gift,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutBg from "@/assets/logout-bg.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Find Tutors", href: "/dashboard/find-tutors", icon: Grid },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "My Requests", href: "/dashboard/my-requests", icon: ClipboardList },
  { name: "My Offers", href: "/dashboard/my-offers", icon: Gift },
  { name: "Transactions", href: "/dashboard/transactions", icon: History },
  { name: "Profile", href: "/dashboard/profile", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex flex-1 flex-col gap-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "text-blue-500 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="p-4">
        <div
          className="mb-4 rounded-xl bg-cover bg-center p-4 h-32"
          style={{ backgroundImage: `url(${LogoutBg})` }}
        >
          <Button
            variant="secondary"
            className="w-full mt-auto"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
