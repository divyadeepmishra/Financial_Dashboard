import { Category, DashboardSummary, MonthlyData, Transaction } from '@/types';
import {
  Utensils, Car, ShoppingBag, Zap, Briefcase, Code2,
  Gamepad2, HeartPulse, Home, TrendingUp,
} from 'lucide-react';

export function formatCurrency(amount: number, currency = 'INR'): string {
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(absAmount);
  return amount < 0 ? `-${formatted}` : formatted;
}

export function formatDate(
  dateStr: string,
  format: 'short' | 'long' | 'relative' = 'short'
): string {
  const date = new Date(dateStr);
  if (format === 'short') {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
  if (format === 'long') {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  // relative
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

const categoryColors: Record<Category, string> = {
  Food: '#F59E0B',
  Transport: '#3B82F6',
  Shopping: '#EC4899',
  Utilities: '#8B5CF6',
  Salary: '#10B981',
  Freelance: '#2DD4A8',
  Entertainment: '#F97316',
  Healthcare: '#EF4444',
  Rent: '#6366F1',
  Investment: '#D4A853',
};

export function getCategoryColor(category: Category): string {
  return categoryColors[category] || '#64748B';
}

const categoryIcons: Record<Category, typeof Utensils> = {
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Utilities: Zap,
  Salary: Briefcase,
  Freelance: Code2,
  Entertainment: Gamepad2,
  Healthcare: HeartPulse,
  Rent: Home,
  Investment: TrendingUp,
};

export function getCategoryIcon(category: Category) {
  return categoryIcons[category] || Briefcase;
}

export function getMonthKey(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function getMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-');
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
}

export function calculateMonthlyData(txns: Transaction[]): MonthlyData[] {
  const monthMap = new Map<string, { income: number; expense: number }>();

  txns.forEach((t) => {
    const key = getMonthKey(t.date);
    const current = monthMap.get(key) || { income: 0, expense: 0 };
    if (t.type === 'income') {
      current.income += t.amount;
    } else {
      current.expense += Math.abs(t.amount);
    }
    monthMap.set(key, current);
  });

  const sorted = Array.from(monthMap.entries()).sort(([a], [b]) => a.localeCompare(b));
  return sorted.map(([key, data]) => ({
    month: getMonthLabel(key),
    income: data.income,
    expense: data.expense,
    savings: data.income - data.expense,
  }));
}

export function calculateSummary(txns: Transaction[]): DashboardSummary {
  const totalIncome = txns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = txns.filter((t) => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalBalance = totalIncome - totalExpense;

  // Current month (last month in data)
  const sortedDates = txns.map((t) => t.date).sort();
  const latestDate = sortedDates[sortedDates.length - 1];
  const currentMonthKey = getMonthKey(latestDate);
  const prevMonthDate = new Date(latestDate);
  prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
  const prevMonthKey = getMonthKey(prevMonthDate.toISOString().slice(0, 10));

  const currentMonthTxns = txns.filter((t) => getMonthKey(t.date) === currentMonthKey);
  const prevMonthTxns = txns.filter((t) => getMonthKey(t.date) === prevMonthKey);

  const monthlyIncome = currentMonthTxns
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);
  const monthlyExpenses = currentMonthTxns
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  const prevIncome = prevMonthTxns
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);
  const prevExpense = prevMonthTxns
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;

  // Average daily spend (current month)
  const daysInMonth = new Date(
    Number(currentMonthKey.split('-')[0]),
    Number(currentMonthKey.split('-')[1]),
    0
  ).getDate();
  const avgDailySpend = monthlyExpenses / daysInMonth;

  // Top merchant by spend
  const merchantSpend = new Map<string, number>();
  txns
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      merchantSpend.set(t.merchant, (merchantSpend.get(t.merchant) || 0) + Math.abs(t.amount));
    });
  let topMerchant = { name: 'N/A', total: 0 };
  merchantSpend.forEach((total, name) => {
    if (total > topMerchant.total) topMerchant = { name, total };
  });

  // Largest transaction
  const largestTransaction = [...txns].sort(
    (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
  )[0];

  // Balance trend
  const monthlyData = calculateMonthlyData(txns);
  let runningBalance = 0;
  const balanceTrend = monthlyData.map((m) => {
    runningBalance += m.income - m.expense;
    return {
      month: m.month,
      balance: runningBalance,
      income: m.income,
      expense: m.expense,
    };
  });

  // Category breakdown (expenses only, current month)
  const catMap = new Map<Category, number>();
  currentMonthTxns
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const cat = t.category;
      catMap.set(cat, (catMap.get(cat) || 0) + Math.abs(t.amount));
    });
  const categoryBreakdown = Array.from(catMap.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: monthlyExpenses > 0 ? (amount / monthlyExpenses) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  const incomeChange = prevIncome > 0 ? ((monthlyIncome - prevIncome) / prevIncome) * 100 : 0;
  const expenseChange = prevExpense > 0 ? ((monthlyExpenses - prevExpense) / prevExpense) * 100 : 0;

  return {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    savingsRate,
    avgDailySpend,
    topMerchant,
    largestTransaction,
    balanceTrend,
    categoryBreakdown,
    incomeChange,
    expenseChange,
  };
}

export function exportToCSV(txns: Transaction[]): void {
  const headers = ['Date', 'Merchant', 'Category', 'Type', 'Amount', 'Description'];
  const rows = txns.map((t) => [
    t.date,
    t.merchant,
    t.category,
    t.type,
    String(t.amount),
    t.description,
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
