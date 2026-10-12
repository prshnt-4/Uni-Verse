'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  CheckSquare,
  Plus,
  Search,
  LayoutList,
  LayoutGrid,
  CheckCircle2,
  Clock,
  Trash2,
  Calendar,
  AlertCircle,
  Tag
} from 'lucide-react';
import { storageService } from '@/lib/storage';
import { Task, TaskStatus, Priority, TaskCategory } from '@/types';

type TabView = 'all' | 'today' | 'upcoming' | 'completed';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<TabView>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Study');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('2026-10-16');

  const loadData = () => {
    setTasks(storageService.getTasks());
  };

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener('dayflow-sync', handleSync);
    return () => window.removeEventListener('dayflow-sync', handleSync);
  }, []);

  const handleToggleComplete = (task: Task) => {
    const nextStatus: TaskStatus = task.status === 'completed' ? 'todo' : 'completed';
    storageService.updateTaskStatus(task.id, nextStatus);
    loadData();
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Delete this task?')) {
      storageService.deleteTask(id);
      loadData();
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    storageService.addTask({
      title,
      description,
      category,
      priority,
      status: 'todo',
      dueDate,
      project: 'General',
      checklist: [{ id: `c-${Date.now()}`, text: 'Execute task steps', completed: false }],
      comments: []
    });
    setTitle('');
    setDescription('');
    setShowAddModal(false);
    loadData();
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'completed') return t.status === 'completed';
    if (activeTab === 'today') return t.dueDate <= '2026-10-12' && t.status !== 'completed';
    if (activeTab === 'upcoming') return t.dueDate > '2026-10-12' && t.status !== 'completed';
    return true; // 'all'
  });

  const getPriorityBadge = (p: Priority) => {
    switch (p) {
      case 'high':
        return 'bg-pinkAccent-soft text-pinkAccent-dark';
      case 'medium':
        return 'bg-[#FEF3D6] text-[#B87A1E]';
      case 'low':
        return 'bg-blueAccent-soft text-blueAccent-dark';
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
                <CheckSquare className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-text-main">
                Tasks Master Ledger
              </h1>
            </div>
            <p className="text-[13px] text-text-secondary">
              Organize, prioritize, and check off your academic and personal action items.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-[13px] font-bold shadow-soft hover:bg-primary-hover transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Task</span>
            </button>
          </div>
        </div>

        {/* View Controls & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-borderBase/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {(['all', 'today', 'upcoming', 'completed'] as TabView[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold capitalize transition-all shrink-0 ${
                  activeTab === tab
                    ? 'bg-lavender text-primary shadow-inner-soft'
                    : 'text-text-secondary hover:text-text-main hover:bg-lavender-light'
                }`}
              >
                {tab === 'all' ? 'All Tasks' : `${tab}`}
              </button>
            ))}
          </div>

          {/* Search & Grid/List Toggle */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-text-muted" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-borderBase text-[12px] bg-lavender-light/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center border border-borderBase rounded-xl p-0.5 bg-lavender-light/30">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-soft text-primary' : 'text-text-secondary'
                }`}
                title="List view"
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-soft text-primary' : 'text-text-secondary'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Task List / Grid Display */}
        {viewMode === 'list' ? (
          <div className="bg-white rounded-2xl md:rounded-[26px] p-5 sm:p-6 border border-borderBase/80 shadow-soft divide-y divide-borderBase/60">
            {filteredTasks.length === 0 ? (
              <div className="py-12 text-center text-text-secondary text-[13px]">
                No tasks found matching your criteria.
              </div>
            ) : (
              filteredTasks.map((t) => (
                <div
                  key={t.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      onClick={() => handleToggleComplete(t)}
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        t.status === 'completed'
                          ? 'bg-primary border-primary text-white'
                          : 'border-borderBase hover:border-primary text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-lavender text-primary">
                          #{t.taskNumber}
                        </span>
                        <h4
                          className={`text-[13px] font-bold leading-tight ${
                            t.status === 'completed'
                              ? 'line-through text-text-muted'
                              : 'text-text-main'
                          }`}
                        >
                          {t.title}
                        </h4>
                      </div>

                      <p className="text-[11px] text-text-secondary mt-1 line-clamp-1">
                        {t.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md capitalize ${getPriorityBadge(
                        t.priority
                      )}`}
                    >
                      {t.priority}
                    </span>

                    <span className="text-[11px] text-text-secondary flex items-center gap-1 hidden sm:flex">
                      <Calendar className="w-3 h-3 text-text-muted" />
                      {t.dueDate}
                    </span>

                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="p-1 rounded-lg text-text-muted hover:text-pinkAccent-dark hover:bg-pinkAccent-soft transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-5 border border-borderBase/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-lavender text-primary">
                      #{t.taskNumber} {t.category}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${getPriorityBadge(
                        t.priority
                      )}`}
                    >
                      {t.priority}
                    </span>
                  </div>

                  <h4
                    className={`text-[14px] font-bold leading-snug ${
                      t.status === 'completed'
                        ? 'line-through text-text-muted'
                        : 'text-text-main'
                    }`}
                  >
                    {t.title}
                  </h4>
                  <p className="text-[11px] text-text-secondary mt-1.5 line-clamp-2">
                    {t.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-borderBase/60 flex items-center justify-between">
                  <span className="text-[11px] text-text-secondary flex items-center gap-1">
                    <Clock className="w-3 h-3 text-primary" />
                    {t.dueDate}
                  </span>

                  <button
                    onClick={() => handleToggleComplete(t)}
                    className={`text-[11px] font-bold px-3 py-1 rounded-xl transition-colors ${
                      t.status === 'completed'
                        ? 'bg-lavender text-primary'
                        : 'bg-primary text-white hover:bg-primary-hover shadow-soft'
                    }`}
                  >
                    {t.status === 'completed' ? 'Done' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Add Task */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-float border border-borderBase animate-fade-in">
              <h3 className="text-[16px] font-bold text-text-main mb-4">Add Task</h3>
              <form onSubmit={handleCreateTask} className="space-y-3.5">
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Revise Fourier Transform notes"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Details or references..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-text-secondary block mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as TaskCategory)}
                      className="w-full px-2 py-2 rounded-xl border border-borderBase text-[12px] bg-white"
                    >
                      <option value="Study">Study</option>
                      <option value="Projects">Projects</option>
                      <option value="Personal">Personal</option>
                      <option value="Exercise">Exercise</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-text-secondary block mb-1">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as Priority)}
                      className="w-full px-2 py-2 rounded-xl border border-borderBase text-[12px] bg-white"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-text-secondary block mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-2 py-2 rounded-xl border border-borderBase text-[11px]"
                    />
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
                    Save Task
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
