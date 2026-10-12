'use client';

import React from 'react';
import { CheckCircle, Clock, FolderKanban, TrendingUp, LucideIcon } from 'lucide-react';

interface StatItem {
  id: string;
  title: string;
  value: string | number;
  supportingText: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badge?: string;
}

interface StatsCardProps {
  stats?: StatItem[];
}

export function StatsCard({ stats }: StatsCardProps) {
  const defaultStats: StatItem[] = [
    {
      id: 'stat-1',
      title: 'Tasks Completed',
      value: '12',
      supportingText: 'Tasks completed this week',
      icon: CheckCircle,
      iconBg: 'bg-lavender',
      iconColor: 'text-primary',
      badge: '+3 today'
    },
    {
      id: 'stat-2',
      title: 'Study Hours',
      value: '18.5h',
      supportingText: 'Time invested this week',
      icon: Clock,
      iconBg: 'bg-blueAccent-soft',
      iconColor: 'text-accent-blue',
      badge: '92% goal'
    },
    {
      id: 'stat-3',
      title: 'Active Projects',
      value: '4',
      supportingText: 'Projects in progress',
      icon: FolderKanban,
      iconBg: 'bg-pinkAccent-soft',
      iconColor: 'text-pinkAccent-dark',
      badge: '2 on track'
    },
    {
      id: 'stat-4',
      title: 'Weekly Progress',
      value: '78%',
      supportingText: 'Your weekly goal pace',
      icon: TrendingUp,
      iconBg: 'bg-[#E5F5EC]',
      iconColor: 'text-success',
      badge: 'Consistent'
    },
  ];

  const items = stats || defaultStats;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-borderBase/80 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-text-secondary truncate">
                {item.title}
              </span>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}
              >
                <Icon className="w-4 h-4 stroke-[2]" />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-[28px] font-extrabold text-text-main tracking-tight leading-none">
                  {item.value}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-lavender text-primary">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-text-secondary mt-1.5 leading-tight">
                {item.supportingText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
