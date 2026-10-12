'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Download, CheckCircle2, Clock } from 'lucide-react';

interface LessonRow {
  id: string;
  classCode: string;
  className: string;
  teacherName: string;
  date: string;
  status: 'Done' | 'Pending' | 'In Progress';
}

const lessonsData: LessonRow[] = [
  {
    id: 'l-1',
    classCode: 'A1',
    className: 'Advanced Multivariable Calculus',
    teacherName: 'Mrs. Endah Pratama',
    date: '12.10.2026',
    status: 'Done'
  },
  {
    id: 'l-2',
    classCode: 'B2',
    className: 'Machine Learning Neural Ops',
    teacherName: 'Dr. Dimas Surya',
    date: '14.10.2026',
    status: 'Pending'
  },
  {
    id: 'l-3',
    classCode: 'C1',
    className: 'Analog Electronic Systems',
    teacherName: 'Prof. Cole Chandler',
    date: '17.10.2026',
    status: 'Done'
  },
];

export function LessonsTable() {
  return (
    <div className="bg-white rounded-2xl md:rounded-[26px] p-5 sm:p-6 border border-borderBase/80 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-text-main">Scheduled Lessons & Materials</h3>
          <p className="text-[11px] text-text-secondary">Class materials and attendance ledger</p>
        </div>
        <Link
          href="/study"
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-borderBase/60 text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              <th className="pb-3 pl-1">Class</th>
              <th className="pb-3">Subject & Teacher</th>
              <th className="pb-3">Members</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Material</th>
              <th className="pb-3 text-right pr-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderBase/40 text-[12px]">
            {lessonsData.map((row) => (
              <tr key={row.id} className="hover:bg-lavender-light/40 transition-colors">
                <td className="py-3 pl-1">
                  <span className="w-8 h-8 rounded-xl bg-lavender text-primary font-bold inline-flex items-center justify-center text-[11px]">
                    {row.classCode}
                  </span>
                </td>
                <td className="py-3">
                  <p className="font-semibold text-text-main">{row.className}</p>
                  <p className="text-[11px] text-text-secondary">{row.teacherName}</p>
                </td>
                <td className="py-3">
                  <div className="flex items-center -space-x-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
                      alt="Student"
                      className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80"
                      alt="Student"
                      className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                    />
                    <div className="w-5 h-5 rounded-full bg-lavender text-[9px] font-bold text-primary flex items-center justify-center ring-2 ring-white">
                      +3
                    </div>
                  </div>
                </td>
                <td className="py-3 text-text-secondary font-medium">
                  {row.date}
                </td>
                <td className="py-3">
                  <button
                    onClick={() => alert(`Downloading slides & notes for ${row.className}`)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blueAccent-soft/70 hover:bg-blueAccent-soft text-blueAccent-dark font-medium text-[11px] transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </td>
                <td className="py-3 text-right pr-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      row.status === 'Done'
                        ? 'bg-[#E5F5EC] text-success'
                        : 'bg-[#FEF3D6] text-[#B87A1E]'
                    }`}
                  >
                    {row.status === 'Done' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    <span>{row.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
