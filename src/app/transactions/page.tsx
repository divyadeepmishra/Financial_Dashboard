'use client';

import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { FilterBar } from '@/components/transactions/FilterBar';
import { TransactionModal } from '@/components/transactions/TransactionModal';
import { useRoleStore } from '@/store/useRoleStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useFilterStore } from '@/store/useFilterStore';
import { Transaction } from '@/types';
import { exportToCSV } from '@/utils/formatters';
import { Plus, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TransactionsPage() {
  const { role } = useRoleStore();
  const { transactions } = useTransactionStore();
  const { searchQuery, categories, type, dateRange } = useFilterStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);

  const isAdmin = role === 'admin';

  const handleEdit = (txn: Transaction) => {
    setEditingTxn(txn);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingTxn(null);
  };

  const handleExport = () => {
    let filtered = [...transactions];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.merchant.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    if (categories.length > 0) {
      filtered = filtered.filter((t) => categories.includes(t.category));
    }
    if (type !== 'all') {
      filtered = filtered.filter((t) => t.type === type);
    }
    if (dateRange.start) {
      filtered = filtered.filter((t) => t.date >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter((t) => t.date <= dateRange.end);
    }
    exportToCSV(filtered);
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              All Transactions
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {transactions.length} total transactions
            </p>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </motion.button>
            </div>
          )}
        </div>

        {/* Filters */}
        <FilterBar />

        {/* Table */}
        <TransactionTable onEdit={handleEdit} />

        {/* FAB - Admin only */}
        {isAdmin && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setEditingTxn(null); setModalOpen(true); }}
            className="fixed bottom-20 md:bottom-8 right-8 w-14 h-14 rounded-full gold-gradient shadow-lg shadow-gold/20 flex items-center justify-center z-50"
            aria-label="Add transaction"
          >
            <Plus className="w-6 h-6 text-charcoal" />
          </motion.button>
        )}

        {/* Modal */}
        <TransactionModal
          open={modalOpen}
          onClose={handleClose}
          editingTransaction={editingTxn}
        />
      </div>
    </PageWrapper>
  );
}
