// import React, { useState, useEffect } from "react";
// import ClaimButton from "./components/ClaimButton";
// import { CouponList } from "./components/CouponList";

// const App: React.FC = () => {
//   const [coupons] = useState<string[]>(["Coupon1", "Coupon2", "Coupon3"]);
//   const [claimedCoupons, setClaimedCoupons] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchClaimedCoupons = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/claimed-coupons");
//         if (response.ok) {
//           const data = await response.json();
//           setClaimedCoupons(data.claimedCoupons || []);
//         }
//       } catch (error) {
//         console.error("Error fetching claimed coupons:", error);
//       }
//     };

//     fetchClaimedCoupons();
//   }, []);

//   const claimCoupon = async (coupon: string) => {
//     try {
//       console.log("🚀 Sending POST request with:", { coupon });

//       const response = await fetch("http://localhost:3000/claim", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ coupon }),
//       });

//       const responseData = await response.text();
//       console.log("🎯 Server Response:", responseData);

//       if (!response.ok) {
//         alert(responseData);
//         return;
//       }

//       setClaimedCoupons((prev) => [...prev, coupon]);
//       alert(`🎉 You successfully claimed: ${coupon}`);
//     } catch (error) {
//       console.error("🚨 Error claiming coupon:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
//       <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
//         <h1 className="text-2xl font-bold text-gray-800">🎟 Coupon Claim Center</h1>
//         <p className="text-gray-600 mt-2">Claim your exclusive coupons now!</p>

//         <CouponList coupons={coupons} />
//         <ClaimButton onClick={claimCoupon} coupons={coupons.filter(c => !claimedCoupons.includes(c))} />
//       </div>

//       <div className="mt-6 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-lg font-bold text-gray-800">🎯 Claimed Coupons</h2>
//         {claimedCoupons.length > 0 ? (
//           <div className="mt-4 space-y-2">
//             {claimedCoupons.map((coupon) => (
//               <div key={coupon} className="p-2 bg-green-100 text-green-800 font-semibold rounded-lg shadow-md">
//                 {coupon}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="mt-2 text-gray-600">No coupons claimed yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
"use client"

import { useState, useEffect } from "react"
import { CouponDashboard } from "@/components/coupon-dashboard"

export default function Home() {
  const [coupons] = useState<string[]>(["Coupon1", "Coupon2", "Coupon3"])
  const [claimedCoupons, setClaimedCoupons] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchClaimedCoupons = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("http://localhost:3000/claimed-coupons")
        if (response.ok) {
          const data = await response.json()
          setClaimedCoupons(data.claimedCoupons || [])
        }
      } catch (error) {
        console.error("Error fetching claimed coupons:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClaimedCoupons()
  }, [])

  const claimCoupon = async (coupon: string) => {
    try {
      console.log("🚀 Sending POST request with:", { coupon })

      const response = await fetch("http://localhost:3000/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon }),
      })

      const responseData = await response.text()
      console.log("🎯 Server Response:", responseData)

      if (!response.ok) {
        alert(responseData)
        return
      }

      setClaimedCoupons((prev) => [...prev, coupon])
      alert(`🎉 You successfully claimed: ${coupon}`)
    } catch (error) {
      console.error("🚨 Error claiming coupon:", error)
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

