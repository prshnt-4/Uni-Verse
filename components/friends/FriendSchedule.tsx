'use client';

import React from 'react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { Friend } from '@/lib/data/friends';

interface FriendScheduleProps {
  friend: Friend;
}

export function FriendSchedule({ friend }: FriendScheduleProps) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Class':
        return 'bg-blueAccent-soft text-accent-blue';
      case 'Study':
        return 'bg-lavender text-primary';
      case 'Project':
        return 'bg-pinkAccent-soft text-pinkAccent-dark';
      default:
        return 'bg-[#FEF3D6] text-[#B87A1E]';
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
      <div className="flex items-center justify-between pb-3 border-b border-borderBase/60 mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-text-main">Upcoming Schedule</h3>
          <p className="text-[11px] text-text-secondary">Planned sessions and milestone dates</p>
        </div>
        <CalendarDays className="w-4 h-4 text-text-muted" />
      </div>

      <div className="space-y-3">
        {friend.schedule.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between p-3.5 rounded-2xl border border-borderBase/70 hover:bg-lavender-light/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
                <span className="text-[11px] font-bold text-text-main">{item.day}</span>
              </div>

              <h4 className="text-[13px] font-bold text-text-main mt-1.5">
                {item.title}
              </h4>

              <div className="flex items-center gap-3 mt-1 text-[11px] text-text-secondary">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary" />
                  {item.time}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1 text-text-muted">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
