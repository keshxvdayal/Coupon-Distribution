import React from "react";

interface CouponListProps {
  coupons: string[];
}

export const CouponList: React.FC<CouponListProps> = ({ coupons }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">Available Coupons</h2>
      <ul>
        {coupons.map((coupon, index) => (
          <li key={index} className="text-lg mt-2">{coupon}</li>
        ))}
      </ul>
    </div>
  );
};
