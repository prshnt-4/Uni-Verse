'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { DUMMY_FRIENDS, Friend } from '@/lib/data/friends';
import { friendsStorage } from '@/lib/friendsStorage';
import { FriendAvatar } from './FriendAvatar';
import { AddFriendsModal } from './AddFriendsModal';

interface FriendsSectionProps {
  onFriendClick?: () => void;
  collapsed?: boolean;
}

export function FriendsSection({ onFriendClick, collapsed = false }: FriendsSectionProps) {
  const [visibleUsernames, setVisibleUsernames] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadVisible = () => {
    setVisibleUsernames(friendsStorage.getVisibleFriendUsernames());
  };

  useEffect(() => {
    loadVisible();
    const handleSync = () => loadVisible();
    window.addEventListener('dayflow-friends-sync', handleSync);
    return () => window.removeEventListener('dayflow-friends-sync', handleSync);
  }, []);

  const handleToggleFriend = (username: string) => {
    if (visibleUsernames.includes(username)) {
      friendsStorage.removeFriendFromSidebar(username);
    } else {
      friendsStorage.addFriendToSidebar(username);
    }
    loadVisible();
  };

  const visibleFriends = DUMMY_FRIENDS.filter((f) =>
    visibleUsernames.includes(f.username)
  );

  return (
    <div className="w-full">
      {/* Title */}
      {!collapsed && (
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h4 className="text-[11px] font-bold text-text-secondary tracking-wider uppercase">
            Friends
          </h4>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-lavender text-primary">
            {visibleFriends.length}
          </span>
        </div>
      )}

      {/* Avatars Grid (Matches Reference 1: compact 2-3 rows + '+' button) */}
      <div
        className={`flex flex-wrap items-center gap-2 ${
          collapsed ? 'justify-center' : ''
        }`}
      >
        {visibleFriends.map((friend) => (
          <div key={friend.id} onClick={onFriendClick}>
            <FriendAvatar
              friend={friend}
              size="md"
              showTooltip={true}
              showOnlineStatus={true}
            />
          </div>
        ))}

        {/* Circular '+' button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-[34px] h-[34px] rounded-full border-2 border-dashed border-borderBase hover:border-primary text-text-muted hover:text-primary hover:bg-lavender/50 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm group"
          title="Add or remove friends from sidebar"
          aria-label="Manage friends"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
        </button>
      </div>

      {/* Add / Manage Friends Modal */}
      <AddFriendsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        visibleUsernames={visibleUsernames}
        onToggleFriend={handleToggleFriend}
      />
    </div>
  );
}
