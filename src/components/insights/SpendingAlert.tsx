'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface SpendingAlertProps {
  monthlyIncome: number;
  monthlyExpenses: number;
  index: number;
}

export function SpendingAlert({
  monthlyIncome,
  monthlyExpenses,
  index,
}: Readonly<SpendingAlertProps>) {
  const ratio = monthlyIncome > 0 ? (monthlyExpenses / monthlyIncome) * 100 : 0;
  const isWarning = ratio > 80;
  const isDanger = ratio > 95;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-xl p-5 border ${
        isDanger
          ? 'bg-rose/5 border-rose/20'
          : isWarning
          ? 'bg-gold/5 border-gold/20'
          : 'glass-card border-teal/20'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isDanger
              ? 'bg-rose/15'
              : isWarning
              ? 'bg-gold/15'
              : 'bg-teal/15'
          }`}
        >
          {isWarning ? (
            <AlertTriangle
              className={`w-4.5 h-4.5 ${isDanger ? 'text-rose' : 'text-gold'}`}
            />
          ) : (
            <CheckCircle className="w-4.5 h-4.5 text-teal" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            {isDanger
              ? 'Critical: Overspending'
              : isWarning
              ? 'Warning: High Spending'
              : 'Healthy Spending'}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isDanger
              ? `You've spent ${ratio.toFixed(0)}% of your income this month. Consider cutting non-essential expenses.`
              : isWarning
              ? `Expenses are at ${ratio.toFixed(0)}% of income. Monitor your spending closely.`
              : `Great job! You're spending ${ratio.toFixed(0)}% of your income, keeping savings healthy.`}
          </p>
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(ratio, 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full rounded-full ${
                isDanger ? 'bg-rose' : isWarning ? 'bg-gold' : 'bg-teal'
              }`}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">0%</span>
            <span className="text-[10px] text-muted-foreground font-medium">
              {ratio.toFixed(0)}% of income spent
            </span>
            <span className="text-[10px] text-muted-foreground">100%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
