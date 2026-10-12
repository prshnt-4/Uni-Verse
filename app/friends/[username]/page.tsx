import React from 'react';
import Link from 'next/link';
import { getFriendByUsername, getAllFriends, DUMMY_FRIENDS } from '@/lib/data/friends';
import { FriendProfileClient } from '@/components/friends/FriendProfileClient';
import { FriendAvatar } from '@/components/friends/FriendAvatar';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export function generateStaticParams() {
  return DUMMY_FRIENDS.map((f) => ({
    username: f.username,
  }));
}

export default function FriendProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const username = params?.username;
  const friend = username ? getFriendByUsername(username) : undefined;
  const allFriends = getAllFriends();

  if (!friend) {
    return (
      <DashboardLayout showRightPanel={false}>
        <div className="py-12 px-4 max-w-xl mx-auto text-center animate-fade-in">
          <div className="w-16 h-16 rounded-3xl bg-pinkAccent-soft text-pinkAccent-dark flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-text-main">
            Friend Profile Not Found
          </h2>
          <p className="text-[13px] text-text-secondary mt-1.5 mb-6">
            We couldn&apos;t find a friend profile with username &ldquo;{username}&rdquo;. Choose from our community below:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {allFriends.map((f) => (
              <Link
                key={f.id}
                href={`/friends/${f.username}`}
                className="p-3 rounded-2xl bg-white border border-borderBase hover:border-primary hover:shadow-soft transition-all flex flex-col items-center"
              >
                <FriendAvatar friend={f} size="md" clickable={false} />
                <span className="text-[12px] font-bold text-text-main mt-2">{f.name}</span>
                <span className="text-[10px] text-text-muted">{f.displayName}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-[13px] font-bold shadow-soft hover:bg-primary-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return <FriendProfileClient friend={friend} />;
}
