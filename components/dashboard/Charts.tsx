'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import {
  productivityOverviewData,
  studyHoursDistribution,
  taskCategoryDistribution
} from '@/lib/mockData';
import { Clock, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

// Custom Tooltip for Productivity Overview
const CustomOverviewTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-xl border border-borderBase shadow-card text-[12px]">
        <p className="font-bold text-text-main mb-1">{label}</p>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-text-secondary">Tasks Completed:</span>
            <span className="font-bold text-primary">{payload[0]?.value}</span>
          </div>
          {payload[1] && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pinkAccent" />
              <span className="text-text-secondary">Study Hours:</span>
              <span className="font-bold text-pinkAccent-dark">{payload[1]?.value}h</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

// GRAPH A: Productivity Overview Chart (Inspired by Ref 1 & Ref 3)
export function ProductivityChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-64 rounded-2xl bg-lavender-light/50 animate-pulse" />;
  }

  return (
    <div className="bg-white rounded-2xl md:rounded-[26px] p-5 sm:p-6 border border-borderBase/80 shadow-soft flex flex-col justify-between">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-text-main">Productivity Overview</h3>
          <p className="text-[11px] text-text-secondary">
            Weekly task execution vs dedicated study hours
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-text-secondary">Tasks Done</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-pinkAccent" />
            <span className="text-text-secondary">Study Hours</span>
          </div>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={productivityOverviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="purpleArea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6255A5" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6255A5" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="coralArea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F3AFA5" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F3AFA5" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#F1F0F6" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#A5A6BA"
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
            <Tooltip content={<CustomOverviewTooltip />} />
            <Area
              type="monotone"
              dataKey="tasks"
              stroke="#6255A5"
              strokeWidth={3}
              fill="url(#purpleArea)"
              activeDot={{ r: 6, fill: '#6255A5', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="studyHours"
              stroke="#F3AFA5"
              strokeWidth={3}
              fill="url(#coralArea)"
              activeDot={{ r: 6, fill: '#F3AFA5', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// GRAPH B: Study Hours Bar Chart (From Ref 3: Hours Spent)
export function StudyHoursChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-56 rounded-2xl bg-lavender-light/50 animate-pulse" />;
  }

  const totalWeekly = studyHoursDistribution.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1);
  const avgDaily = (parseFloat(totalWeekly) / 7).toFixed(1);

  return (
    <div className="bg-white rounded-2xl md:rounded-[26px] p-5 sm:p-6 border border-borderBase/80 shadow-soft flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-[14px] font-bold text-text-main">Hours Spent</h3>
          <p className="text-[11px] text-text-secondary">Daily study tracking</p>
        </div>
        <div className="text-right">
          <span className="text-[18px] font-extrabold text-primary block leading-none">
            {totalWeekly}h
          </span>
          <span className="text-[10px] text-text-secondary">Avg: {avgDaily}h/day</span>
        </div>
      </div>

      <div className="h-[150px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={studyHoursDistribution} barGap={4} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <XAxis dataKey="day" stroke="#85869B" fontSize={11} tickLine={false} axisLine={false} dy={6} />
            <YAxis stroke="#A5A6BA" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(value: any) => [`${value} hours`, 'Study Duration']}
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E9E8F0',
                fontSize: '11px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
              }}
            />
            <Bar dataKey="target" fill="#E9E7F2" radius={[6, 6, 6, 6]} barSize={10} />
            <Bar dataKey="hours" fill="#6F91D5" radius={[6, 6, 6, 6]} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-borderBase/60 text-[11px] text-text-secondary">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blueAccent" />
          <span>Actual</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-lavender" />
          <span>Target (4h)</span>
        </div>
      </div>
    </div>
  );
}

// GRAPH C: Weekly Progress Donut/Gauge (From Ref 3: My Progress)
export function WeeklyProgressCard() {
  const progressPercent = 78;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl md:rounded-[26px] p-5 sm:p-6 border border-borderBase/80 shadow-soft flex flex-col justify-between items-center text-center">
      <div className="w-full text-left">
        <h3 className="text-[14px] font-bold text-text-main">My Progress</h3>
        <p className="text-[11px] text-text-secondary">Weekly targets pace</p>
      </div>

      {/* SVG Progress Ring matching Reference 3 */}
      <div className="relative my-3 flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="42"
            stroke="#F1F0F6"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="42"
            stroke="#6255A5"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[26px] font-extrabold text-primary leading-none">
            {progressPercent}%
          </span>
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mt-0.5">
            Completed
          </span>
        </div>
      </div>

      <div className="w-full text-center">
        <p className="text-[12px] font-medium text-text-main">
          Great work! Keep building consistency.
        </p>
        <p className="text-[10px] text-text-secondary mt-0.5">
          12 of 15 core tasks finished
        </p>
      </div>
    </div>
  );
}

// GRAPH D: Task Distribution Donut Chart
export function TaskDistributionChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-56 rounded-2xl bg-lavender-light/50 animate-pulse" />;
  }

  return (
    <div className="bg-white rounded-2xl md:rounded-[26px] p-5 sm:p-6 border border-borderBase/80 shadow-soft flex flex-col justify-between">
      <div className="mb-2">
        <h3 className="text-[14px] font-bold text-text-main">Task Distribution</h3>
        <p className="text-[11px] text-text-secondary">Categories distribution</p>
      </div>

      <div className="h-[140px] w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={taskCategoryDistribution}
              innerRadius={36}
              outerRadius={56}
              paddingAngle={4}
              dataKey="value"
            >
              {taskCategoryDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any) => [`${val}%`, 'Share']}
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E9E8F0',
                fontSize: '11px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[13px] font-bold text-text-main">100%</span>
          <span className="text-[9px] text-text-secondary uppercase">All</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-borderBase/60">
        {taskCategoryDistribution.map((cat) => (
          <div key={cat.name} className="flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
            <span className="text-text-secondary truncate">{cat.name}</span>
            <span className="font-bold text-text-main ml-auto">{cat.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
