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
import { MonthlyData } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface SavingsTrendChartProps {
  data: MonthlyData[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{value: number}>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg p-3 shadow-xl border border-border">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-medium text-teal">
        Savings: {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export function SavingsTrendChart({ data }: Readonly<SavingsTrendChartProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">Savings Trend</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Monthly savings over 6 months</p>
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2DD4A8" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#2DD4A8" stopOpacity={0} />
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
              dataKey="savings"
              stroke="#2DD4A8"
              strokeWidth={2}
              fill="url(#savingsGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
