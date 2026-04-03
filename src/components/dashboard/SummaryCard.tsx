'use client';

import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { AnimatedNumber } from '@/components/shared/AnimatedNumber';

interface SummaryCardProps {
  title: string;
  value: number;
  format: (v: number) => string;
  change: number;
  icon: LucideIcon;
  index: number;
  accentColor?: string;
}

export function SummaryCard({
  title,
  value,
  format,
  change,
  icon: Icon,
  index,
  accentColor = '#D4A853',
}: Readonly<SummaryCardProps>) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="glass-card glass-card-hover rounded-xl p-5 flex flex-col gap-4 cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color: accentColor }} />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-heading font-bold text-foreground tracking-tight">
            <AnimatedNumber value={value} format={format} />
          </div>
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${
            isPositive
              ? 'text-teal bg-teal/10'
              : 'text-rose bg-rose/10'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{Math.abs(change).toFixed(1)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
