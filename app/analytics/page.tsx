'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  LineChart as LineChartIcon,
  TrendingUp,
  Flame,
  Award,
  Target,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const monthData = [
  { day: 'Week 1', tasks: 28, studyHours: 24, score: 85 },
  { day: 'Week 2', tasks: 34, studyHours: 29, score: 91 },
  { day: 'Week 3', tasks: 31, studyHours: 27, score: 88 },
  { day: 'Week 4', tasks: 39, studyHours: 32, score: 96 },
];

const subjectTimeData = [
  { subject: 'Math & Calc', hours: 18.5, color: '#6F91D5' },
  { subject: 'Machine Learning', hours: 16.0, color: '#F3AFA5' },
  { subject: 'Analog Elect.', hours: 12.5, color: '#6255A5' },
  { subject: 'Control Systems', hours: 9.0, color: '#9CCDB7' },
  { subject: 'Computer Vision', hours: 8.5, color: '#F2C98A' },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'month'>('7d');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-10">
        {/* Header */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-lavender text-primary">
                <LineChartIcon className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-text-main">
                Productivity Analytics
              </h1>
            </div>
            <p className="text-[13px] text-text-secondary">
              Deep dive into your study metrics, routine consistency, and output velocity.
            </p>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center gap-1.5 bg-lavender-light/60 p-1 rounded-2xl border border-borderBase">
            <button
              onClick={() => setDateRange('7d')}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                dateRange === '7d'
                  ? 'bg-white text-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-main'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setDateRange('30d')}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                dateRange === '30d'
                  ? 'bg-white text-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-main'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setDateRange('month')}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                dateRange === 'month'
                  ? 'bg-white text-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-main'
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* 4 Big Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-borderBase/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-text-secondary">Total Study Time</span>
              <div className="w-8 h-8 rounded-xl bg-blueAccent-soft text-accent-blue flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-text-main mt-2">64.5h</h3>
            <p className="text-[11px] text-success font-semibold mt-1">↑ 14% vs last period</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-borderBase/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-text-secondary">Habit Consistency</span>
              <div className="w-8 h-8 rounded-xl bg-lavender text-primary flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-primary mt-2">86%</h3>
            <p className="text-[11px] text-text-secondary mt-1">14-day daily routine streak</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-borderBase/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-text-secondary">Sprint Velocity</span>
              <div className="w-8 h-8 rounded-xl bg-pinkAccent-soft text-pinkAccent-dark flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-text-main mt-2">48 Tasks</h3>
            <p className="text-[11px] text-success font-semibold mt-1">↑ 8 completed early</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-borderBase/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-text-secondary">Focus Score</span>
              <div className="w-8 h-8 rounded-xl bg-[#FEF3D6] text-[#B87A1E] flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-text-main mt-2">92 / 100</h3>
            <p className="text-[11px] text-text-secondary mt-1">Top 5% student percentile</p>
          </div>
        </div>

        {/* Long Trend Chart */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-bold text-text-main">Monthly Productivity Curve</h3>
              <p className="text-[11px] text-text-secondary">Tasks execution vs Study Hours by week</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-text-secondary">Tasks Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                <span className="text-text-secondary">Study Hours</span>
              </div>
            </div>
          </div>

          {mounted && (
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#F1F0F6" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" stroke="#85869B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A5A6BA" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E9E8F0',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tasks"
                    stroke="#6255A5"
                    strokeWidth={3}
                    fill="#E9E7F2"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="studyHours"
                    stroke="#6F91D5"
                    strokeWidth={3}
                    fill="#DCEAFF"
                    fillOpacity={0.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Subject-Wise Time Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-7 bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
            <h3 className="text-[15px] font-bold text-text-main mb-1">Subject Time Investment</h3>
            <p className="text-[11px] text-text-secondary mb-4">Total hours allocated per course module</p>

            {mounted && (
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectTimeData}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
                  >
                    <XAxis type="number" stroke="#A5A6BA" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis
                      dataKey="subject"
                      type="category"
                      stroke="#85869B"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${val} hours`, 'Study Time']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid #E9E8F0',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="hours" fill="#6255A5" radius={[0, 8, 8, 0]} barSize={16}>
                      {subjectTimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="md:col-span-5 bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft flex flex-col justify-between">
            <div>
              <h3 className="text-[15px] font-bold text-text-main mb-1">Goal Completion Velocity</h3>
              <p className="text-[11px] text-text-secondary mb-3">Academic targets achieved on schedule</p>

              <div className="space-y-3.5 mt-4">
                <div>
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <span className="font-semibold text-text-main">Weekly Study Target (25h)</span>
                    <span className="font-bold text-primary">82%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-lavender overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: '82%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <span className="font-semibold text-text-main">Problem Sets Solved (40)</span>
                    <span className="font-bold text-accent-blue">90%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-lavender overflow-hidden">
                    <div className="h-full rounded-full bg-accent-blue" style={{ width: '90%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <span className="font-semibold text-text-main">Routine Consistency</span>
                    <span className="font-bold text-success">94%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-lavender overflow-hidden">
                    <div className="h-full rounded-full bg-success" style={{ width: '94%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-2xl bg-lavender-light/60 border border-borderBase/60 text-center">
              <p className="text-[12px] font-bold text-text-main">
                Consistency Tip 💡
              </p>
              <p className="text-[11px] text-text-secondary mt-0.5">
                Studying in 50-minute focused blocks with 10-minute breaks boosted your retention by 22%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
