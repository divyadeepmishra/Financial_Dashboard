import { create } from 'zustand';
import { Category, Filter, SortDirection, TransactionType } from '@/types';

interface FilterStore extends Filter {
  setSearchQuery: (query: string) => void;
  setCategories: (categories: Category[]) => void;
  toggleCategory: (category: Category) => void;
  setType: (type: TransactionType | 'all') => void;
  setDateRange: (range: { start: string; end: string }) => void;
  setSortField: (field: keyof import('@/types').Transaction) => void;
  setSortDirection: (dir: SortDirection) => void;
  toggleSort: (field: keyof import('@/types').Transaction) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const initialState: Filter = {
  searchQuery: '',
  categories: [],
  type: 'all',
  dateRange: { start: '', end: '' },
  sortField: 'date',
  sortDirection: 'desc',
  page: 1,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,

  setSearchQuery: (searchQuery) => set({ searchQuery, page: 1 }),

  setCategories: (categories) => set({ categories, page: 1 }),

  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.includes(category)
        ? state.categories.filter((c) => c !== category)
        : [...state.categories, category],
      page: 1,
    })),

  setType: (type) => set({ type, page: 1 }),

  setDateRange: (dateRange) => set({ dateRange, page: 1 }),

  setSortField: (sortField) => set({ sortField }),

  setSortDirection: (sortDirection) => set({ sortDirection }),

  toggleSort: (field) =>
    set((state) => ({
      sortField: field,
      sortDirection:
        state.sortField === field
          ? state.sortDirection === 'asc'
            ? 'desc'
            : 'asc'
          : 'desc',
    })),

  setPage: (page) => set({ page }),

  resetFilters: () => set(initialState),
}));
