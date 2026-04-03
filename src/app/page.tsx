'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { BalanceTrendChart } from '@/components/dashboard/BalanceTrendChart';
import { SpendingPieChart } from '@/components/dashboard/SpendingPieChart';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { useTransactionStore } from '@/store/useTransactionStore';
import { calculateSummary, formatCurrency } from '@/utils/formatters';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

export default function DashboardPage() {
  const { transactions } = useTransactionStore();
  const summary = calculateSummary(transactions);

  const cards = [
    {
      title: 'Total Balance',
      value: summary.totalBalance,
      change: summary.incomeChange - summary.expenseChange,
      icon: Wallet,
      color: '#D4A853',
    },
    {
      title: 'Monthly Income',
      value: summary.monthlyIncome,
      change: summary.incomeChange,
      icon: TrendingUp,
      color: '#2DD4A8',
    },
    {
      title: 'Monthly Expenses',
      value: summary.monthlyExpenses,
      change: summary.expenseChange,
      icon: TrendingDown,
      color: '#F43F5E',
    },
    {
      title: 'Savings Rate',
      value: summary.savingsRate,
      change: summary.savingsRate > 20 ? 5.2 : -3.1,
      icon: PiggyBank,
      color: '#6366F1',
    },
  ];

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <SummaryCard
              key={card.title}
              title={card.title}
              value={card.value}
              format={(v) =>
                card.title === 'Savings Rate'
                  ? `${v.toFixed(1)}%`
                  : formatCurrency(v)
              }
              change={card.change}
              icon={card.icon}
              index={i}
              accentColor={card.color}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <BalanceTrendChart data={summary.balanceTrend} />
          </div>
          <div className="lg:col-span-2">
            <SpendingPieChart data={summary.categoryBreakdown} />
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats
          avgDailySpend={summary.avgDailySpend}
          topMerchant={summary.topMerchant}
          largestTransaction={summary.largestTransaction}
        />
      </div>
    </PageWrapper>
  );
}
