'use client';

import { DUMMY_FRIENDS, Friend } from './data/friends';

const VISIBLE_FRIENDS_KEY = 'dayflow_visible_friends_v1';
const FRIEND_STATUS_PREFIX = 'dayflow_friend_status_';
const CHAT_PREFIX = 'dayflow_chat_';

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  senderName: string;
  text: string;
  timestamp: string;
}

export const friendsStorage = {
  // Visible friends in sidebar
  getVisibleFriendUsernames: (): string[] => {
    if (typeof window === 'undefined') {
      return DUMMY_FRIENDS.map((f) => f.username);
    }
    try {
      const stored = localStorage.getItem(VISIBLE_FRIENDS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading visible friends', e);
    }
    return DUMMY_FRIENDS.map((f) => f.username);
  },

  setVisibleFriendUsernames: (usernames: string[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(VISIBLE_FRIENDS_KEY, JSON.stringify(usernames));
      window.dispatchEvent(new CustomEvent('dayflow-friends-sync'));
    } catch (e) {
      console.error('Error saving visible friends', e);
    }
  },

  addFriendToSidebar: (username: string) => {
    const current = friendsStorage.getVisibleFriendUsernames();
    if (!current.includes(username)) {
      const updated = [...current, username];
      friendsStorage.setVisibleFriendUsernames(updated);
    }
  },

  removeFriendFromSidebar: (username: string) => {
    const current = friendsStorage.getVisibleFriendUsernames();
    const updated = current.filter((u) => u !== username);
    friendsStorage.setVisibleFriendUsernames(updated);
  },

  // Relationship status (Friends / Following / Not Following)
  getFriendStatus: (username: string): boolean => {
    if (typeof window === 'undefined') return true; // default true for dummy friends
    try {
      const val = localStorage.getItem(`${FRIEND_STATUS_PREFIX}${username}`);
      if (val !== null) return JSON.parse(val);
    } catch (e) {}
    return true; // default following
  },

  toggleFriendStatus: (username: string): boolean => {
    if (typeof window === 'undefined') return true;
    const current = friendsStorage.getFriendStatus(username);
    const next = !current;
    try {
      localStorage.setItem(`${FRIEND_STATUS_PREFIX}${username}`, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('dayflow-friends-sync'));
    } catch (e) {}
    return next;
  },

  // Messages per friend
  getMessages: (username: string, friendName: string): ChatMessage[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(`${CHAT_PREFIX}${username}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    // Initial default messages for realistic feel
    const initialMsgs: ChatMessage[] = [
      {
        id: 'msg-init-1',
        sender: 'them',
        senderName: friendName,
        text: `Hey Prashant! How is your Dayflow routine going today?`,
        timestamp: 'Today at 10:30 AM',
      },
      {
        id: 'msg-init-2',
        sender: 'me',
        senderName: 'Prashant',
        text: `Hey! Going great, just checking off morning study sessions and the Kanban board.`,
        timestamp: 'Today at 10:45 AM',
      },
    ];
    return initialMsgs;
  },

  sendMessage: (username: string, text: string, friendName: string): ChatMessage[] => {
    if (typeof window === 'undefined') return [];
    const current = friendsStorage.getMessages(username, friendName);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      senderName: 'Prashant',
      text,
      timestamp: 'Just now',
    };
    const updated = [...current, newMsg];
    try {
      localStorage.setItem(`${CHAT_PREFIX}${username}`, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('dayflow-chat-sync', { detail: { username } }));
    } catch (e) {}
    return updated;
  },
};
