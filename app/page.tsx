'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WelcomeHero } from '@/components/dashboard/WelcomeHero';
import { StatsCard } from '@/components/dashboard/StatsCard';
import {
  ProductivityChart,
  StudyHoursChart,
  WeeklyProgressCard,
  TaskDistributionChart
} from '@/components/dashboard/Charts';
import { ClassCards } from '@/components/dashboard/ClassCards';
import { LessonsTable } from '@/components/dashboard/LessonsTable';
import { storageService } from '@/lib/storage';
import { Task, Subject } from '@/types';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const loadData = () => {
    setTasks(storageService.getTasks());
    setSubjects(storageService.getSubjects());
  };

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener('dayflow-sync', handleSync);
    return () => window.removeEventListener('dayflow-sync', handleSync);
  }, []);

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const remainingCount = tasks.filter((t) => t.status !== 'completed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-10">
        {/* Top Hero Card + Weather Card */}
        <WelcomeHero
          completedTasksCount={completedCount}
          remainingTasksCount={remainingCount}
          studyHoursToday="2h 30m"
          userName="Prashant"
        />

        {/* 4 Summary Statistic Cards */}
        <StatsCard />

        {/* Primary Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8">
            <ProductivityChart />
          </div>
          <div className="lg:col-span-4">
            <WeeklyProgressCard />
          </div>
        </div>

        {/* Secondary Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-6">
            <StudyHoursChart />
          </div>
          <div className="lg:col-span-6">
            <TaskDistributionChart />
          </div>
        </div>

        {/* Classes Section (from Reference 2) */}
        <ClassCards subjects={subjects} />

        {/* Lessons Ledger Table (from Reference 2) */}
        <LessonsTable />
      </div>
    </DashboardLayout>
  );
}
