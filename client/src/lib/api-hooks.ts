import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Account, Transaction, Card /*, Exchange, Settings */ } from "@shared/schema";

// API base function with auth
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('schwarzesschild_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as any,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('schwarzesschild_token');
      window.location.href = '/auth';
    }
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

// Accounts
export const useAccounts = () => {
  return useQuery<Account[]>({
    queryKey: ['accounts'],
    queryFn: () => authFetch('/api/accounts'),
  });
};

// UNUSED HOOK - Commented out for cleanup
// export const useUpdateAccountBalance = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, balance }: { id: number; balance: number }) =>
//       authFetch(`/api/accounts/${id}`, {
//         method: 'PATCH',
//         body: JSON.stringify({ balance }),
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['accounts'] });
//     },
//   });
// };

// Transactions
export const useTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: () => authFetch('/api/transactions'),
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (transaction: Partial<Transaction>) =>
      authFetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(transaction),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

// Cards
export const useCards = () => {
  return useQuery<Card[]>({
    queryKey: ['cards'],
    queryFn: () => authFetch('/api/cards'),
  });
};

// UNUSED HOOK - Commented out for cleanup
// export const useCreateCard = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (card: Partial<Card>) =>
//       authFetch('/api/cards', {
//         method: 'POST',
//         body: JSON.stringify(card),
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['cards'] });
//     },
//   });
// };

export const useFreezeCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isFrozen }: { id: number; isFrozen: boolean }) =>
      authFetch(`/api/cards/${id}/freeze`, {
        method: 'PATCH',
        body: JSON.stringify({ isFrozen }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
};

// UNUSED HOOKS - Commented out for cleanup
// // Exchanges
// export const useExchanges = () => {
//   return useQuery<Exchange[]>({
//     queryKey: ['exchanges'],
//     queryFn: () => authFetch('/api/exchanges'),
//   });
// };
// 
// export const useCreateExchange = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (exchange: {
//       fromCurrency: string;
//       toCurrency: string;
//       fromAmount: number;
//       toAmount: number;
//       exchangeRate: number;
//     }) =>
//       authFetch('/api/exchanges', {
//         method: 'POST',
//         body: JSON.stringify(exchange),
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['exchanges'] });
//       queryClient.invalidateQueries({ queryKey: ['accounts'] });
//     },
//   });
// };

// UNUSED HOOKS - Commented out for cleanup
// // Settings
// export const useSettings = () => {
//   return useQuery<Settings>({
//     queryKey: ['settings'],
//     queryFn: () => authFetch('/api/settings'),
//   });
// };
// 
// export const useUpdateSettings = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (settings: Partial<Settings>) =>
//       authFetch('/api/settings', {
//         method: 'PATCH',
//         body: JSON.stringify(settings),
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['settings'] });
//     },
//   });
// };