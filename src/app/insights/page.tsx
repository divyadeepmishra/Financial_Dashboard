'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { InsightCard } from '@/components/insights/InsightCard';
import { MonthlyComparisonChart } from '@/components/insights/MonthlyComparisonChart';
import { SpendingAlert } from '@/components/insights/SpendingAlert';
import { TopMerchants } from '@/components/insights/TopMerchants';
import { SavingsTrendChart } from '@/components/insights/SavingsTrendChart';
import { useTransactionStore } from '@/store/useTransactionStore';
import {
  calculateSummary,
  calculateMonthlyData,
  formatCurrency,
  getCategoryColor,
  getCategoryIcon,
} from '@/utils/formatters';
import { PieChart, Scale, TrendingUp } from 'lucide-react';

export default function InsightsPage() {
  const { transactions } = useTransactionStore();
  const summary = calculateSummary(transactions);
  const monthlyData = calculateMonthlyData(transactions);

  const topCategory = summary.categoryBreakdown[0];
  const TopCatIcon = topCategory ? getCategoryIcon(topCategory.category) : PieChart;

  const incomeExpenseRatio =
    summary.monthlyIncome > 0
      ? (summary.monthlyExpenses / summary.monthlyIncome) * 100
      : 0;

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Financial Insights
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Smart analytics based on your transaction history
          </p>
        </div>

        {/* Top row: insight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Highest spending category */}
          {topCategory && (
            <InsightCard
              title="Top Spending Category"
              value={topCategory.category}
              subtitle={`${formatCurrency(topCategory.amount)} · ${topCategory.percentage.toFixed(1)}% of expenses`}
              icon={TopCatIcon}
              color={getCategoryColor(topCategory.category)}
              index={0}
            >
              {/* Mini bar */}
              <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${topCategory.percentage}%`,
                    backgroundColor: getCategoryColor(topCategory.category),
                  }}
                />
              </div>
            </InsightCard>
          )}

          {/* Income vs Expense ratio */}
          <InsightCard
            title="Income vs Expense"
            value={`${incomeExpenseRatio.toFixed(0)}%`}
            subtitle={`${formatCurrency(summary.monthlyExpenses)} of ${formatCurrency(summary.monthlyIncome)}`}
            icon={Scale}
            color="#6366F1"
            index={1}
          >
            <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  incomeExpenseRatio > 80 ? 'bg-rose' : 'bg-teal'
                }`}
                style={{ width: `${Math.min(incomeExpenseRatio, 100)}%` }}
              />
            </div>
          </InsightCard>

          {/* Total savings */}
          <InsightCard
            title="Total Savings"
            value={formatCurrency(summary.totalBalance)}
            subtitle={`${summary.savingsRate.toFixed(1)}% savings rate this month`}
            icon={TrendingUp}
            color="#2DD4A8"
            index={2}
          />
        </div>

        {/* Budget Alert */}
        <SpendingAlert
          monthlyIncome={summary.monthlyIncome}
          monthlyExpenses={summary.monthlyExpenses}
          index={3}
        />

        {/* Charts + Top Merchants */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MonthlyComparisonChart data={monthlyData} />
          </div>
          <TopMerchants transactions={transactions} index={4} />
        </div>

        {/* Savings Trend */}
        <SavingsTrendChart data={monthlyData} />
      </div>
    </PageWrapper>
  );
}
