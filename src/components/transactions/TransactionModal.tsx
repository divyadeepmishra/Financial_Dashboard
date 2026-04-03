'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES, Category, Transaction, TransactionType } from '@/types';
import { useTransactionStore } from '@/store/useTransactionStore';

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  editingTransaction?: Transaction | null;
}

export function TransactionModal({
  open,
  onClose,
  editingTransaction,
}: Readonly<TransactionModalProps>) {
  const { addTransaction, editTransaction } = useTransactionStore();
  const isEditing = !!editingTransaction;

  const [form, setForm] = useState({
    date: '',
    merchant: '',
    description: '',
    category: '' as Category | '',
    type: 'expense' as TransactionType,
    amount: '',
  });

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        date: editingTransaction.date,
        merchant: editingTransaction.merchant,
        description: editingTransaction.description,
        category: editingTransaction.category,
        type: editingTransaction.type,
        amount: String(Math.abs(editingTransaction.amount)),
      });
    } else {
      setForm({
        date: new Date().toISOString().slice(0, 10),
        merchant: '',
        description: '',
        category: '',
        type: 'expense',
        amount: '',
      });
    }
  }, [editingTransaction, open]);

  const handleSubmit = () => {
    if (!form.date || !form.merchant || !form.category || !form.amount) return;
    const amount =
      form.type === 'expense'
        ? -Math.abs(Number(form.amount))
        : Math.abs(Number(form.amount));

    if (isEditing && editingTransaction) {
      editTransaction(editingTransaction.id, {
        date: form.date,
        merchant: form.merchant,
        description: form.description,
        category: form.category as Category,
        type: form.type,
        amount,
      });
    } else {
      addTransaction({
        date: form.date,
        merchant: form.merchant,
        description: form.description,
        category: form.category as Category,
        type: form.type,
        amount,
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditing ? 'Edit Transaction' : 'Add Transaction'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Date</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="h-9 bg-secondary/50 border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Type</label>
              <Select
                value={form.type}
                onValueChange={(v) => { if (v) setForm({ ...form, type: v as TransactionType }); }}
              >
                <SelectTrigger className="h-9 bg-secondary/50 border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Merchant</label>
            <Input
              value={form.merchant}
              onChange={(e) => setForm({ ...form, merchant: e.target.value })}
              placeholder="e.g., Swiggy, TechVista Solutions"
              className="h-9 bg-secondary/50 border-border text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Description</label>
            <Input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description..."
              className="h-9 bg-secondary/50 border-border text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Category</label>
              <Select
                value={form.category}
                onValueChange={(v) => { if (v) setForm({ ...form, category: v as Category }); }}
              >
                <SelectTrigger className="h-9 bg-secondary/50 border-border text-sm">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Amount (₹)</label>
              <Input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0"
                min="0"
                className="h-9 bg-secondary/50 border-border text-sm"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground hover:bg-gold-dim"
            disabled={!form.date || !form.merchant || !form.category || !form.amount}
          >
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
