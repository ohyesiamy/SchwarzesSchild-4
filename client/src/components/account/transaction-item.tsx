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
    <div className="border-2 border-black p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-playfair font-bold">{transaction.name}</div>
          <div className="text-sm">{formatDate(transaction.date)}</div>
          {showCategory && (
            <div className="text-sm">{transaction.category}</div>
          )}
        </div>
        <div className="font-playfair font-bold">
          {formatCurrency(transaction.amount, transaction.currency)}
        </div>
      </div>
    </div>
  );
}
