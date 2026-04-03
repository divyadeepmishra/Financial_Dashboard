'use client';

import { motion } from 'framer-motion';
import { Calendar, Store, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { Transaction } from '@/types';

interface QuickStatsProps {
  avgDailySpend: number;
  topMerchant: { name: string; total: number };
  largestTransaction: Transaction;
}

export function QuickStats({
  avgDailySpend,
  topMerchant,
  largestTransaction,
}: Readonly<QuickStatsProps>) {
  const stats = [
    {
      icon: Calendar,
      label: 'Avg. Daily Spend',
      value: formatCurrency(avgDailySpend),
      color: '#D4A853',
    },
    {
      icon: Store,
      label: 'Top Merchant',
      value: topMerchant.name,
      subvalue: formatCurrency(topMerchant.total),
      color: '#2DD4A8',
    },
    {
      icon: Sparkles,
      label: 'Largest Transaction',
      value: largestTransaction.merchant,
      subvalue: formatCurrency(Math.abs(largestTransaction.amount)),
      color: '#F43F5E',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="glass-card glass-card-hover rounded-xl p-4 flex items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <Icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-sm font-semibold text-foreground truncate">{stat.value}</p>
              {stat.subvalue && (
                <p className="text-xs text-muted-foreground">{stat.subvalue}</p>
              )}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
