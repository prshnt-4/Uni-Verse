'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Friend } from '@/lib/data/friends';

interface FriendProductivityChartProps {
  friend: Friend;
}

const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-xl border border-borderBase shadow-card text-[12px]">
        <p className="font-bold text-text-main mb-1">{label}</p>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-text-secondary">Productivity:</span>
            <span className="font-bold text-primary">{payload[0]?.value}%</span>
          </div>
          {payload[1] && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-blue" />
              <span className="text-text-secondary">Study Hours:</span>
              <span className="font-bold text-accent-blue">{payload[1]?.value}h</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export function FriendProductivityChart({ friend }: FriendProductivityChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-64 rounded-2xl bg-lavender-light/40 animate-pulse" />;
  }

  return (
    <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-text-main">
            Weekly Productivity Velocity
          </h3>
          <p className="text-[11px] text-text-secondary">
            Daily focus score and hours tracked this week
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-text-secondary">Focus Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
            <span className="text-text-secondary">Study Hours</span>
          </div>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={friend.weeklyProductivity}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="friendPurple" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6255A5" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6255A5" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="friendBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6F91D5" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#6F91D5" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#F1F0F6" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#85869B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={8}
            />
            <YAxis
              stroke="#A5A6BA"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dx={-6}
            />
            <Tooltip content={<CustomChartTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#6255A5"
              strokeWidth={2.5}
              fill="url(#friendPurple)"
              activeDot={{ r: 5, fill: '#6255A5', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="studyHours"
              stroke="#6F91D5"
              strokeWidth={2.5}
              fill="url(#friendBlue)"
              activeDot={{ r: 5, fill: '#6F91D5', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
