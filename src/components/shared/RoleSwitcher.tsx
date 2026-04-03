'use client';

import { useRoleStore } from '@/store/useRoleStore';
import { Role } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Shield, Eye, ChevronDown } from 'lucide-react';

export function RoleSwitcher() {
  const { role, setRole } = useRoleStore();

  const roleConfig: Record<Role, { label: string; icon: typeof Shield; color: string }> = {
    admin: { label: 'Admin', icon: Shield, color: 'text-gold' },
    viewer: { label: 'Viewer', icon: Eye, color: 'text-teal' },
  };

  const current = roleConfig[role];
  const Icon = current.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        id="role-switcher"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
      >
        <Icon className={`w-3.5 h-3.5 ${current.color}`} />
        <span className="text-muted-foreground">Viewing as:</span>
        <span className={`font-medium ${current.color}`}>{current.label}</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {(Object.keys(roleConfig) as Role[]).map((r) => {
          const config = roleConfig[r];
          const RoleIcon = config.icon;
          return (
            <DropdownMenuItem
              key={r}
              onClick={() => setRole(r)}
              className={`flex items-center gap-2 ${role === r ? 'bg-accent' : ''}`}
            >
              <RoleIcon className={`w-3.5 h-3.5 ${config.color}`} />
              <span>{config.label}</span>
              {role === r && (
                <span className="ml-auto text-xs text-muted-foreground">Active</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
