'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Menu,
  User,
  Sliders,
  LogOut,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { getCurrentDateFormatted } from '@/lib/utils';
import { storageService } from '@/lib/storage';
import { UserProfile } from '@/types';
import { AvatarImage } from '@/components/avatars/AvatarImage';
import { initialUserProfile } from '@/lib/mockData';

interface TopNavbarProps {
  onOpenMobileSidebar: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export function TopNavbar({
  onOpenMobileSidebar,
  searchQuery = '',
  onSearchChange
}: TopNavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);
  const currentDate = getCurrentDateFormatted();

  useEffect(() => {
    const syncProfile = () => setProfile(storageService.getProfile());
    syncProfile();
    window.addEventListener('dayflow-sync', syncProfile);
    return () => window.removeEventListener('dayflow-sync', syncProfile);
  }, []);

  const handleResetData = () => {
    if (confirm('Reset Dayflow demo data to initial sample values?')) {
      storageService.resetToDefaults();
    }
  };

  return (
    <header className="relative z-30 flex items-center justify-between gap-4 py-4 px-6 bg-transparent">
      {/* Left: Mobile Menu Button & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-2xl bg-white border border-borderBase text-text-secondary hover:text-text-main shadow-soft"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search tasks, subjects, projects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-borderBase/80 text-[13px] text-text-main placeholder-text-muted shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      {/* Right: Date, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Date Display (Desktop) */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 border border-borderBase/60 text-[12px] font-medium text-text-secondary shadow-soft">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span>{currentDate}</span>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="relative p-2.5 rounded-2xl bg-white border border-borderBase/70 text-text-secondary hover:text-text-main shadow-soft hover:shadow-card transition-all"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pinkAccent animate-ping" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pinkAccent" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-borderBase shadow-float p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-borderBase/60 px-2">
                <span className="text-[13px] font-bold text-text-main">Notifications</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-lavender text-primary font-bold">
                  2 New
                </span>
              </div>
              <div className="divide-y divide-borderBase/40 mt-1 max-h-64 overflow-y-auto">
                <div className="p-2.5 rounded-xl hover:bg-lavender-light transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-blueAccent-soft flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-text-main">
                        Calculus Session starting at 07:30 AM
                      </p>
                      <p className="text-[10px] text-text-muted mt-0.5">In 20 minutes</p>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl hover:bg-lavender-light transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-pinkAccent-soft flex items-center justify-center text-pinkAccent-dark shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-text-main">
                        Weekly streak milestone: 14 days active!
                      </p>
                      <p className="text-[10px] text-text-muted mt-0.5">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-2xl bg-white border border-borderBase/70 shadow-soft hover:shadow-card transition-all"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-lavender">
              <AvatarImage
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
                fallback={<div className="h-full w-full bg-lavender" />}
              />
            </div>
            <span className="hidden sm:inline-block text-[13px] font-semibold text-text-main">
              {profile.name.split(' ')[0]}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-borderBase shadow-float p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-2.5 border-b border-borderBase/60">
                <p className="text-[13px] font-bold text-text-main">{profile.name}</p>
                <p className="text-[11px] text-text-secondary">{profile.role}</p>
              </div>
              <div className="pt-1 space-y-0.5">
                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium text-text-secondary hover:text-text-main hover:bg-lavender-light transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium text-text-secondary hover:text-text-main hover:bg-lavender-light transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5 text-primary" />
                  <span>Preferences</span>
                </Link>
                <button
                  onClick={handleResetData}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium text-text-secondary hover:text-text-main hover:bg-lavender-light transition-colors text-left"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-pinkAccent" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
