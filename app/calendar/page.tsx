'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Check,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { storageService } from '@/lib/storage';
import { ScheduleEvent } from '@/types';

export default function CalendarPage() {
  const [schedule, setSchedule] = useState<ScheduleEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 12)); // Oct 2026
  const [selectedDay, setSelectedDay] = useState(12);
  const [showAddModal, setShowAddModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<'class' | 'study' | 'project' | 'workout'>('class');
  const [eventTime, setEventTime] = useState('09:00 AM - 10:30 AM');

  const loadData = () => {
    setSchedule(storageService.getSchedule());
  };

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener('dayflow-sync', handleSync);
    return () => window.removeEventListener('dayflow-sync', handleSync);
  }, []);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    const parts = eventTime.split('-').map((s) => s.trim());
    storageService.addScheduleEvent({
      title: eventTitle,
      category: eventCategory,
      startTime: parts[0] || '09:00 AM',
      endTime: parts[1] || '10:00 AM',
      completed: false,
      date: `2026-10-${selectedDay.toString().padStart(2, '0')}`,
      instructor: 'Prashant',
    });
    setEventTitle('');
    setShowAddModal(false);
    loadData();
  };

  const toggleEventComplete = (id: string) => {
    storageService.toggleScheduleEvent(id);
    loadData();
  };

  const daysInMonth = 31;
  const startDayOffset = 3; // Oct 1 2026 is Thursday (0=Mon, 1=Tue, 2=Wed, 3=Thu)

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const selectedDayEvents = schedule.filter((e) => {
    const dayStr = selectedDay.toString().padStart(2, '0');
    return e.date.endsWith(`-${dayStr}`) || e.date === `2026-10-${dayStr}`;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-10">
        {/* Header */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-lavender text-primary">
                <CalendarDays className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-text-main">
                Calendar & Timetable
              </h1>
            </div>
            <p className="text-[13px] text-text-secondary">
              Plan classes, exam preparations, revision blocks, and milestone dates.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-[13px] font-bold shadow-soft hover:bg-primary-hover transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Calendar Event</span>
          </button>
        </div>

        {/* Big Interactive Month Grid */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-main">
              October 2026
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
                className="p-2 rounded-xl border border-borderBase hover:bg-lavender text-text-secondary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedDay(Math.min(31, selectedDay + 1))}
                className="p-2 rounded-xl border border-borderBase hover:bg-lavender text-text-secondary transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-[12px] font-bold text-text-secondary/70 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank offset days */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`offset-${i}`} className="min-h-[70px] sm:min-h-[85px] rounded-xl bg-lavender-light/20 p-2 text-text-muted/30 text-[11px]" />
            ))}

            {/* Days in month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day;
              const isToday = day === 12;
              const hasEvents = day === 12 || day === 14 || day === 15 || day === 18 || day === 20;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`min-h-[70px] sm:min-h-[85px] rounded-2xl p-2.5 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-lavender border-primary shadow-soft'
                      : isToday
                      ? 'bg-pinkAccent-soft/40 border-pinkAccent-dark/40 hover:bg-pinkAccent-soft/60'
                      : 'bg-white border-borderBase hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold ${
                        isSelected
                          ? 'bg-primary text-white'
                          : isToday
                          ? 'bg-pinkAccent text-white'
                          : 'text-text-main'
                      }`}
                    >
                      {day}
                    </span>

                    {hasEvents && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </div>

                  {hasEvents && (
                    <div className="hidden sm:block mt-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-white/80 text-primary truncate block border border-borderBase/60">
                        {day === 12 ? '3 Classes' : 'Study Block'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
          <div className="flex items-center justify-between pb-3 border-b border-borderBase/60 mb-4">
            <h3 className="text-[15px] font-bold text-text-main">
              Agenda for October {selectedDay}, 2026
            </h3>
            <span className="text-[11px] text-text-secondary font-medium">
              {selectedDayEvents.length} items scheduled
            </span>
          </div>

          {selectedDayEvents.length === 0 ? (
            <div className="text-center py-8 text-text-secondary text-[12px]">
              No scheduled events for this date. Click &quot;Add Calendar Event&quot; to plan a session.
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDayEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => toggleEventComplete(evt.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    evt.completed
                      ? 'bg-lavender-light/40 border-borderBase/60 opacity-70'
                      : 'bg-white border-borderBase hover:border-primary/40 hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        evt.completed
                          ? 'bg-primary border-primary text-white'
                          : 'border-borderBase text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div>
                      <h4
                        className={`text-[13px] font-bold ${
                          evt.completed ? 'line-through text-text-muted' : 'text-text-main'
                        }`}
                      >
                        {evt.title}
                      </h4>
                      <p className="text-[11px] text-text-secondary flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3 text-primary" />
                        <span>{evt.startTime} - {evt.endTime}</span>
                        {evt.instructor && <span>• {evt.instructor}</span>}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${
                      evt.category === 'class'
                        ? 'bg-blueAccent-soft text-accent-blue'
                        : evt.category === 'project'
                        ? 'bg-lavender text-primary'
                        : evt.category === 'workout'
                        ? 'bg-pinkAccent-soft text-pinkAccent-dark'
                        : 'bg-[#E5F5EC] text-success'
                    }`}
                  >
                    {evt.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal: Add Calendar Event */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-float border border-borderBase animate-fade-in">
              <h3 className="text-[16px] font-bold text-text-main mb-4">
                Add Event for Oct {selectedDay}, 2026
              </h3>
              <form onSubmit={handleAddEvent} className="space-y-3.5">
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. Physics Quantum Mechanics Lecture"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                      Time Slot
                    </label>
                    <input
                      type="text"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      placeholder="09:00 AM - 10:30 AM"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                      Category
                    </label>
                    <select
                      value={eventCategory}
                      onChange={(e) => setEventCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                    >
                      <option value="class">Class</option>
                      <option value="study">Study</option>
                      <option value="project">Project</option>
                      <option value="workout">Workout</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-[12px] font-medium text-text-secondary hover:bg-lavender"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-white text-[12px] font-bold shadow-soft hover:bg-primary-hover"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
