'use client';

import React, { useState, useEffect } from 'react';
import { CloudRain, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { formatTimeGreeting, getCurrentTimeFormatted, getCurrentDateFormatted } from '@/lib/utils';
import { HeroTendingIllustration } from '../illustrations/Illustrations';

interface WelcomeHeroProps {
  completedTasksCount: number;
  remainingTasksCount: number;
  studyHoursToday: string;
  userName?: string;
}

export function WelcomeHero({
  completedTasksCount,
  remainingTasksCount,
  studyHoursToday = '2h 30m',
  userName = 'Prashant'
}: WelcomeHeroProps) {
  const [timeStr, setTimeStr] = useState<string>('10.29 am');
  const [greetingInfo, setGreetingInfo] = useState({ greeting: 'Good morning', icon: '🌅' });

  useEffect(() => {
    setTimeStr(getCurrentTimeFormatted());
    setGreetingInfo(formatTimeGreeting());
    const interval = setInterval(() => {
      setTimeStr(getCurrentTimeFormatted());
      setGreetingInfo(formatTimeGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
      {/* Main Welcome Hero Card (References 1 & 3) */}
      <div className="md:col-span-8 lg:col-span-9 bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft relative overflow-hidden flex flex-col justify-between">
        {/* Top Tag & Clock */}
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender text-primary text-[11px] font-semibold tracking-wide shadow-inner-soft">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Dayflow Active Focus</span>
          </div>

          <div className="text-right">
            <span className="text-[28px] sm:text-[34px] font-extrabold tracking-tight text-primary-dark block leading-none">
              {timeStr}
            </span>
          </div>
        </div>

        {/* Hero Greeting & Stats */}
        <div className="mt-4 md:mt-2 relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="max-w-md">
            <h1 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-text-main tracking-tight leading-tight">
              {greetingInfo.greeting}, {userName} {greetingInfo.icon}
            </h1>
            <p className="text-[13px] text-text-secondary mt-1">
              Make today productive, one task at a time. Have a fruitful day ahead!
            </p>

            {/* Quick Stat Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lavender text-text-main text-[11px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                <span>{completedTasksCount} completed</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pinkAccent-soft text-text-main text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-pinkAccent-dark" />
                <span>{remainingTasksCount} remaining</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blueAccent-soft text-text-main text-[11px] font-semibold">
                <Clock className="w-3.5 h-3.5 text-blueAccent-dark" />
                <span>{studyHoursToday} planned</span>
              </span>
            </div>
          </div>

          {/* Right Illustration from Reference 1 */}
          <div className="hidden sm:block shrink-0 -mb-2">
            <HeroTendingIllustration className="w-48 lg:w-56 h-auto" />
          </div>
        </div>
      </div>

      {/* Weather Card (Reference 1) */}
      <div className="md:col-span-4 lg:col-span-3 bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-blueAccent-soft/70 flex items-center justify-center text-accent-blue shadow-inner-soft">
            <CloudRain className="w-7 h-7 stroke-[1.8]" />
          </div>
          <div className="text-right">
            <span className="text-[32px] font-extrabold text-text-main tracking-tight leading-none block">
              26°
            </span>
            <span className="text-[11px] text-text-secondary font-medium">Feels like 27°</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-borderBase/60">
          <h4 className="text-[14px] font-bold text-text-main">Gentle Showers</h4>
          <p className="text-[11px] text-text-secondary mt-0.5">
            Lagos • Perfect weather for deep study
          </p>
        </div>
      </div>
    </div>
  );
}
