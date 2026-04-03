'use client';

import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { getCategoryColor, formatCurrency } from '@/utils/formatters';
import { Category } from '@/types';

interface SpendingPieChartProps {
  data: { category: Category; amount: number; percentage: number }[];
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { category: string; amount: number; percentage: number } }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-card rounded-lg p-3 shadow-xl border border-border">
      <p className="text-sm font-medium text-foreground">{d.category}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {formatCurrency(d.amount)} · {d.percentage.toFixed(1)}%
      </p>
    </div>
  );
}

export function SpendingPieChart({ data }: Readonly<SpendingPieChartProps>) {
  const totalSpend = data.reduce((s, d) => s + d.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Spending Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-0.5">This month by category</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="amount"
                animationDuration={1200}
                animationBegin={300}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={getCategoryColor(entry.category)}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-sm font-heading font-bold text-foreground">
              {formatCurrency(totalSpend)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-2 gap-2 w-full">
          {data.slice(0, 8).map((item) => (
            <div key={item.category} className="flex items-center gap-2 text-sm">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: getCategoryColor(item.category) }}
              />
              <span className="text-muted-foreground truncate text-xs">{item.category}</span>
              <span className="ml-auto text-foreground text-xs font-medium">
                {item.percentage.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
