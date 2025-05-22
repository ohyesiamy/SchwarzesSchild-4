import { formatCurrency, formatDate } from "@/lib/utils";

interface Transaction {
  id: number;
  name: string;
  date: Date;
  amount: number;
  currency: string;
  category: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  showCategory?: boolean;
}

export function TransactionItem({ 
  transaction, 
  showCategory = false 
}: TransactionItemProps) {
  return (
    <div className="border-b border-black py-4 mb-0 hover:bg-secondary transition-colors">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{transaction.name}</div>
          <div className="text-xs text-muted-foreground mt-1">{formatDate(transaction.date)}</div>
          {showCategory && (
            <div className="text-xs uppercase tracking-wider mt-1">{transaction.category}</div>
          )}
        </div>
        <div className="font-semibold">
          {formatCurrency(transaction.amount, transaction.currency)}
        </div>
      </div>
    </div>
  );
}
