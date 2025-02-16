import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/profile";
import { pickAnImage } from "@/lib/pick-image";

interface DashboardHeaderProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DashboardHeader({
  setIsSidebarOpen,
}: DashboardHeaderProps) {
  const { data: profile } = useProfile();
  
  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <div className="relative flex-1 max-w-xl mx-auto lg:mx-0">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search items, collection, accounts"
          className="pl-9 h-10"
        />
      </div>
      <div className="ml-4">
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
          <img
            src={pickAnImage(profile?.avatar_number || 1)}
            alt="Samuel"
            className="h-full w-full rounded-full"
          />
        </Button>
      </div>
    </div>
  );
}
