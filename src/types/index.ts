export type Role = 'admin' | 'viewer';
export type TransactionType = 'income' | 'expense';
export type SortDirection = 'asc' | 'desc';

export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Utilities'
  | 'Salary'
  | 'Freelance'
  | 'Entertainment'
  | 'Healthcare'
  | 'Rent'
  | 'Investment';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
  merchant: string;
}

export interface Filter {
  searchQuery: string;
  categories: Category[];
  type: TransactionType | 'all';
  dateRange: { start: string; end: string };
  sortField: keyof Transaction;
  sortDirection: SortDirection;
  page: number;
}

export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  avgDailySpend: number;
  topMerchant: { name: string; total: number };
  largestTransaction: Transaction;
  balanceTrend: { month: string; balance: number; income: number; expense: number }[];
  categoryBreakdown: { category: Category; amount: number; percentage: number }[];
  incomeChange: number;
  expenseChange: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export const CATEGORIES: Category[] = [
  'Food',
  'Transport',
  'Shopping',
  'Utilities',
  'Salary',
  'Freelance',
  'Entertainment',
  'Healthcare',
  'Rent',
  'Investment',
];

export const ITEMS_PER_PAGE = 10;
