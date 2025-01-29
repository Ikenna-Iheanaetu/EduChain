import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BalanceCard() {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Your Balance</p>
            <p className="text-2xl font-bold">$VC 350.20</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="truncate text-xs text-gray-400 flex-1">sdgcghjhke2t687udwhfjknscnkjk</p>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button className="w-full bg-blue-500 hover:bg-blue-600" size="sm">
            TopUp
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

