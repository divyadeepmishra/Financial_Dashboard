import { create } from 'zustand';
import { Transaction } from '@/types';
import { transactions as mockTransactions } from '@/data/mockData';

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (txn: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: mockTransactions,

  addTransaction: (txn) =>
    set((state) => ({
      transactions: [
        { ...txn, id: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
        ...state.transactions,
      ],
    })),

  editTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
