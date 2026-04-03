'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function CardSkeleton() {
  return (
    <div className="glass-card rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24 bg-secondary" />
        <Skeleton className="h-8 w-8 rounded-lg bg-secondary" />
      </div>
      <Skeleton className="h-8 w-32 bg-secondary" />
      <Skeleton className="h-3 w-20 bg-secondary" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: Readonly<{ rows?: number }>) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 px-4">
        {[120, 160, 100, 80, 100].map((w, i) => (
          <Skeleton key={i} className="h-4 bg-secondary" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-3 rounded-lg bg-secondary/20">
          {[120, 160, 100, 80, 100].map((w, j) => (
            <Skeleton key={j} className="h-4 bg-secondary" style={{ width: w }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass-card rounded-xl p-6 space-y-4">
      <Skeleton className="h-5 w-40 bg-secondary" />
      <div className="flex items-end gap-2 h-48">
        {[60, 80, 45, 90, 70, 85].map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 bg-secondary rounded-t-md"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
