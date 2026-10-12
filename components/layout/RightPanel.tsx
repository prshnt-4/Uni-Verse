'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCircle2,
  Clock,
  Plus,
  ChevronRight,
  BookOpen,
  Code,
  Brain,
  Eye,
  Calculator,
  Dumbbell,
  Check
} from 'lucide-react';
import { MonthlyCalendar } from '../calendar/MonthlyCalendar';
import { ScheduleEvent, Deadline, UserProfile } from '@/types';
import { storageService } from '@/lib/storage';
import { AvatarImage } from '@/components/avatars/AvatarImage';
import { initialUserProfile } from '@/lib/mockData';

interface RightPanelProps {
  onEventClick?: (event: ScheduleEvent) => void;
  className?: string;
}

export function RightPanel({ onEventClick, className = '' }: RightPanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedule, setSchedule] = useState<ScheduleEvent[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('02:00 PM - 03:30 PM');
  const [newEventCategory, setNewEventCategory] = useState<'class' | 'study' | 'project' | 'workout'>('study');

  const loadData = () => {
    setSchedule(storageService.getSchedule());
    setDeadlines(storageService.getDeadlines());
    setProfile(storageService.getProfile());
  };

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener('dayflow-sync', handleSync);
    return () => window.removeEventListener('dayflow-sync', handleSync);
  }, []);

  const toggleEventComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storageService.toggleScheduleEvent(id);
    setSchedule(storageService.getSchedule());
  };

  const toggleDeadlineComplete = (id: string) => {
    storageService.toggleDeadline(id);
    setDeadlines(storageService.getDeadlines());
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    const times = newEventTime.split('-').map(t => t.trim());
    storageService.addScheduleEvent({
      title: newEventTitle,
      category: newEventCategory,
      startTime: times[0] || '02:00 PM',
      endTime: times[1] || '03:00 PM',
      completed: false,
      date: '2026-10-12',
      instructor: 'Prashant',
    });
    setNewEventTitle('');
    setShowAddModal(false);
    loadData();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'class':
        return <Calculator className="w-4 h-4 text-accent-blue" />;
      case 'project':
        return <Code className="w-4 h-4 text-primary" />;
      case 'workout':
        return <Dumbbell className="w-4 h-4 text-pinkAccent-dark" />;
      default:
        return <BookOpen className="w-4 h-4 text-success" />;
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'class':
        return 'bg-blueAccent-soft';
      case 'project':
        return 'bg-lavender';
      case 'workout':
        return 'bg-pinkAccent-soft';
      default:
        return 'bg-[#E5F5EC]';
    }
  };

  return (
    <aside
      className={`w-full lg:w-[310px] shrink-0 space-y-5 p-5 bg-white lg:border-l border-borderBase/60 flex flex-col ${className}`}
    >
      {/* SECTION A: USER PROFILE CARD (Ref 2 & 3) */}
      <div className="rounded-2xl bg-gradient-to-b from-lavender-light to-white p-4 border border-borderBase/70 flex flex-col items-center text-center shadow-soft">
        <div className="relative">
          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-primary to-pinkAccent shadow-soft">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <AvatarImage
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
                fallback={<div className="h-full w-full bg-lavender" />}
              />
            </div>
          </div>
          <span className="absolute bottom-0 right-1 w-5 h-5 rounded-full bg-success border-2 border-white flex items-center justify-center text-[10px] text-white">
            <Check className="w-3 h-3 stroke-[3]" />
          </span>
        </div>

        <h3 className="text-[15px] font-bold text-text-main mt-3">
          {profile.name}
        </h3>
        <span className="text-[11px] font-semibold text-primary px-2.5 py-0.5 rounded-full bg-lavender mt-1">
          {profile.role}
        </span>
        <p className="text-[11px] text-text-secondary mt-1.5 italic">
          &ldquo;{profile.tagline}&rdquo;
        </p>

        <Link
          href="/settings"
          className="mt-3.5 w-full py-2 px-4 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white text-[12px] font-semibold transition-all duration-200 text-center"
        >
          View Profile
        </Link>
      </div>

      {/* SECTION B: CALENDAR (Ref 2 & 3) */}
      <div className="rounded-2xl bg-white p-4 border border-borderBase/70 shadow-soft">
        <MonthlyCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      {/* SECTION C: TODAY'S SCHEDULE (Ref 3) */}
      <div className="rounded-2xl bg-white p-4 border border-borderBase/70 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-[14px] font-bold text-text-main">Today&apos;s Schedule</h4>
            <p className="text-[11px] text-text-secondary">
              {schedule.filter(s => s.completed).length} of {schedule.length} completed
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="p-1.5 rounded-xl bg-lavender hover:bg-primary hover:text-white text-primary transition-colors"
            title="Add schedule event"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
          {schedule.map((item) => (
            <div
              key={item.id}
              onClick={() => onEventClick?.(item)}
              className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                item.completed
                  ? 'bg-lavender-light/50 border-borderBase/40 opacity-70'
                  : 'bg-white border-borderBase/80 hover:border-primary/40 hover:shadow-soft'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${getCategoryBg(
                    item.category
                  )}`}
                >
                  {getCategoryIcon(item.category)}
                </div>
                <div className="min-w-0">
                  <h5
                    className={`text-[12px] font-semibold truncate ${
                      item.completed ? 'line-through text-text-muted' : 'text-text-main'
                    }`}
                  >
                    {item.title}
                  </h5>
                  <p className="text-[10px] text-text-secondary flex items-center gap-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{item.startTime} - {item.endTime}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => toggleEventComplete(item.id, e)}
                className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ml-2 ${
                  item.completed
                    ? 'bg-primary border-primary text-white'
                    : 'border-borderBase hover:border-primary text-transparent'
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION D: REMINDERS & DEADLINES (Ref 2) */}
      <div className="rounded-2xl bg-white p-4 border border-borderBase/70 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[14px] font-bold text-text-main">Reminders</h4>
          <span className="text-[10px] font-bold text-pinkAccent-dark px-2 py-0.5 rounded-full bg-pinkAccent-soft">
            {deadlines.filter(d => !d.completed).length} Due
          </span>
        </div>

        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {deadlines.map((dl) => (
            <div
              key={dl.id}
              onClick={() => toggleDeadlineComplete(dl.id)}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                dl.completed
                  ? 'bg-lavender-light/40 border-borderBase/40 opacity-60'
                  : 'bg-white border-borderBase/80 hover:bg-lavender-light/30'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-lavender text-primary shrink-0 mt-0.5">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-[12px] font-medium leading-snug ${
                    dl.completed ? 'line-through text-text-muted' : 'text-text-main'
                  }`}
                >
                  {dl.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-text-secondary">{dl.dueDate}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                      dl.priority === 'high'
                        ? 'bg-pinkAccent-soft text-pinkAccent-dark'
                        : dl.priority === 'medium'
                        ? 'bg-[#FEF3D6] text-[#B87A1E]'
                        : 'bg-blueAccent-soft text-blueAccent-dark'
                    }`}
                  >
                    {dl.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-float border border-borderBase animate-fade-in">
            <h3 className="text-[15px] font-bold text-text-main mb-3">Add Schedule Event</h3>
            <form onSubmit={handleAddEvent} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-text-secondary block mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Machine Learning Lab"
                  className="w-full px-3 py-2 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-text-secondary block mb-1">
                  Time Slot
                </label>
                <input
                  type="text"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  placeholder="02:00 PM - 03:30 PM"
                  className="w-full px-3 py-2 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-text-secondary block mb-1">
                  Category
                </label>
                <select
                  value={newEventCategory}
                  onChange={(e) => setNewEventCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  <option value="class">Class</option>
                  <option value="study">Study</option>
                  <option value="project">Project</option>
                  <option value="workout">Workout</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-xl text-[12px] font-medium text-text-secondary hover:bg-lavender"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-primary text-white text-[12px] font-bold shadow-soft hover:bg-primary-hover"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}
