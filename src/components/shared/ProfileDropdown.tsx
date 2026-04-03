'use client';

import {
  User,
  Settings,
  CreditCard,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRoleStore } from '@/store/useRoleStore';

export function ProfileDropdown() {
  const { role } = useRoleStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative group flex items-center justify-center w-10 h-10 rounded-full gold-gradient p-[1px] hover:scale-105 transition-all duration-300 cursor-pointer outline-none"
        aria-label="Profile"
      >
        <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-transparent">
          {/* Using generic person logo instead of custom image */}
          <User className="w-5 h-5 text-gold group-hover:text-charcoal transition-colors duration-300" />
        </div>
        {/* Subtle outer glow on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md gold-gradient -z-10 transition-opacity" />
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-[260px] max-w-[95vw] sm:w-[280px] bg-background/95 backdrop-blur-2xl p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-border/50 rounded-xl z-50"
      >
        <div className="flex flex-col gap-0.5 px-3 py-3 rounded-lg warm-gradient mb-2">
          <DropdownMenuLabel className="p-0 text-sm font-semibold text-foreground">
            User Name
          </DropdownMenuLabel>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            {role}
          </p>
        </div>
        
        <DropdownMenuSeparator className="bg-border/50" />
        
        <div className="py-1">
          <DropdownMenuItem className="flex items-center justify-between p-2.5 cursor-pointer focus:bg-accent/50 rounded-lg group transition-colors">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
              <span className="text-sm">Account</span>
            </div>
            <ChevronRight className="w-3 h-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center justify-between p-2.5 cursor-pointer focus:bg-accent/50 rounded-lg group transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
              <span className="text-sm">Settings</span>
            </div>
            <ChevronRight className="w-3 h-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center justify-between p-2.5 cursor-pointer focus:bg-accent/50 rounded-lg group transition-colors">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
              <span className="text-sm">Security</span>
            </div>
            <ChevronRight className="w-3 h-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center justify-between p-2.5 cursor-pointer focus:bg-accent/50 rounded-lg group transition-colors">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
              <span className="text-sm">Billing</span>
            </div>
            <ChevronRight className="w-3 h-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="bg-border/50" />

        <DropdownMenuItem className="flex items-center gap-3 p-2.5 cursor-pointer focus:bg-rose/10 text-rose rounded-lg transition-colors mt-1">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
