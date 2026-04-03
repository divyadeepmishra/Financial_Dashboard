'use client';

import { usePathname } from 'next/navigation';
import { RoleSwitcher } from '@/components/shared/RoleSwitcher';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { NotificationsDropdown } from '@/components/shared/NotificationsDropdown';
import { ProfileDropdown } from '@/components/shared/ProfileDropdown';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
};

export function Topbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {/* Mobile logo */}
        <div className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <span className="text-xs font-bold text-charcoal">Z</span>
          </div>
        </div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <NotificationsDropdown />
        <ThemeToggle />
        <RoleSwitcher />
        <ProfileDropdown />
      </div>
    </header>
  );
}
