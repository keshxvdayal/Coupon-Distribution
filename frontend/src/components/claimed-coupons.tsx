// import { Card, CardContent } from "@/components/ui/card"
import { Card, CardContent } from "./ui/card"
// import { Skeleton } from "@/components/ui/skeleton"
import { Skeleton } from "./ui/skeleton"
// import { Badge } from "@/components/ui/badge"
import { Badge } from "./ui/badge"
import { Ticket, Check } from "lucide-react"

interface ClaimedCouponsProps {
  coupons: string[]
  isLoading: boolean
}

export function ClaimedCoupons({ coupons, isLoading }: ClaimedCouponsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (coupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Ticket className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Claimed Coupons</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">You haven&lsquo;t claimed any coupons yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {coupons.map((coupon, index) => (
        <Card key={index} className="overflow-hidden bg-gray-50 dark:bg-gray-800/50">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{coupon}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Claimed on {formatDate(new Date())}</p>
              </div>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 flex items-center gap-1"
              >
                <Check className="h-3 w-3" />
                Claimed
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

