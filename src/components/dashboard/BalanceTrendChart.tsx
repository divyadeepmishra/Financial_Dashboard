'use client';

import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';

interface BalanceTrendChartProps {
  data: { month: string; balance: number; income: number; expense: number }[];
}

function CustomTooltip({ active, payload, label }: {active?: boolean; payload?: Array<{value: number; dataKey: string}>; label?: string}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg p-3 shadow-xl border border-border">
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm font-medium text-foreground">
          {entry.dataKey === 'balance' ? 'Balance' : entry.dataKey === 'income' ? 'Income' : 'Expense'}:{' '}
          <span className={entry.dataKey === 'balance' ? 'text-gold' : entry.dataKey === 'income' ? 'text-teal' : 'text-rose'}>
            {formatCurrency(entry.value)}
          </span>
        </p>
      ))}
    </div>
  );
}

export function BalanceTrendChart({ data }: Readonly<BalanceTrendChartProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Balance Trend</h3>
          <p className="text-xs text-muted-foreground mt-0.5">6-month overview</p>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A853" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#D4A853" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,83,0.06)" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#8A8578', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#8A8578', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#D4A853"
              strokeWidth={2}
              fill="url(#balanceGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
