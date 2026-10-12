import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  try {
    return twMerge(clsx(inputs));
  } catch {
    return clsx(inputs);
  }
}

export function formatTimeGreeting(): { greeting: string; icon: string } {
  const hour = new Date().getHours();
  if (hour < 12) {
    return { greeting: 'Good morning', icon: '🌅' };
  } else if (hour < 17) {
    return { greeting: 'Good afternoon', icon: '☀️' };
  } else {
    return { greeting: 'Good evening', icon: '🌙' };
  }
}

export function getCurrentDateFormatted(): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date());
}

export function getCurrentTimeFormatted(): string {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  return `${hours}.${minutes} ${ampm}`;
}
