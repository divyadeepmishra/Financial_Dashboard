'use client';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import { CATEGORIES, Category } from '@/types';
import { getCategoryColor } from '@/utils/formatters';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    categories,
    toggleCategory,
    type,
    setType,
    dateRange,
    setDateRange,
    resetFilters,
  } = useFilterStore();

  const [showFilters, setShowFilters] = useState(false);
  const hasActiveFilters = categories.length > 0 || type !== 'all' || dateRange.start || dateRange.end;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="transaction-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            className="pl-9 h-9 bg-secondary/50 border-border text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Type toggle */}
        <div className="flex items-center bg-secondary/50 rounded-lg p-0.5 text-sm">
          {(['all', 'income', 'expense'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-md capitalize transition-colors ${
                type === t
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
            showFilters || hasActiveFilters
              ? 'bg-primary/10 text-primary'
              : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
              {categories.length + (type !== 'all' ? 1 : 0) + (dateRange.start ? 1 : 0)}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Expanded filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="glass-card rounded-xl p-4 space-y-4">
              {/* Category pills */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                  Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat: Category) => {
                    const active = categories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className="transition-all"
                      >
                        <Badge
                          variant="secondary"
                          className={`cursor-pointer text-xs px-2.5 py-1 ${
                            active ? 'ring-1 ring-primary/50' : 'opacity-60 hover:opacity-100'
                          }`}
                          style={
                            active
                              ? {
                                  backgroundColor: `${getCategoryColor(cat)}20`,
                                  color: getCategoryColor(cat),
                                }
                              : {}
                          }
                        >
                          {cat}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date range */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                  Date Range
                </p>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                    className="h-8 text-xs bg-secondary/50 border-border"
                  />
                  <span className="text-muted-foreground self-center text-xs">to</span>
                  <Input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                    className="h-8 text-xs bg-secondary/50 border-border"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
