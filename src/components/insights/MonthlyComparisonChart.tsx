'use client';

import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { MonthlyData } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface MonthlyComparisonChartProps {
  data: MonthlyData[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{value: number; dataKey: string}>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg p-3 shadow-xl border border-border">
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm font-medium">
          <span className={entry.dataKey === 'income' ? 'text-teal' : 'text-rose'}>
            {entry.dataKey === 'income' ? 'Income' : 'Expenses'}:{' '}
            {formatCurrency(entry.value)}
          </span>
        </p>
      ))}
    </div>
  );
}

export function MonthlyComparisonChart({ data }: Readonly<MonthlyComparisonChartProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">Monthly Comparison</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Income vs Expenses over 6 months</p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
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
            <Legend
              wrapperStyle={{ fontSize: 12, color: '#8A8578' }}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              dataKey="income"
              fill="#2DD4A8"
              radius={[4, 4, 0, 0]}
              animationDuration={1200}
            />
            <Bar
              dataKey="expense"
              fill="#F43F5E"
              radius={[4, 4, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
