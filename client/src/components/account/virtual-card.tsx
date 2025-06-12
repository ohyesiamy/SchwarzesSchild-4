interface VirtualCardProps {
  cardNumber: string;
  expiryDate: string;
  cardType?: "VISA" | "MASTERCARD";
  cardName?: string;
  cardholderName?: string;
  balance?: number;
  currency?: string;
  isFrozen?: boolean;
  isBlocked?: boolean;
  className?: string;
}

export function VirtualCard({
  cardNumber,
  expiryDate,
  cardType = "VISA",
  cardName = "Debit Card",
  isFrozen = false,
  isBlocked = false,
  className = ""
}: VirtualCardProps) {
  return (
    <div className={`bg-black text-white p-6 relative overflow-hidden transition-all duration-300 ${className}`}>
      {/* Status Overlays */}
      {isFrozen && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
          <div className="text-lg uppercase tracking-widest text-white rotate-[-15deg] border-2 border-white px-4 py-2 font-semibold">
            Frozen
          </div>
        </div>
      )}
      
      {isBlocked && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10">
          <div className="text-lg uppercase tracking-widest text-white rotate-[-15deg] border-2 border-white px-4 py-2 font-semibold">
            Blocked
          </div>
        </div>
      )}
      
      {/* Card Design Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="w-full h-full border-l border-t border-white"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-5">
        <div className="w-full h-full border-r border-b border-white"></div>
      </div>
      
      {/* Card Content */}
      <div className="flex justify-between items-start mb-8">
        <div className="text-sm uppercase tracking-wider font-light">{cardName}</div>
        <div className="text-sm font-semibold">{cardType}</div>
      </div>
      
      <div className="text-xl mb-8 tracking-widest font-light">{cardNumber}</div>
      
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs mb-1 uppercase tracking-wider">Valid Thru</div>
          <div className="font-light">{expiryDate}</div>
        </div>
        <div className="text-sm uppercase tracking-widest font-semibold">SCHWARZES SCHILD</div>
      </div>
      
      {/* EMV Chip Simulation */}
      <div className="absolute top-1/3 left-6 w-10 h-8 border border-white border-opacity-30 rounded-sm flex items-center justify-center overflow-hidden">
        <div className="w-full h-0.5 bg-white bg-opacity-20"></div>
        <div className="w-0.5 h-full bg-white bg-opacity-20 absolute"></div>
      </div>
    </div>
  );
}
