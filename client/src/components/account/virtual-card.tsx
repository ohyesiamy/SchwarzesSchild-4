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
    <div className="bg-black text-white p-6 mb-4 relative overflow-hidden">
      {isFrozen && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="text-2xl font-playfair text-white rotate-[-15deg] border-4 border-white px-4 py-2">
            FROZEN
          </div>
        </div>
      )}
      <div className="font-playfair text-xl mb-6">Virtual Debit Card</div>
      <div className="font-playfair text-xl mb-4 tracking-wider">{cardNumber}</div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-sm mb-1">VALID THRU</div>
          <div>{expiryDate}</div>
        </div>
        <div className="text-xl">SCHWARZES SCHILD</div>
      </div>
    </div>
  );
}
