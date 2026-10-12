'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  GraduationCap,
  Plus,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import { storageService } from '@/lib/storage';
import { Subject, StudySession } from '@/types';

export default function StudyPlannerPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [topic, setTopic] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [date, setDate] = useState('2026-10-15');
  const [startTime, setStartTime] = useState('02:00 PM');
  const [endTime, setEndTime] = useState('03:30 PM');
  const [duration, setDuration] = useState(90);

  const loadData = () => {
    const subjs = storageService.getSubjects();
    setSubjects(subjs);
    setSessions(storageService.getStudySessions());
    if (subjs.length > 0 && !subjectId) {
      setSubjectId(subjs[0].id);
    }
  };

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener('dayflow-sync', handleSync);
    return () => window.removeEventListener('dayflow-sync', handleSync);
  }, []);

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    const selectedSubj = subjects.find((s) => s.id === subjectId);
    storageService.addStudySession({
      subjectId: subjectId,
      subjectName: selectedSubj ? selectedSubj.name : 'General Study',
      topic: topic,
      date: date,
      startTime: startTime,
      endTime: endTime,
      durationMinutes: duration,
      completed: false,
    });
    setTopic('');
    setShowAddSessionModal(false);
    loadData();
  };

  const toggleSessionComplete = (sessId: string) => {
    const updated = sessions.map((s) =>
      s.id === sessId ? { ...s, completed: !s.completed } : s
    );
    storageService.saveStudySessions(updated);
    setSessions(updated);
  };

  const filteredSessions = sessions.filter((s) =>
    selectedSubjectId === 'all' ? true : s.subjectId === selectedSubjectId
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-10">
        {/* Header */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-blueAccent-soft text-accent-blue">
                <GraduationCap className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-text-main">
                Study Planner & Academic Progress
              </h1>
            </div>
            <p className="text-[13px] text-text-secondary">
              Track course coverage, organize study blocks, and prepare for upcoming exams.
            </p>
          </div>

          <button
            onClick={() => setShowAddSessionModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-[13px] font-bold shadow-soft hover:bg-primary-hover transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Study Session</span>
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-text-main">Enrolled Subjects</h3>
            <span className="text-[11px] text-text-secondary font-medium">
              5 Core Subjects Enrolled
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subj) => (
              <div
                key={subj.id}
                className="bg-white rounded-2xl p-5 border border-borderBase/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-lavender text-primary">
                      {subj.code}
                    </span>
                    <span className="text-[11px] text-text-secondary font-medium">
                      Exam: {subj.examDate || 'Nov 2026'}
                    </span>
                  </div>

                  <h4 className="text-[15px] font-bold text-text-main mt-2.5">
                    {subj.name}
                  </h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Instructor: {subj.teacher}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-text-secondary font-medium">Subject Coverage</span>
                      <span className="font-bold text-primary">{subj.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-lavender overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent-blue transition-all duration-500"
                        style={{ width: `${subj.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-borderBase/60 flex items-center justify-between text-[11px]">
                  <span className="text-text-secondary">
                    Weekly: <strong className="text-text-main">{subj.weeklyHours}h</strong> / {subj.targetHours}h
                  </span>
                  <span className="text-primary font-semibold">
                    {subj.nextSession}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timetable / Sessions Ledger */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-borderBase/60 mb-4">
            <div>
              <h3 className="text-[15px] font-bold text-text-main">Study Timetable & Sessions</h3>
              <p className="text-[11px] text-text-secondary">
                Upcoming planned deep work and problem-solving sessions
              </p>
            </div>

            {/* Filter by subject */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-text-muted" />
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-borderBase text-[12px] bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredSessions.map((sess) => (
              <div
                key={sess.id}
                onClick={() => toggleSessionComplete(sess.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  sess.completed
                    ? 'bg-lavender-light/40 border-borderBase/60 opacity-80'
                    : 'bg-white border-borderBase hover:border-primary/40 hover:shadow-soft'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      sess.completed
                        ? 'bg-primary border-primary text-white'
                        : 'border-borderBase text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-lavender text-primary">
                        {sess.subjectName}
                      </span>
                      <span className="text-[11px] text-text-secondary">{sess.date}</span>
                    </div>

                    <h4
                      className={`text-[13px] font-bold mt-1 ${
                        sess.completed ? 'line-through text-text-muted' : 'text-text-main'
                      }`}
                    >
                      {sess.topic}
                    </h4>

                    {sess.notes && (
                      <p className="text-[11px] text-text-secondary mt-0.5 italic">
                        &ldquo;{sess.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] sm:text-right shrink-0">
                  <div>
                    <span className="font-semibold text-text-main flex items-center sm:justify-end gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {sess.startTime} - {sess.endTime}
                    </span>
                    <span className="text-text-secondary font-medium">
                      {sess.durationMinutes} minutes planned
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      sess.completed
                        ? 'bg-[#E5F5EC] text-success'
                        : 'bg-blueAccent-soft text-blueAccent-dark'
                    }`}
                  >
                    {sess.completed ? 'Completed' : 'Upcoming'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Schedule Session */}
        {showAddSessionModal && (
          <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-float border border-borderBase animate-fade-in">
              <h3 className="text-[16px] font-bold text-text-main mb-4">
                Schedule Study Session
              </h3>
              <form onSubmit={handleAddSession} className="space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Select Subject
                  </label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Topic / Objectives
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Convolutional layers and Pooling operations"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-borderBase text-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                      Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-borderBase text-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                      Start Time
                    </label>
                    <input
                      type="text"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      placeholder="02:00 PM"
                      className="w-full px-3 py-2 rounded-xl border border-borderBase text-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                      End Time
                    </label>
                    <input
                      type="text"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      placeholder="03:30 PM"
                      className="w-full px-3 py-2 rounded-xl border border-borderBase text-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddSessionModal(false)}
                    className="px-4 py-2 rounded-xl text-[12px] font-medium text-text-secondary hover:bg-lavender"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-white text-[12px] font-bold shadow-soft hover:bg-primary-hover"
                  >
                    Schedule Session
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
