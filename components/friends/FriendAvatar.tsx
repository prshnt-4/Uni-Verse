'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Friend } from '@/lib/data/friends';
import { AvatarImage } from '@/components/avatars/AvatarImage';

interface FriendAvatarProps {
  friend: Friend;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTooltip?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  showOnlineStatus?: boolean;
}

export function FriendAvatar({
  friend,
  size = 'md',
  showTooltip = true,
  clickable = true,
  onClick,
  className = '',
  showOnlineStatus = false,
}: FriendAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Size mappings
  const sizeStyles = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-[34px] h-[34px] text-[12px]',
    lg: 'w-12 h-12 text-[15px]',
    xl: 'h-24 w-24 text-[24px] sm:h-[120px] sm:w-[120px]',
  };

  const statusDotSizes = {
    sm: 'w-1.5 h-1.5 right-0 bottom-0',
    md: 'w-2 h-2 right-0 bottom-0',
    lg: 'w-2.5 h-2.5 right-0.5 bottom-0.5',
    xl: 'w-4 h-4 right-1 bottom-1',
  };

  const avatarContent = (
    <div
      className={`relative inline-flex items-center justify-center rounded-full font-bold select-none transition-all duration-200 border ${
        friend.avatarBorderColor
      } ${sizeStyles[size]} ${className} ${
        clickable ? 'hover:scale-110 hover:shadow-soft active:scale-95' : ''
      }`}
      style={{
        backgroundColor: friend.avatarColor,
        color: friend.avatarTextColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <AvatarImage
        src={friend.avatar}
        alt={`${friend.name} profile avatar`}
        className="absolute inset-0 h-full w-full rounded-full object-cover"
        fallback={
          <span className="absolute inset-0 flex items-center justify-center">
            {friend.initials}
          </span>
        }
      />

      {showOnlineStatus && (
        <span
          className={`absolute rounded-full border-2 border-white ${
            friend.online ? 'bg-success' : 'bg-text-muted/60'
          } ${statusDotSizes[size]}`}
          title={friend.online ? 'Online' : 'Offline'}
        />
      )}

      {/* Tooltip on hover */}
      {showTooltip && isHovered && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none whitespace-nowrap bg-text-main text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl shadow-float animate-in fade-in zoom-in-95 duration-150">
          <div className="flex flex-col items-center">
            <span>{friend.name}</span>
            <span className="text-[9px] text-text-muted font-normal">{friend.displayName}</span>
          </div>
          {/* Arrow */}
          <div className="w-2 h-2 bg-text-main rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link
        href={`/friends/${friend.username}`}
        className="inline-block focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full"
        title={`${friend.name} (${friend.displayName})`}
      >
        {avatarContent}
      </Link>
    );
  }

  return avatarContent;
}
