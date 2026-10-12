'use client';

import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import {
  AVATAR_CATEGORIES,
  AVATARS,
  AvatarCategory,
  getAvatarsByCategory,
} from '@/lib/data/avatars';
import { AvatarImage } from './AvatarImage';

interface AvatarPickerModalProps {
  isOpen: boolean;
  selectedAvatar: string;
  onSave: (avatar: string) => void;
  onClose: () => void;
}

export function AvatarPickerModal({
  isOpen,
  selectedAvatar,
  onSave,
  onClose,
}: AvatarPickerModalProps) {
  const [category, setCategory] = useState<AvatarCategory>('regular');
  const [draftAvatar, setDraftAvatar] = useState(selectedAvatar);
  const avatars = getAvatarsByCategory(category);
  const selectedImage = AVATARS.find((avatar) => avatar.src === draftAvatar);
  const previewAlt = selectedImage?.alt ?? 'Selected profile avatar';

  useEffect(() => {
    if (isOpen) {
      setDraftAvatar(selectedAvatar);
      setCategory('regular');
    }
  }, [isOpen, selectedAvatar]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-text-main/25 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-picker-title"
        className="flex max-h-[min(90vh,760px)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-borderBase bg-white shadow-float"
      >
        <header className="flex items-start justify-between gap-4 border-b border-borderBase/60 px-5 py-4 sm:px-7 sm:py-5">
          <div>
            <h2 id="avatar-picker-title" className="text-lg font-extrabold text-text-main">
              Choose Your Avatar
            </h2>
            <p className="mt-1 text-[12px] text-text-secondary">
              Pick an avatar that represents you.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close avatar selection"
            className="rounded-xl p-2 text-text-secondary transition-colors hover:bg-lavender-light hover:text-text-main"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex gap-1 overflow-x-auto border-b border-borderBase/50 px-4 pt-3 sm:px-6">
            {AVATAR_CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={category === item.id}
                onClick={() => setCategory(item.id)}
                className={`shrink-0 rounded-t-xl px-3 py-2.5 text-[12px] font-bold transition-colors sm:px-4 ${
                  category === item.id
                    ? 'border-b-2 border-primary bg-lavender-light text-primary'
                    : 'text-text-secondary hover:bg-lavender-light/60 hover:text-text-main'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            aria-label={AVATAR_CATEGORIES.find((item) => item.id === category)?.label}
            className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5"
          >
            <div className="grid grid-cols-4 justify-items-center gap-x-2 gap-y-4 sm:grid-cols-6 sm:gap-x-4 sm:gap-y-5 md:grid-cols-8">
              {avatars.map((avatar) => {
                const isSelected = draftAvatar === avatar.src;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    aria-label={avatar.alt}
                    aria-pressed={isSelected}
                    title={avatar.alt}
                    onClick={() => setDraftAvatar(avatar.src)}
                    className={`group relative h-[58px] w-[58px] overflow-hidden rounded-full border-[3px] bg-lavender-light shadow-sm transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/40 sm:h-[66px] sm:w-[66px] ${
                      isSelected ? 'border-primary ring-2 ring-primary/15' : 'border-white hover:border-primary/50'
                    }`}
                  >
                    <AvatarImage
                      src={avatar.src}
                      alt={avatar.alt}
                      className="h-full w-full rounded-full object-cover"
                      fallback={
                        <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-primary">
                          Avatar
                        </span>
                      }
                    />
                    {isSelected && (
                      <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-primary text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-borderBase/60 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/30 bg-lavender-light">
              <AvatarImage
                src={draftAvatar}
                alt={previewAlt}
                className="h-full w-full object-cover"
                fallback={
                  <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-primary">
                    Preview
                  </span>
                }
              />
            </div>
            <div>
              <p className="text-[11px] font-bold text-text-main">Selected avatar</p>
              <p className="text-[10px] text-text-secondary">{previewAlt}</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-borderBase px-4 py-2.5 text-[12px] font-bold text-text-secondary transition-colors hover:bg-lavender-light"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSave(draftAvatar)}
              className="rounded-xl bg-primary px-5 py-2.5 text-[12px] font-bold text-white shadow-soft transition-colors hover:bg-primary-hover"
            >
              Save Avatar
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
