"use client"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { Ticket, ArrowRight } from "lucide-react"

interface AvailableCouponsProps {
  coupons: string[]
  onClaimCoupon: (coupon: string) => void
  isLoading: boolean
}

export function AvailableCoupons({ coupons, onClaimCoupon, isLoading }: AvailableCouponsProps) {
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
                <Skeleton className="h-9 w-20" />
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
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Available Coupons</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">You've claimed all available coupons.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {coupons.map((coupon, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{coupon}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expires in 7 days</p>
              </div>
              <Button onClick={() => onClaimCoupon(coupon)} className="gap-1 p-3 hover:bg-white hover:p-3 hover:text-black">
                Claim
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

