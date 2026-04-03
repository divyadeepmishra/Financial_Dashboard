'use client';

import { Bell, Shield, TrendingUp, Info } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const mockNotifications = [
  {
    id: '1',
    title: 'Large Transaction',
    description: 'A transaction of ₹45,000 at Apple Store was detected.',
    time: '2 mins ago',
    icon: Shield,
    color: 'text-rose',
    bg: 'bg-rose/10',
    unread: true,
  },
  {
    id: '2',
    title: 'Monthly Budget',
    description: "You've reached 85% of your food budget for March.",
    time: '2 hours ago',
    icon: TrendingUp,
    color: 'text-gold',
    bg: 'bg-gold/10',
    unread: true,
  },
  {
    id: '3',
    title: 'Salary Credited',
    description: 'Your monthly salary has been successfully credited.',
    time: '5 hours ago',
    icon: Bell,
    color: 'text-teal',
    bg: 'bg-teal/10',
    unread: false,
  },
  {
    id: '4',
    title: 'Security Alert',
    description: 'New login detected from a Chrome browser on Windows.',
    time: '1 day ago',
    icon: Info,
    color: 'text-gold',
    unread: false,
  },
];

export function NotificationsDropdown() {
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-105 cursor-pointer outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose rounded-full animate-pulse" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[340px] max-w-[95vw] sm:w-[380px] bg-background/95 backdrop-blur-2xl p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-border/50 rounded-xl z-50"
      >
        <div className="flex items-center justify-between px-2 py-2">
          <DropdownMenuLabel className="font-heading text-lg font-semibold gold-text">
            Notifications
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20">
              {unreadCount} New
            </Badge>
          )}
        </div>
        <DropdownMenuSeparator className="bg-border/50" />
        <div className="max-h-[300px] overflow-y-auto scrollbar-thin py-1">
          {mockNotifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-accent/50 rounded-lg transition-colors mb-1"
            >
              <div className="flex w-full items-start gap-3">
                <div className={`p-2 rounded-full ${notification.bg || 'bg-accent'} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <notification.icon className={`w-4 h-4 ${notification.color}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">
                      {notification.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {notification.description}
                  </p>
                </div>
                {notification.unread && (
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem className="w-full text-center justify-center p-2 text-xs font-medium text-gold hover:text-gold-light cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
