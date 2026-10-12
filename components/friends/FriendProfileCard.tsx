'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  UserCheck,
  UserPlus,
  MessageSquare,
  Sparkles,
  Flame,
  Award
} from 'lucide-react';
import { Friend } from '@/lib/data/friends';
import { friendsStorage } from '@/lib/friendsStorage';
import { FriendAvatar } from './FriendAvatar';
import { MessageModal } from './MessageModal';

interface FriendProfileCardProps {
  friend: Friend;
}

export function FriendProfileCard({ friend }: FriendProfileCardProps) {
  const [isFollowing, setIsFollowing] = useState(true);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  useEffect(() => {
    setIsFollowing(friendsStorage.getFriendStatus(friend.username));
    const handleSync = () => {
      setIsFollowing(friendsStorage.getFriendStatus(friend.username));
    };
    window.addEventListener('dayflow-friends-sync', handleSync);
    return () => window.removeEventListener('dayflow-friends-sync', handleSync);
  }, [friend.username]);

  const handleToggleFollow = () => {
    const next = friendsStorage.toggleFriendStatus(friend.username);
    setIsFollowing(next);
  };

  return (
    <>
      <div className="bg-white rounded-2xl md:rounded-[28px] p-6 sm:p-7 border border-borderBase/80 shadow-soft relative overflow-hidden">
        {/* Top Action Row: Back Button & Badges */}
        <div className="flex items-center justify-between pb-5 border-b border-borderBase/50">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-lavender-light hover:bg-lavender text-text-secondary hover:text-text-main text-[12px] font-bold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                friend.online
                  ? 'bg-[#E5F5EC] text-success'
                  : 'bg-lavender-light text-text-muted'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  friend.online ? 'bg-success animate-pulse' : 'bg-text-muted'
                }`}
              />
              <span>{friend.online ? 'Online' : 'Offline'}</span>
            </span>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Large Avatar */}
          <div className="shrink-0">
            <FriendAvatar
              friend={friend}
              size="xl"
              clickable={false}
              showTooltip={false}
              showOnlineStatus={true}
              className="ring-4 ring-white shadow-soft"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-[26px] font-extrabold text-text-main tracking-tight">
                  {friend.name}
                </h1>
                <div className="flex items-center gap-2 justify-center sm:justify-start mt-0.5">
                  <span className="text-[13px] font-bold text-primary">{friend.displayName}</span>
                  <span className="text-text-muted">•</span>
                  <span className="text-[12px] font-semibold text-text-secondary">{friend.role}</span>
                </div>
              </div>

              {/* Action Buttons: Following status & Message */}
              <div className="flex items-center gap-2.5 justify-center sm:justify-end">
                <button
                  onClick={handleToggleFollow}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-[12px] font-bold transition-all shadow-soft ${
                    isFollowing
                      ? 'bg-lavender text-primary hover:bg-lavender/80'
                      : 'bg-primary text-white hover:bg-primary-hover'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Friends</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Add Friend</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsMessageModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-primary text-white hover:bg-primary-hover text-[12px] font-bold shadow-soft transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>
            </div>

            {/* Biography */}
            <p className="text-[13px] text-text-secondary mt-3 leading-relaxed max-w-2xl">
              &ldquo;{friend.bio}&rdquo;
            </p>

            {/* Status Message Pill */}
            {friend.statusMessage && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blueAccent-soft/60 text-accent-blue text-[11px] font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Current Status: {friend.statusMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      <MessageModal
        friend={friend}
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
      />
    </>
  );
}
