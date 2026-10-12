'use client';

import React from 'react';
import { FolderKanban, CheckCircle2 } from 'lucide-react';
import { Friend } from '@/lib/data/friends';

interface FriendProjectsProps {
  friend: Friend;
}

export function FriendProjects({ friend }: FriendProjectsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#E5F5EC] text-success';
      case 'In Progress':
        return 'bg-lavender text-primary';
      case 'Review':
        return 'bg-[#FEF3D6] text-[#B87A1E]';
      default:
        return 'bg-blueAccent-soft text-blueAccent-dark';
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
      <div className="flex items-center justify-between pb-3 border-b border-borderBase/60 mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-text-main">Current Projects</h3>
          <p className="text-[11px] text-text-secondary">Active initiatives and repositories</p>
        </div>
        <span className="text-[11px] font-bold text-primary px-2.5 py-0.5 rounded-full bg-lavender">
          {friend.projects.length} Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {friend.projects.map((proj) => (
          <div
            key={proj.id}
            className="p-4 rounded-2xl border border-borderBase/80 hover:border-primary/40 hover:shadow-soft transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-lavender-light text-primary">
                  {proj.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadge(
                    proj.status
                  )}`}
                >
                  {proj.status}
                </span>
              </div>

              <h4 className="text-[14px] font-bold text-text-main line-clamp-1">
                {proj.title}
              </h4>
              <p className="text-[11px] text-text-secondary mt-1 line-clamp-2 leading-relaxed">
                {proj.description}
              </p>
            </div>

            {/* Progress bar */}
            <div className="mt-4 pt-2.5 border-t border-borderBase/50">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-text-secondary font-medium">Sprint Completion</span>
                <span className="font-bold text-primary">{proj.progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-lavender overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${proj.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
