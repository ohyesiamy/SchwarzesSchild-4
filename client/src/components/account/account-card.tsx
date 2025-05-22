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
      className="card border border-black p-6 cursor-pointer hover:bg-black hover:text-white transition-colors"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm uppercase tracking-wider">{account.name}</span>
        <span className="text-sm font-semibold">{account.currency}</span>
      </div>
      <div className="text-2xl font-semibold mt-4">
        {formatCurrency(account.balance, account.currency)}
      </div>
    </div>
  );
}
