'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, FileText, User, Sparkles } from 'lucide-react';
import { Subject } from '@/types';

interface ClassCardsProps {
  subjects: Subject[];
}

export function ClassCards({ subjects }: ClassCardsProps) {
  // Pick the top 3 cards inspired by Reference 2
  const featured = subjects.slice(0, 3);

  // Gradient styles corresponding to Reference 2
  const cardThemes = [
    {
      bg: 'bg-gradient-to-br from-[#4A69A8] to-[#6F91D5]',
      badge: 'bg-white/20 text-white',
      textColor: 'text-white',
      subTextColor: 'text-white/80'
    },
    {
      bg: 'bg-gradient-to-br from-[#53478F] to-[#7E70BD]',
      badge: 'bg-white/20 text-white',
      textColor: 'text-white',
      subTextColor: 'text-white/80'
    },
    {
      bg: 'bg-gradient-to-br from-[#D98276] to-[#F3AFA5]',
      badge: 'bg-white/20 text-white',
      textColor: 'text-white',
      subTextColor: 'text-white/80'
    }
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-text-main">Classes & Subjects</h3>
        <Link
          href="/study"
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        {featured.map((subj, idx) => {
          const theme = cardThemes[idx % cardThemes.length];
          return (
            <div
              key={subj.id}
              className={`rounded-2xl p-4 sm:p-5 ${theme.bg} shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between text-white relative overflow-hidden min-h-[140px]`}
            >
              {/* Subtle background glow circle */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.badge}`}>
                    {subj.code}
                  </span>
                  <span className="text-[11px] font-bold text-white/90">
                    {subj.progress}% Done
                  </span>
                </div>

                <h4 className="text-[14px] font-bold mt-2.5 leading-snug line-clamp-1">
                  {subj.name}
                </h4>

                {/* Avatar Stack like Reference 2 */}
                <div className="flex items-center -space-x-1.5 mt-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                    alt="Member"
                    className="w-5 h-5 rounded-full ring-2 ring-white/60 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                    alt="Member"
                    className="w-5 h-5 rounded-full ring-2 ring-white/60 object-cover"
                  />
                  <div className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm ring-2 ring-white/60 text-[9px] font-bold flex items-center justify-center text-white">
                    +4
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] text-white/90">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  <span>{subj.filesCount} Files</span>
                </span>
                <span className="truncate max-w-[120px]">
                  Teacher: {subj.teacher.split(' ')[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
