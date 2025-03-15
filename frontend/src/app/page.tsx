"use client"

import { useState, useEffect } from "react"
import { CouponDashboard } from "@/components/coupon-dashboard"

const API_URL = "https://backend-dvszsqaps-keshxvdayals-projects.vercel.app"

export default function Home() {
  const [coupons] = useState<string[]>(["Coupon1", "Coupon2", "Coupon3"])
  const [claimedCoupons, setClaimedCoupons] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchClaimedCoupons = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${API_URL}/claimed-coupons`)
        const data = await response.json()
        setClaimedCoupons(data.claimedCoupons || [])
      } catch (error) {
        console.error("Error fetching claimed coupons:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClaimedCoupons()
  }, [])

  

  async function claimCoupon(coupon: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/claim`, {  // Fix URL here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coupon }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Coupon claimed successfully:', data);
    } catch (error) {
      console.error('Error claiming coupon:', error);
    }
  }
  


  return (
    <CouponDashboard
      coupons={coupons}
      claimedCoupons={claimedCoupons}
      claimCoupon={claimCoupon}
      isLoading={isLoading}
    />
  )
}
