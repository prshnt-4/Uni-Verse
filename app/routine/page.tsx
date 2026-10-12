'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  CalendarCheck2,
  Plus,
  Flame,
  CheckCircle2,
  Clock,
  Trash2,
  Sun,
  BookOpen,
  Dumbbell,
  Moon,
  Filter,
  Sparkles,
  Check
} from 'lucide-react';
import { storageService } from '@/lib/storage';
import { RoutineItem, RoutineCategory } from '@/types';

export default function RoutinePage() {
  const [routines, setRoutines] = useState<RoutineItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('08:00 AM');
  const [newCategory, setNewCategory] = useState<RoutineCategory>('morning');

  const loadData = () => {
    setRoutines(storageService.getRoutines());
  };

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener('dayflow-sync', handleSync);
    return () => window.removeEventListener('dayflow-sync', handleSync);
  }, []);

  const handleToggle = (id: string) => {
    storageService.toggleRoutine(id);
    loadData();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this routine step?')) {
      storageService.deleteRoutine(id);
      loadData();
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    storageService.addRoutine({
      title: newTitle,
      time: newTime,
      category: newCategory,
      completed: false,
    });
    setNewTitle('');
    setShowAddModal(false);
    loadData();
  };

  const filteredRoutines = routines.filter((r) =>
    filterCategory === 'all' ? true : r.category === filterCategory
  );

  const totalCount = routines.length;
  const completedCount = routines.filter((r) => r.completed).length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const maxStreak = routines.reduce((max, r) => Math.max(max, r.streak), 0);

  const getCategoryMeta = (cat: RoutineCategory) => {
    switch (cat) {
      case 'morning':
        return { icon: Sun, color: 'text-warning', bg: 'bg-[#FEF3D6]' };
      case 'study':
        return { icon: BookOpen, color: 'text-primary', bg: 'bg-lavender' };
      case 'exercise':
        return { icon: Dumbbell, color: 'text-pinkAccent-dark', bg: 'bg-pinkAccent-soft' };
      case 'evening':
        return { icon: Moon, color: 'text-accent-blue', bg: 'bg-blueAccent-soft' };
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-10">
        {/* Header */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-lavender text-primary">
                <CalendarCheck2 className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-text-main">
                Daily Routine Planner
              </h1>
            </div>
            <p className="text-[13px] text-text-secondary">
              Build automatic momentum with consistent daily habits and streaks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-[13px] font-bold shadow-soft hover:bg-primary-hover transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Routine Item</span>
            </button>
          </div>
        </div>

        {/* Progress & Streak Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-borderBase/80 shadow-soft flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-text-secondary">Today&apos;s Completion</p>
              <h3 className="text-2xl font-extrabold text-primary mt-0.5">
                {completionPercent}%
              </h3>
              <p className="text-[11px] text-text-secondary mt-1">
                {completedCount} of {totalCount} habits checked off
              </p>
            </div>
            {/* Progress bar pill */}
            <div className="w-16 h-16 rounded-full bg-lavender flex items-center justify-center relative">
              <span className="text-[13px] font-bold text-primary">{completionPercent}%</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-borderBase/80 shadow-soft flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-text-secondary">Highest Habit Streak</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Flame className="w-6 h-6 text-pinkAccent-dark fill-pinkAccent" />
                <h3 className="text-2xl font-extrabold text-text-main">{maxStreak} Days</h3>
              </div>
              <p className="text-[11px] text-text-secondary mt-1">Consistency creates greatness</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-borderBase/80 shadow-soft flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold text-text-secondary">Focus Mode Status</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-success animate-ping" />
                <span className="text-[14px] font-bold text-text-main">Active & On Track</span>
              </div>
              <p className="text-[11px] text-text-secondary mt-1">Next: Classes & Revision</p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'morning', 'study', 'exercise', 'evening'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[12px] font-bold capitalize transition-all shrink-0 ${
                filterCategory === cat
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-white border border-borderBase text-text-secondary hover:text-text-main hover:bg-lavender-light'
              }`}
            >
              {cat === 'all' ? 'All Habits' : `${cat} Routine`}
            </button>
          ))}
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-borderBase/60 mb-4">
            <h3 className="text-[15px] font-bold text-text-main">Routine Checklist</h3>
            <span className="text-[11px] text-text-secondary font-medium">
              Click any item to toggle completed status
            </span>
          </div>

          <div className="space-y-3">
            {filteredRoutines.map((routine) => {
              const meta = getCategoryMeta(routine.category);
              const Icon = meta.icon;

              return (
                <div
                  key={routine.id}
                  onClick={() => handleToggle(routine.id)}
                  className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                    routine.completed
                      ? 'bg-lavender-light/40 border-borderBase/60 opacity-80'
                      : 'bg-white border-borderBase hover:border-primary/40 hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                        routine.completed
                          ? 'bg-primary border-primary text-white'
                          : 'border-borderBase text-transparent group-hover:border-primary'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${meta.bg} ${meta.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`text-[13px] font-bold leading-snug truncate ${
                          routine.completed ? 'line-through text-text-muted' : 'text-text-main'
                        }`}
                      >
                        {routine.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-text-secondary">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-text-muted" />
                          {routine.time}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{routine.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-lavender px-2 py-0.5 rounded-md">
                      <Flame className="w-3 h-3 text-pinkAccent-dark" />
                      {routine.streak} streak
                    </span>

                    <button
                      onClick={(e) => handleDelete(routine.id, e)}
                      className="p-1.5 rounded-lg text-text-muted hover:text-pinkAccent-dark hover:bg-pinkAccent-soft transition-colors"
                      title="Delete routine item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal: Add Routine Item */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-float border border-borderBase animate-fade-in">
              <h3 className="text-[16px] font-bold text-text-main mb-4">
                Add New Routine Habit
              </h3>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Habit Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Read 15 pages of system design"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                      Time of Day
                    </label>
                    <input
                      type="text"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      placeholder="08:00 AM"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as RoutineCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                    >
                      <option value="morning">Morning</option>
                      <option value="study">Study</option>
                      <option value="exercise">Exercise</option>
                      <option value="evening">Evening</option>
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
                    Save Habit
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
