"use client";

import { useState, useEffect } from "react";
import { CouponDashboard } from "@/components/coupon-dashboard";

const API_URL = "https://backend-keshxvdayals-projects.vercel.app"; // ✅ Backend running on 3000

export default function Home() {
  const [coupons] = useState<string[]>(["Coupon1", "Coupon2", "Coupon3"]);
  const [claimedCoupons, setClaimedCoupons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClaimedCoupons = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching claimed coupons from API...");
        const response = await fetch(`${API_URL}/claimed-coupons`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Claimed Coupons:", data);
        setClaimedCoupons(data.claimedCoupons || []);
      } catch (error) {
        console.error("Error fetching claimed coupons:", error);
        setError("Failed to load claimed coupons.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaimedCoupons();
  }, []);

  async function claimCoupon(coupon: string): Promise<void> {
    setError(null);
    try {
      console.log(`Claiming coupon: ${coupon}`);
  
      const response = await fetch(`${API_URL}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon }),
      });
  
      const textResponse = await response.text(); // Log raw response
      console.log("Raw response:", textResponse);
  
      if (!response.ok) {
        throw new Error(`Failed: ${response.status} - ${response.statusText}`);
      }
  
      const data = JSON.parse(textResponse);
      console.log("Coupon claimed successfully:", data);
  
      setClaimedCoupons((prev) => [...prev, coupon]);
    } catch (error) {
      console.error("Error claiming coupon:", error);
      setError("Failed to claim coupon.");
    }
  }
  

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <CouponDashboard
        coupons={coupons}
        claimedCoupons={claimedCoupons}
        claimCoupon={claimCoupon}
        isLoading={isLoading}
      />
    </div>
  );
}
