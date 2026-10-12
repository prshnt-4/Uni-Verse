'use client';

import React from 'react';
import { BookOpen, CheckCircle2, Award, FolderKanban, Clock } from 'lucide-react';
import { Friend, FriendActivity as FriendActivityType } from '@/lib/data/friends';

interface FriendActivityProps {
  friend: Friend;
}

export function FriendActivity({ friend }: FriendActivityProps) {
  const getActivityIcon = (type: FriendActivityType['type']) => {
    switch (type) {
      case 'study':
        return <BookOpen className="w-3.5 h-3.5 text-primary" />;
      case 'task':
        return <CheckCircle2 className="w-3.5 h-3.5 text-success" />;
      case 'goal':
        return <Award className="w-3.5 h-3.5 text-pinkAccent-dark" />;
      case 'project':
        return <FolderKanban className="w-3.5 h-3.5 text-accent-blue" />;
    }
  };

  const getActivityBg = (type: FriendActivityType['type']) => {
    switch (type) {
      case 'study':
        return 'bg-lavender';
      case 'task':
        return 'bg-[#E5F5EC]';
      case 'goal':
        return 'bg-pinkAccent-soft';
      case 'project':
        return 'bg-blueAccent-soft';
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
      <div className="flex items-center justify-between pb-3 border-b border-borderBase/60 mb-4">
        <h3 className="text-[15px] font-bold text-text-main">Recent Activity</h3>
        <span className="text-[11px] text-text-secondary font-medium">
          {friend.activities.length} updates logged
        </span>
      </div>

      <div className="space-y-4">
        {friend.activities.map((act) => (
          <div key={act.id} className="flex items-start gap-3.5 group">
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${getActivityBg(
                act.type
              )}`}
            >
              {getActivityIcon(act.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-[13px] font-bold text-text-main leading-snug truncate">
                  {act.title}
                </h4>
                <span className="text-[10px] text-text-muted shrink-0 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {act.timestamp}
                </span>
              </div>
              <p className="text-[12px] text-text-secondary mt-0.5 leading-relaxed">
                {act.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
