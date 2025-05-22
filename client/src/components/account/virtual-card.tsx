interface VirtualCardProps {
  cardNumber: string;
  expiryDate: string;
  isFrozen?: boolean;
}

export function VirtualCard({
  cardNumber,
  expiryDate,
  isFrozen = false
}: VirtualCardProps) {
  return (
    <div className="bg-black text-white p-6 mb-6 relative overflow-hidden">
      {isFrozen && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
          <div className="text-lg uppercase tracking-widest text-white rotate-[-15deg] border-2 border-white px-4 py-2 font-semibold">
            Frozen
          </div>
        </div>
      )}
      
      {/* Black and white gradient element */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
        <div className="w-full h-full border-l border-t border-white"></div>
      </div>
      
      <div className="text-sm uppercase tracking-wider mb-8 font-light">Virtual Debit Card</div>
      <div className="text-xl mb-8 tracking-widest font-light">{cardNumber}</div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs mb-1 uppercase tracking-wider">Valid Thru</div>
          <div className="font-light">{expiryDate}</div>
        </div>
        <div className="text-sm uppercase tracking-widest font-semibold">Schwarzes Schild</div>
      </div>
    </div>
  );
}
