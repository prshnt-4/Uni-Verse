'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Settings,
  User,
  Sliders,
  RotateCcw,
  Bell,
  Palette,
  Shield,
  Save,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { storageService } from '@/lib/storage';
import { UserProfile } from '@/types';
import { initialUserProfile } from '@/lib/mockData';
import { AvatarImage } from '@/components/avatars/AvatarImage';
import { AvatarPickerModal } from '@/components/avatars/AvatarPickerModal';

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [tagline, setTagline] = useState(profile.tagline);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

  useEffect(() => {
    const current = storageService.getProfile();
    setProfile(current);
    setName(current.name);
    setRole(current.role);
    setTagline(current.tagline);
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name,
      role,
      tagline,
    };
    storageService.saveProfile(updated);
    setProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all Dayflow demo data to defaults?')) {
      storageService.resetToDefaults();
    }
  };

  const handleAvatarSave = (avatar: string) => {
    const updated = { ...storageService.getProfile(), avatar };
    storageService.saveProfile(updated);
    setProfile(updated);
    setAvatarPickerOpen(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-10 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 border border-borderBase/80 shadow-soft">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-lavender text-primary">
              <Settings className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-text-main">
              Account & Application Settings
            </h1>
          </div>
          <p className="text-[13px] text-text-secondary">
            Manage your student profile, habit preferences, and data persistence.
          </p>
        </div>

        {/* Profile Card & Form */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 sm:p-7 border border-borderBase/80 shadow-soft">
          <h2 className="text-[16px] font-bold text-text-main mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span>Profile Details</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 pb-6 border-b border-borderBase/60">
            <div className="relative">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-pinkAccent shadow-soft">
                <AvatarImage
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover bg-white"
                  fallback={
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-lavender text-primary">
                      <User className="h-8 w-8" />
                    </div>
                  }
                />
              </div>
              <button
                type="button"
                onClick={() => setAvatarPickerOpen(true)}
                className="mt-2 w-full rounded-xl bg-lavender-light px-2 py-1.5 text-[10px] font-bold text-primary transition-colors hover:bg-lavender"
              >
                Choose avatar
              </button>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-text-main">{profile.name}</h3>
              <p className="text-[12px] font-semibold text-primary">{profile.role}</p>
              <p className="text-[11px] text-text-secondary mt-1">{profile.tagline}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-lavender text-primary">
                  🔥 {profile.streakDays} Day Streak
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-blueAccent-soft text-accent-blue">
                  📚 {profile.studyHoursTotal} Study Hours
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-text-secondary block mb-1">
                Personal Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedSuccess ? (
                <span className="text-[12px] font-bold text-success flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  Profile updated successfully!
                </span>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-[12px] font-bold shadow-soft hover:bg-primary-hover transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Data Persistence & Demo Controls */}
        <div className="bg-white rounded-2xl md:rounded-[26px] p-6 sm:p-7 border border-borderBase/80 shadow-soft">
          <h2 className="text-[16px] font-bold text-text-main mb-2 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-primary" />
            <span>Data & Storage Management</span>
          </h2>
          <p className="text-[12px] text-text-secondary mb-4 leading-relaxed">
            All your daily routines, scheduled sessions, tasks, and calendar events are stored client-side in localStorage for reactive privacy and zero data loss on page refreshes.
          </p>

          <div className="p-4 rounded-2xl bg-pinkAccent-soft/40 border border-pinkAccent-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-[13px] font-bold text-text-main">
                Reset Application State
              </h4>
              <p className="text-[11px] text-text-secondary mt-0.5">
                Clear custom changes and restore default demonstration data from the 3 references.
              </p>
            </div>

            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pinkAccent-dark text-white text-[12px] font-bold hover:bg-pinkAccent transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      </div>
      <AvatarPickerModal
        isOpen={avatarPickerOpen}
        selectedAvatar={profile.avatar}
        onSave={handleAvatarSave}
        onClose={() => setAvatarPickerOpen(false)}
      />
    </DashboardLayout>
  );
}
