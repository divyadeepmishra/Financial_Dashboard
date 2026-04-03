'use client';

import { motion } from 'framer-motion';
import { Store } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { Transaction } from '@/types';

interface TopMerchantsProps {
  transactions: Transaction[];
  index: number;
}

export function TopMerchants({ transactions, index }: Readonly<TopMerchantsProps>) {
  const merchantSpend = new Map<string, number>();
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      merchantSpend.set(t.merchant, (merchantSpend.get(t.merchant) || 0) + Math.abs(t.amount));
    });

  const top3 = Array.from(merchantSpend.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const maxSpend = top3[0]?.[1] || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card glass-card-hover rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center">
          <Store className="w-4.5 h-4.5 text-gold" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Top Merchants
          </p>
          <p className="text-sm font-semibold text-foreground">By total spend</p>
        </div>
      </div>

      <div className="space-y-3">
        {top3.map(([name, total], i) => (
          <div key={name} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gold w-4">{i + 1}.</span>
                <span className="text-sm text-foreground">{name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden ml-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(total / maxSpend) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                className="h-full rounded-full bg-gold/60"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
