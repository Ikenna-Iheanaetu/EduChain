import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/profie";
import { useState } from "react";
import TopUpDialog from "./top-up-dialog";

export default function BalanceCard() {
  const { data: profile } = useProfile();

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!profile?.wallet_address) return;

    try {
      await navigator.clipboard.writeText(profile.wallet_address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000); // Reset after 1 second
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Your Balance</p>
            <p className="text-2xl font-bold">$VC {profile?.wallet_balance}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="truncate text-xs text-gray-400 flex-1">
              {profile?.wallet_address}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 p-0 transition-all ${
                isCopied ? "animate-shake text-green-500" : ""
              }`}
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <TopUpDialog />
        </div>
      </CardContent>
    </Card>
  );
}
