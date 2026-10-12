'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, MessageCircle } from 'lucide-react';
import { Friend } from '@/lib/data/friends';
import { friendsStorage, ChatMessage } from '@/lib/friendsStorage';
import { FriendAvatar } from './FriendAvatar';

interface MessageModalProps {
  friend: Friend;
  isOpen: boolean;
  onClose: () => void;
}

export function MessageModal({ friend, isOpen, onClose }: MessageModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMessages = () => {
    setMessages(friendsStorage.getMessages(friend.username, friend.name));
  };

  useEffect(() => {
    if (isOpen) {
      loadMessages();
    }
  }, [isOpen, friend.username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const updated = friendsStorage.sendMessage(friend.username, inputText.trim(), friend.name);
    setMessages(updated);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[520px] p-5 shadow-float border border-borderBase flex flex-col justify-between animate-fade-in relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-borderBase/60">
          <div className="flex items-center gap-3">
            <FriendAvatar friend={friend} size="md" clickable={false} showTooltip={false} showOnlineStatus={true} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-bold text-text-main">{friend.name}</h3>
                <span className="text-[11px] text-text-muted">{friend.displayName}</span>
              </div>
              <p className="text-[10px] text-success font-medium">
                {friend.online ? 'Online now' : 'Active earlier today'}
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

        {/* Local Demo Disclaimer Badge */}
        <div className="my-2 px-3 py-1.5 rounded-xl bg-lavender-light border border-borderBase/60 text-center">
          <span className="text-[10px] text-text-secondary flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Local demo chat • Messages stored safely in your browser session</span>
          </span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto space-y-3 px-1 py-2">
          {messages.map((msg) => {
            const isMe = msg.sender === 'me';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-[12px] leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-primary text-white rounded-br-xs'
                      : 'bg-lavender-light text-text-main border border-borderBase/60 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-text-muted mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="pt-3 border-t border-borderBase/60 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${friend.name.split(' ')[0]}...`}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-borderBase text-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20 bg-lavender-light/30"
          />
          <button
            type="submit"
            className="p-2.5 rounded-2xl bg-primary text-white hover:bg-primary-hover shadow-soft transition-colors"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
