'use client';

import React from 'react';
import { X, Check, Plus, Users, Sparkles } from 'lucide-react';
import { DUMMY_FRIENDS } from '@/lib/data/friends';
import { FriendAvatar } from './FriendAvatar';

interface AddFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibleUsernames: string[];
  onToggleFriend: (username: string) => void;
}

export function AddFriendsModal({
  isOpen,
  onClose,
  visibleUsernames,
  onToggleFriend,
}: AddFriendsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-float border border-borderBase animate-fade-in relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-borderBase/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-lavender flex items-center justify-center text-primary">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-text-main">
                Manage Friends in Sidebar
              </h3>
              <p className="text-[11px] text-text-secondary">
                Toggle who appears in your quick-access sidebar grid
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-lavender text-text-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Pill */}
        <div className="my-4 p-3 rounded-2xl bg-lavender-light/60 border border-borderBase/60 flex items-center gap-2.5 text-[12px] text-text-secondary">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <span>
            Changes are saved to your local session and will persist across reloads.
          </span>
        </div>

        {/* Friends List */}
        <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
          {DUMMY_FRIENDS.map((friend) => {
            const isVisible = visibleUsernames.includes(friend.username);

            return (
              <div
                key={friend.id}
                className="flex items-center justify-between p-3 rounded-2xl border border-borderBase/70 hover:border-primary/40 hover:bg-lavender-light/30 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FriendAvatar friend={friend} size="md" clickable={false} showTooltip={false} />
                  <div className="min-w-0">
                    <h4 className="text-[13px] font-bold text-text-main leading-tight truncate">
                      {friend.name}
                    </h4>
                    <p
                      className="text-[11px] text-text-secondary truncate mt-0.5"
                      title={`${friend.displayName} • ${friend.role}`}
                    >
                      {friend.displayName} • {friend.role}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onToggleFriend(friend.username)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    isVisible
                      ? 'bg-lavender text-primary hover:bg-pinkAccent-soft hover:text-pinkAccent-dark'
                      : 'bg-primary text-white hover:bg-primary-hover shadow-soft'
                  }`}
                >
                  {isVisible ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-borderBase/60 flex items-center justify-between">
          <span className="text-[11px] text-text-muted">
            {visibleUsernames.length} of {DUMMY_FRIENDS.length} friends visible
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-white text-[12px] font-bold shadow-soft hover:bg-primary-hover transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
