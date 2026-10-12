'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthlyCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  eventDates?: string[]; // array of 'YYYY-MM-DD'
}

export function MonthlyCalendar({
  selectedDate,
  onSelectDate,
  eventDates = ['2026-10-12', '2026-10-14', '2026-10-15', '2026-10-18', '2026-10-20']
}: MonthlyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // First day of month (0 = Sun, 1 = Mon ... adjust to Mon start)
  const firstDay = new Date(year, month, 1).getDay();
  // Monday as 0, Sunday as 6
  const startingDayIndex = (firstDay + 6) % 7;

  // Days in current month
  const totalDays = new Date(year, month + 1, 0).getDate();
  // Days in previous month
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const today = new Date();
  const isCurrentMonthThisMonth =
    today.getFullYear() === year && today.getMonth() === month;

  // Format date helper
  const formatDateString = (y: number, m: number, d: number) => {
    const mm = (m + 1).toString().padStart(2, '0');
    const dd = d.toString().padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  return (
    <div className="w-full">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-bold text-text-main">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            className="w-7 h-7 rounded-xl flex items-center justify-center text-text-secondary hover:bg-lavender hover:text-text-main transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="w-7 h-7 rounded-xl flex items-center justify-center text-text-secondary hover:bg-lavender hover:text-text-main transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day) => (
          <span
            key={day}
            className="text-[11px] font-medium text-text-secondary/80 py-1"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Previous Month Inactive Days */}
        {Array.from({ length: startingDayIndex }).map((_, idx) => {
          const dayNum = prevMonthTotalDays - startingDayIndex + idx + 1;
          return (
            <div
              key={`prev-${idx}`}
              className="h-8 flex items-center justify-center text-[12px] text-text-muted/40 cursor-default select-none"
            >
              {dayNum}
            </div>
          );
        })}

        {/* Current Month Active Days */}
        {Array.from({ length: totalDays }).map((_, idx) => {
          const dayNum = idx + 1;
          const dateStr = formatDateString(year, month, dayNum);
          const isToday = isCurrentMonthThisMonth && today.getDate() === dayNum;
          const isSelected =
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === dayNum;
          const hasEvents = eventDates.includes(dateStr);

          return (
            <button
              key={`curr-${dayNum}`}
              onClick={() => onSelectDate(new Date(year, month, dayNum))}
              className={`relative h-8 w-8 mx-auto rounded-full flex flex-col items-center justify-center text-[12px] font-medium transition-all ${
                isSelected
                  ? 'bg-primary text-white shadow-pill font-bold scale-105'
                  : isToday
                  ? 'bg-pinkAccent/30 text-pinkAccent-dark font-bold hover:bg-pinkAccent/40'
                  : 'text-text-main hover:bg-lavender/60'
              }`}
            >
              <span>{dayNum}</span>
              {/* Event indicator dot */}
              {hasEvents && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
