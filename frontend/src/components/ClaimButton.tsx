interface ClaimButtonProps {
    onClick: (coupon: string) => void;
    coupons: string[];
  }
  
  const ClaimButton: React.FC<ClaimButtonProps> = ({ onClick, coupons }) => {
    return (
      <div className="flex flex-col items-center">
        {coupons.map((coupon, index) => (
          <button
            key={index}
            onClick={() => onClick(coupon)}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          >
            Claim {coupon}
          </button>
        ))}
      </div>
    );
  };
  
  export default ClaimButton;
  