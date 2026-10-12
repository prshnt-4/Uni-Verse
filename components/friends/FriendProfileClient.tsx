'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Friend } from '@/lib/data/friends';
import { FriendProfileCard } from '@/components/friends/FriendProfileCard';
import { FriendStats } from '@/components/friends/FriendStats';
import { FriendProductivityChart } from '@/components/friends/FriendProductivityChart';
import { FriendActivity } from '@/components/friends/FriendActivity';
import { FriendProjects } from '@/components/friends/FriendProjects';
import { FriendSchedule } from '@/components/friends/FriendSchedule';

interface FriendProfileClientProps {
  friend: Friend;
}

export function FriendProfileClient({ friend }: FriendProfileClientProps) {
  return (
    <DashboardLayout showRightPanel={false}>
      <div className="space-y-6 animate-fade-in pb-12 max-w-6xl mx-auto">
        {/* Profile Card Header */}
        <FriendProfileCard friend={friend} />

        {/* 4 Productivity Statistics Cards */}
        <FriendStats friend={friend} />

        {/* Analytics & Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-7">
            <FriendProductivityChart friend={friend} />
          </div>
          <div className="lg:col-span-5">
            <FriendActivity friend={friend} />
          </div>
        </div>

        {/* Current Projects & Upcoming Schedule Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-7">
            <FriendProjects friend={friend} />
          </div>
          <div className="lg:col-span-5">
            <FriendSchedule friend={friend} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
