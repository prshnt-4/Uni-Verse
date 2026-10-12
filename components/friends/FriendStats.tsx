'use client';

import React from 'react';
import { CheckCircle2, Clock, FolderKanban, TrendingUp } from 'lucide-react';
import { Friend } from '@/lib/data/friends';

interface FriendStatsProps {
  friend: Friend;
}

export function FriendStats({ friend }: FriendStatsProps) {
  const statItems = [
    {
      title: 'Tasks Completed',
      value: friend.tasksCompleted,
      subtitle: 'Finished this semester',
      icon: CheckCircle2,
      iconBg: 'bg-lavender',
      iconColor: 'text-primary',
    },
    {
      title: 'Study Hours',
      value: `${friend.studyHours}h`,
      subtitle: 'Dedicated deep focus',
      icon: Clock,
      iconBg: 'bg-blueAccent-soft',
      iconColor: 'text-accent-blue',
    },
    {
      title: 'Active Projects',
      value: friend.activeProjects,
      subtitle: 'Collaborative sprints',
      icon: FolderKanban,
      iconBg: 'bg-pinkAccent-soft',
      iconColor: 'text-pinkAccent-dark',
    },
    {
      title: 'Productivity Score',
      value: `${friend.productivityScore}%`,
      subtitle: 'Weekly consistency rank',
      icon: TrendingUp,
      iconBg: 'bg-[#E5F5EC]',
      iconColor: 'text-success',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-borderBase/80 shadow-soft hover:shadow-card transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-text-secondary">
                {item.title}
              </span>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}
              >
                <Icon className="w-4 h-4 stroke-[2]" />
              </div>
            </div>

            <div className="mt-3">
              <span className="text-2xl font-extrabold text-text-main tracking-tight leading-none block">
                {item.value}
              </span>
              <p className="text-[11px] text-text-secondary mt-1.5 leading-tight">
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
