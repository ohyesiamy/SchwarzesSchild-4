import { formatCurrency } from "@/lib/utils";

interface Account {
  id: number;
  name: string;
  currency: string;
  balance: number;
}

interface AccountCardProps {
  account: Account;
  onClick?: () => void;
}

export function AccountCard({ account, onClick }: AccountCardProps) {
  return (
    <div 
      className="border-2 border-black p-6 cursor-pointer hover:bg-black hover:text-white transition-sharp"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg">{account.name}</span>
        <span className="text-lg font-bold">{account.currency}</span>
      </div>
      <div className="text-3xl font-playfair font-bold">
        {formatCurrency(account.balance, account.currency)}
      </div>
    </div>
  );
}
