'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Transaction, ITEMS_PER_PAGE } from '@/types';
import { useFilterStore } from '@/store/useFilterStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency, formatDate, getCategoryColor, getCategoryIcon } from '@/utils/formatters';
import { EmptyState } from '@/components/shared/EmptyState';

interface TransactionTableProps {
  onEdit: (txn: Transaction) => void;
}

export function TransactionTable({ onEdit }: Readonly<TransactionTableProps>) {
  const { transactions, deleteTransaction } = useTransactionStore();
  const { role } = useRoleStore();
  const {
    searchQuery,
    categories,
    type,
    dateRange,
    sortField,
    sortDirection,
    page,
    toggleSort,
    setPage,
    resetFilters,
  } = useFilterStore();

  const isAdmin = role === 'admin';

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.merchant.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (categories.length > 0) {
      result = result.filter((t) => categories.includes(t.category));
    }

    if (type !== 'all') {
      result = result.filter((t) => t.type === type);
    }

    if (dateRange.start) {
      result = result.filter((t) => t.date >= dateRange.start);
    }
    if (dateRange.end) {
      result = result.filter((t) => t.date <= dateRange.end);
    }

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [transactions, searchQuery, categories, type, dateRange, sortField, sortDirection]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const SortButton = ({ field, children }: { field: keyof Transaction; children: React.ReactNode }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-1 hover:text-foreground transition-colors"
    >
      {children}
      {sortField === field ? (
        sortDirection === 'asc' ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-40" />
      )}
    </button>
  );

  if (filtered.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="Try adjusting your filters or search query to find what you're looking for."
        actionLabel="Clear Filters"
        onAction={resetFilters}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  <SortButton field="date">Date</SortButton>
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  <SortButton field="merchant">Merchant</SortButton>
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  <SortButton field="category">Category</SortButton>
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  <SortButton field="type">Type</SortButton>
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-right">
                  <SortButton field="amount">Amount</SortButton>
                </TableHead>
                {isAdmin && (
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-right w-20">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((txn, i) => {
                const CatIcon = getCategoryIcon(txn.category);
                return (
                  <motion.tr
                    key={txn.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group border-border hover:bg-accent/50 transition-colors"
                  >
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(txn.date)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-foreground">{txn.merchant}</p>
                        <p className="text-xs text-muted-foreground">{txn.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="flex items-center w-fit gap-1.5 text-xs px-2 py-0.5"
                        style={{
                          backgroundColor: `${getCategoryColor(txn.category)}15`,
                          color: getCategoryColor(txn.category),
                        }}
                      >
                        <CatIcon className="w-3 h-3" />
                        {txn.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                          txn.type === 'income'
                            ? 'text-teal bg-teal/10'
                            : 'text-rose bg-rose/10'
                        }`}
                      >
                        {txn.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`text-sm font-semibold tabular-nums ${
                          txn.type === 'income' ? 'text-teal' : 'text-rose'
                        }`}
                      >
                        {txn.type === 'income' ? '+' : ''}
                        {formatCurrency(txn.amount)}
                      </span>
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEdit(txn)}
                            className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Edit transaction"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteTransaction(txn.id)}
                            className="p-1.5 rounded-md hover:bg-rose/10 text-muted-foreground hover:text-rose transition-colors"
                            aria-label="Delete transaction"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    )}
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const p = i + 1;
              return (
                <Button
                  key={p}
                  variant={page === p ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 p-0 text-xs ${
                    page === p ? 'bg-primary text-primary-foreground' : ''
                  }`}
                >
                  {p}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
