'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  FolderKanban,
  Plus,
  CheckCircle2,
  Clock,
  Paperclip,
  MessageSquare,
  Search,
  Filter,
  X,
  Send,
  MoreVertical,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { storageService } from '@/lib/storage';
import { Task, TaskStatus, Priority, TaskCategory } from '@/types';

export default function ProjectsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterProject, setFilterProject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Add task state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newProject, setNewProject] = useState('Dayflow Cloud');
  const [newCategory, setNewCategory] = useState<TaskCategory>('Projects');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const [newStatus, setNewStatus] = useState<TaskStatus>('todo');
  const [newDueDate, setNewDueDate] = useState('2026-10-20');

  // Comment input state
  const [newCommentText, setNewCommentText] = useState('');

  const loadData = () => {
    const allTasks = storageService.getTasks();
    setTasks(allTasks);
    // keep selectedTask updated if open
    if (selectedTask) {
      const updatedSelected = allTasks.find(t => t.id === selectedTask.id);
      if (updatedSelected) setSelectedTask(updatedSelected);
    }
  };

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener('dayflow-sync', handleSync);
    return () => window.removeEventListener('dayflow-sync', handleSync);
  }, []);

  const handleStatusChange = (taskId: string, nextStatus: TaskStatus, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    storageService.updateTaskStatus(taskId, nextStatus);
    loadData();
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    storageService.addTask({
      title: newTitle,
      description: newDescription,
      project: newProject,
      category: newCategory,
      priority: newPriority,
      status: newStatus,
      dueDate: newDueDate,
      checklist: [
        { id: `c-${Date.now()}-1`, text: 'Initial specifications and design', completed: true },
        { id: `c-${Date.now()}-2`, text: 'Core implementation and testing', completed: false }
      ],
      comments: [],
      assignees: [
        { name: 'Prashant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80' }
      ],
      attachmentsCount: 1
    });
    setNewTitle('');
    setNewDescription('');
    setShowAddModal(false);
    loadData();
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !newCommentText.trim()) return;
    const updated = {
      ...selectedTask,
      comments: [
        ...selectedTask.comments,
        {
          id: `cm-${Date.now()}`,
          author: 'Prashant Kumar',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80',
          text: newCommentText,
          date: 'Just now'
        }
      ]
    };
    storageService.updateTask(updated);
    setSelectedTask(updated);
    setNewCommentText('');
    loadData();
  };

  const handleToggleChecklist = (checkId: string) => {
    if (!selectedTask) return;
    const updatedChecklist = selectedTask.checklist.map(c =>
      c.id === checkId ? { ...c, completed: !c.completed } : c
    );
    const updated = { ...selectedTask, checklist: updatedChecklist };
    storageService.updateTask(updated);
    setSelectedTask(updated);
    loadData();
  };

  const columns: { id: TaskStatus; title: string; countColor: string }[] = [
    { id: 'backlog', title: 'Backlog', countColor: 'bg-lavender text-primary' },
    { id: 'todo', title: 'To Do', countColor: 'bg-blueAccent-soft text-accent-blue' },
    { id: 'in-progress', title: 'In Progress', countColor: 'bg-[#FEF3D6] text-[#B87A1E]' },
    { id: 'completed', title: 'Completed', countColor: 'bg-[#E5F5EC] text-success' },
  ];

  const filteredTasks = tasks.filter(t => {
    const matchesProject = filterProject === 'all' || t.project === filterProject;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  return (
    <DashboardLayout showRightPanel={false}>
      <div className="space-y-6 animate-fade-in pb-10">
        {/* Header */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-lavender text-primary">
                <FolderKanban className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-text-main">
                Project Kanban Board
              </h1>
            </div>
            <p className="text-[13px] text-text-secondary">
              Organize sprints, track project deliverables, and manage subtasks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-text-muted" />
              <input
                type="text"
                placeholder="Filter tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3.5 py-2 rounded-xl border border-borderBase text-[12px] bg-lavender-light/40 focus:outline-none focus:ring-2 focus:ring-primary/20 w-44"
              />
            </div>

            {/* Filter by Project */}
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="px-3 py-2 rounded-xl border border-borderBase text-[12px] bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Projects</option>
              <option value="Dayflow Cloud">Dayflow Cloud</option>
              <option value="Academic Core">Academic Core</option>
              <option value="AI Research">AI Research</option>
              <option value="Health & Wellness">Health & Wellness</option>
            </select>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-[12px] font-bold shadow-soft hover:bg-primary-hover transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Kanban Columns Grid (Directly inspired by Reference 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="bg-[#FAFAFC] rounded-2xl p-4 border border-borderBase/80 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-borderBase/60">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-bold text-text-main">{col.title}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.countColor}`}
                    >
                      {colTasks.length}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setNewStatus(col.id);
                      setShowAddModal(true);
                    }}
                    className="p-1 rounded-lg text-text-muted hover:text-primary hover:bg-lavender transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Tasks Container */}
                <div className="space-y-3 flex-1">
                  {colTasks.map((task) => {
                    const completedChecklistCount = task.checklist.filter((c) => c.completed).length;
                    return (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className="bg-white rounded-2xl p-4 border border-borderBase/80 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer group"
                      >
                        {/* Task Number & Project Badge (Ref 1 style `#53 Load-Up`) */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-blueAccent-soft/70 text-accent-blue">
                            #{task.taskNumber} {task.title.split(' ')[0]}
                          </span>

                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                              task.priority === 'high'
                                ? 'bg-pinkAccent-soft text-pinkAccent-dark'
                                : task.priority === 'medium'
                                ? 'bg-[#FEF3D6] text-[#B87A1E]'
                                : 'bg-lavender text-primary'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <h4 className="text-[13px] font-bold text-text-main line-clamp-1 group-hover:text-primary transition-colors">
                          {task.title}
                        </h4>
                        <p className="text-[11px] text-text-secondary mt-1 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>

                        {/* Checklist Counter & Due Date (Ref 1) */}
                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-borderBase/60 text-[11px] text-text-secondary">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 font-medium text-text-main">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                              {completedChecklistCount}/{task.checklist.length}
                            </span>
                            {task.attachmentsCount ? (
                              <span className="flex items-center gap-0.5 text-text-muted">
                                <Paperclip className="w-3 h-3" />
                                {task.attachmentsCount}
                              </span>
                            ) : null}
                          </div>

                          <span className="text-[10px] font-medium text-text-muted">
                            {task.dueDate}
                          </span>
                        </div>

                        {/* Column Quick Mover Controls */}
                        <div className="mt-2.5 pt-2 flex items-center justify-between border-t border-borderBase/40">
                          {/* Assignees */}
                          <div className="flex items-center -space-x-1.5">
                            {(task.assignees || []).map((a, i) => (
                              <img
                                key={i}
                                src={a.avatar}
                                alt={a.name}
                                className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                              />
                            ))}
                          </div>

                          {/* Quick move forward button */}
                          {col.id !== 'completed' && (
                            <button
                              onClick={(e) => {
                                const nextCol: Record<TaskStatus, TaskStatus> = {
                                  backlog: 'todo',
                                  todo: 'in-progress',
                                  'in-progress': 'completed',
                                  completed: 'completed'
                                };
                                handleStatusChange(task.id, nextCol[col.id], e);
                              }}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-lavender text-primary hover:bg-primary hover:text-white transition-colors flex items-center gap-1"
                              title="Move to next stage"
                            >
                              <span>Next</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Add Card pill button (Reference 1) */}
                  <button
                    onClick={() => {
                      setNewStatus(col.id);
                      setShowAddModal(true);
                    }}
                    className="w-full py-2.5 rounded-2xl border-2 border-dashed border-borderBase/80 hover:border-primary/50 text-[12px] font-bold text-text-secondary hover:text-primary transition-all flex items-center justify-center gap-1.5 bg-white/60"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Card</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Task Detail Modal / Panel (Inspired by Reference 1 & Section 12) */}
        {selectedTask && (
          <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl md:rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-float border border-borderBase animate-fade-in space-y-5">
              {/* Top Header */}
              <div className="flex items-start justify-between pb-4 border-b border-borderBase/60">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-blueAccent-soft text-accent-blue">
                      #{selectedTask.taskNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-text-secondary">
                      {selectedTask.project}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-text-main">
                    {selectedTask.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-1.5 rounded-xl hover:bg-lavender text-text-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status & Priority Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-lavender-light/50 p-3.5 rounded-2xl">
                <div>
                  <span className="text-[10px] text-text-secondary font-bold uppercase block mb-1">
                    Status
                  </span>
                  <select
                    value={selectedTask.status}
                    onChange={(e) => {
                      const next = e.target.value as TaskStatus;
                      handleStatusChange(selectedTask.id, next);
                      setSelectedTask({ ...selectedTask, status: next });
                    }}
                    className="text-[12px] font-bold rounded-lg border border-borderBase px-2 py-1 bg-white text-text-main"
                  >
                    <option value="backlog">Backlog</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <span className="text-[10px] text-text-secondary font-bold uppercase block mb-1">
                    Priority
                  </span>
                  <span
                    className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md capitalize ${
                      selectedTask.priority === 'high'
                        ? 'bg-pinkAccent-soft text-pinkAccent-dark'
                        : selectedTask.priority === 'medium'
                        ? 'bg-[#FEF3D6] text-[#B87A1E]'
                        : 'bg-lavender text-primary'
                    }`}
                  >
                    {selectedTask.priority}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-text-secondary font-bold uppercase block mb-1">
                    Due Date
                  </span>
                  <span className="text-[12px] font-semibold text-text-main">
                    {selectedTask.dueDate}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-text-secondary font-bold uppercase block mb-1">
                    Category
                  </span>
                  <span className="text-[12px] font-semibold text-text-main">
                    {selectedTask.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-[13px] font-bold text-text-main mb-1.5">Description</h4>
                <p className="text-[13px] text-text-secondary leading-relaxed bg-white p-3 rounded-xl border border-borderBase/60">
                  {selectedTask.description}
                </p>
              </div>

              {/* Checklist Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[13px] font-bold text-text-main">Subtasks Checklist</h4>
                  <span className="text-[11px] text-text-secondary font-medium">
                    {selectedTask.checklist.filter((c) => c.completed).length} of{' '}
                    {selectedTask.checklist.length} done
                  </span>
                </div>
                <div className="space-y-2">
                  {selectedTask.checklist.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleToggleChecklist(c.id)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl border border-borderBase hover:bg-lavender-light/40 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={c.completed}
                        onChange={() => {}}
                        className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      <span
                        className={`text-[12px] font-medium ${
                          c.completed ? 'line-through text-text-muted' : 'text-text-main'
                        }`}
                      >
                        {c.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="pt-2 border-t border-borderBase/60">
                <h4 className="text-[13px] font-bold text-text-main mb-3 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span>Discussion & Activity ({selectedTask.comments.length})</span>
                </h4>

                <div className="space-y-3 max-h-44 overflow-y-auto pr-1 mb-3">
                  {selectedTask.comments.map((cm) => (
                    <div key={cm.id} className="flex items-start gap-2.5 bg-lavender-light/30 p-2.5 rounded-xl">
                      <img
                        src={cm.avatar}
                        alt={cm.author}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold text-text-main">{cm.author}</span>
                          <span className="text-[10px] text-text-muted">{cm.date}</span>
                        </div>
                        <p className="text-[12px] text-text-secondary mt-0.5">{cm.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddComment} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write a comment or note..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-borderBase text-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover shadow-soft transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Task */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-float border border-borderBase animate-fade-in">
              <h3 className="text-[16px] font-bold text-text-main mb-4">Create New Task</h3>
              <form onSubmit={handleAddTask} className="space-y-3.5">
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Implement OAuth Flow"
                    className="w-full px-3.5 py-2 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Add key details and context..."
                    className="w-full px-3.5 py-2 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                      Project
                    </label>
                    <input
                      type="text"
                      value={newProject}
                      onChange={(e) => setNewProject(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-borderBase text-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as TaskCategory)}
                      className="w-full px-3.5 py-2 rounded-xl border border-borderBase text-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                    >
                      <option value="Projects">Projects</option>
                      <option value="Study">Study</option>
                      <option value="Personal">Personal</option>
                      <option value="Exercise">Exercise</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-text-secondary block mb-1">
                      Priority
                    </label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as Priority)}
                      className="w-full px-2.5 py-2 rounded-xl border border-borderBase text-[12px] bg-white"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-text-secondary block mb-1">
                      Initial Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as TaskStatus)}
                      className="w-full px-2.5 py-2 rounded-xl border border-borderBase text-[12px] bg-white"
                    >
                      <option value="backlog">Backlog</option>
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-text-secondary block mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
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
                    Add Task
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
