'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StickyNote, Plus, Search, Tag, Trash2, Edit3, Bookmark } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  date: string;
  color: string;
}

const initialNotes: Note[] = [
  {
    id: 'n-1',
    title: 'Fourier Transform Intuition',
    content: 'Decomposes any periodic or non-periodic waveform into a continuous frequency spectrum of sinusoids. Essential for signal filtering in Analog Electronics.',
    tag: 'Analog Electronics',
    date: 'Oct 11, 2026',
    color: 'bg-lavender-light border-lavender'
  },
  {
    id: 'n-2',
    title: 'Backprop & Computation Graphs',
    content: 'Remember that reverse-mode automatic differentiation is O(1) in terms of backward pass overhead relative to the forward pass computation cost.',
    tag: 'Machine Learning',
    date: 'Oct 10, 2026',
    color: 'bg-blueAccent-light border-blueAccent-soft'
  },
  {
    id: 'n-3',
    title: 'Next.js App Router Caching Rules',
    content: 'Default fetch is cached unless cache: "no-store" or export const dynamic = "force-dynamic" is specified on the route handler.',
    tag: 'Dayflow Cloud',
    date: 'Oct 08, 2026',
    color: 'bg-pinkAccent-light border-pinkAccent-soft'
  }
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('Machine Learning');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const note: Note = {
      id: `n-${Date.now()}`,
      title: newTitle,
      content: newContent,
      tag: newTag,
      date: 'Today',
      color: 'bg-lavender-light border-lavender'
    };
    setNotes([note, ...notes]);
    setNewTitle('');
    setNewContent('');
    setShowAdd(!showAdd);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-10">
        {/* Header */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-lavender text-primary">
                <StickyNote className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-text-main">
                Study Notes & Knowledge Base
              </h1>
            </div>
            <p className="text-[13px] text-text-secondary">
              Quick summaries, lecture notes, formulas, and flashcard references.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-text-muted" />
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3.5 py-2 rounded-xl border border-borderBase text-[12px] bg-lavender-light/40 focus:outline-none focus:ring-2 focus:ring-primary/20 w-44 sm:w-56"
              />
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-[12px] font-bold shadow-soft hover:bg-primary-hover transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Note</span>
            </button>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((note) => (
            <div
              key={note.id}
              className={`rounded-2xl p-5 border shadow-soft hover:shadow-card transition-all flex flex-col justify-between ${note.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/80 text-primary border border-borderBase/60">
                    {note.tag}
                  </span>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-text-muted hover:text-pinkAccent-dark transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h3 className="text-[15px] font-bold text-text-main mt-1 leading-snug">
                  {note.title}
                </h3>
                <p className="text-[12px] text-text-secondary mt-2 leading-relaxed">
                  {note.content}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-black/5 flex items-center justify-between text-[11px] text-text-muted">
                <span>{note.date}</span>
                <span className="flex items-center gap-1 font-semibold text-primary">
                  <Bookmark className="w-3 h-3" />
                  Saved
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add Note */}
        {showAdd && (
          <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-float border border-borderBase animate-fade-in">
              <h3 className="text-[16px] font-bold text-text-main mb-4">Create Note</h3>
              <form onSubmit={handleAddNote} className="space-y-3.5">
                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Note Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Convolution Theorem Summary"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Tag / Subject
                  </label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                    Content
                  </label>
                  <textarea
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Key concepts, equations, takeaways..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="px-4 py-2 rounded-xl text-[12px] font-medium text-text-secondary hover:bg-lavender"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-white text-[12px] font-bold shadow-soft hover:bg-primary-hover"
                  >
                    Save Note
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
