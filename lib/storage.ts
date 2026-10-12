'use client';

import {
  Task,
  RoutineItem,
  Subject,
  StudySession,
  ScheduleEvent,
  Deadline,
  UserProfile,
  TaskStatus
} from '@/types';
import {
  initialTasks,
  initialRoutines,
  initialSubjects,
  initialScheduleEvents,
  initialDeadlines,
  initialStudySessions,
  initialUserProfile
} from './mockData';

const STORAGE_KEYS = {
  TASKS: 'dayflow_tasks_v1',
  ROUTINES: 'dayflow_routines_v1',
  SUBJECTS: 'dayflow_subjects_v1',
  SCHEDULE: 'dayflow_schedule_v1',
  DEADLINES: 'dayflow_deadlines_v1',
  SESSIONS: 'dayflow_sessions_v1',
  PROFILE: 'dayflow_profile_v1'
};

function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('dayflow-sync', { detail: { key } }));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

// Tasks
export const storageService = {
  getTasks: (): Task[] => getFromStorage<Task[]>(STORAGE_KEYS.TASKS, initialTasks),
  saveTasks: (tasks: Task[]) => setToStorage(STORAGE_KEYS.TASKS, tasks),
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => {
    const tasks = storageService.getTasks();
    const updated = tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
    storageService.saveTasks(updated);
    return updated;
  },
  addTask: (task: Omit<Task, 'id' | 'taskNumber'>): Task => {
    const tasks = storageService.getTasks();
    const maxNum = tasks.reduce((max, t) => Math.max(max, t.taskNumber || 50), 52);
    const newTask: Task = {
      ...task,
      id: `t-${Date.now()}`,
      taskNumber: maxNum + 1,
    };
    storageService.saveTasks([newTask, ...tasks]);
    return newTask;
  },
  updateTask: (updatedTask: Task) => {
    const tasks = storageService.getTasks();
    const updated = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    storageService.saveTasks(updated);
    return updated;
  },
  deleteTask: (taskId: string) => {
    const tasks = storageService.getTasks();
    const filtered = tasks.filter(t => t.id !== taskId);
    storageService.saveTasks(filtered);
    return filtered;
  },

  // Routines
  getRoutines: (): RoutineItem[] => getFromStorage<RoutineItem[]>(STORAGE_KEYS.ROUTINES, initialRoutines),
  saveRoutines: (routines: RoutineItem[]) => setToStorage(STORAGE_KEYS.ROUTINES, routines),
  toggleRoutine: (routineId: string) => {
    const routines = storageService.getRoutines();
    const updated = routines.map(r => {
      if (r.id === routineId) {
        const nextCompleted = !r.completed;
        return {
          ...r,
          completed: nextCompleted,
          streak: nextCompleted ? r.streak + 1 : Math.max(0, r.streak - 1)
        };
      }
      return r;
    });
    storageService.saveRoutines(updated);
    return updated;
  },
  addRoutine: (item: Omit<RoutineItem, 'id' | 'streak'>): RoutineItem => {
    const routines = storageService.getRoutines();
    const newRoutine: RoutineItem = {
      ...item,
      id: `r-${Date.now()}`,
      streak: 1
    };
    const updated = [...routines, newRoutine];
    storageService.saveRoutines(updated);
    return newRoutine;
  },
  deleteRoutine: (id: string) => {
    const routines = storageService.getRoutines();
    const updated = routines.filter(r => r.id !== id);
    storageService.saveRoutines(updated);
    return updated;
  },

  // Subjects
  getSubjects: (): Subject[] => getFromStorage<Subject[]>(STORAGE_KEYS.SUBJECTS, initialSubjects),
  saveSubjects: (subjects: Subject[]) => setToStorage(STORAGE_KEYS.SUBJECTS, subjects),

  // Schedule Events
  getSchedule: (): ScheduleEvent[] => getFromStorage<ScheduleEvent[]>(STORAGE_KEYS.SCHEDULE, initialScheduleEvents),
  saveSchedule: (events: ScheduleEvent[]) => setToStorage(STORAGE_KEYS.SCHEDULE, events),
  toggleScheduleEvent: (id: string) => {
    const events = storageService.getSchedule();
    const updated = events.map(e => e.id === id ? { ...e, completed: !e.completed } : e);
    storageService.saveSchedule(updated);
    return updated;
  },
  addScheduleEvent: (event: Omit<ScheduleEvent, 'id'>): ScheduleEvent => {
    const events = storageService.getSchedule();
    const newEvent: ScheduleEvent = {
      ...event,
      id: `sch-${Date.now()}`
    };
    storageService.saveSchedule([...events, newEvent]);
    return newEvent;
  },

  // Deadlines
  getDeadlines: (): Deadline[] => getFromStorage<Deadline[]>(STORAGE_KEYS.DEADLINES, initialDeadlines),
  saveDeadlines: (deadlines: Deadline[]) => setToStorage(STORAGE_KEYS.DEADLINES, deadlines),
  toggleDeadline: (id: string) => {
    const deadlines = storageService.getDeadlines();
    const updated = deadlines.map(d => d.id === id ? { ...d, completed: !d.completed } : d);
    storageService.saveDeadlines(updated);
    return updated;
  },
  addDeadline: (deadline: Omit<Deadline, 'id'>): Deadline => {
    const deadlines = storageService.getDeadlines();
    const newDeadline: Deadline = {
      ...deadline,
      id: `dl-${Date.now()}`
    };
    storageService.saveDeadlines([...deadlines, newDeadline]);
    return newDeadline;
  },

  // Study Sessions
  getStudySessions: (): StudySession[] => getFromStorage<StudySession[]>(STORAGE_KEYS.SESSIONS, initialStudySessions),
  saveStudySessions: (sessions: StudySession[]) => setToStorage(STORAGE_KEYS.SESSIONS, sessions),
  addStudySession: (session: Omit<StudySession, 'id'>): StudySession => {
    const sessions = storageService.getStudySessions();
    const newSession: StudySession = {
      ...session,
      id: `ss-${Date.now()}`
    };
    storageService.saveStudySessions([newSession, ...sessions]);
    return newSession;
  },

  // Profile
  getProfile: (): UserProfile => getFromStorage<UserProfile>(STORAGE_KEYS.PROFILE, initialUserProfile),
  saveProfile: (profile: UserProfile) => setToStorage(STORAGE_KEYS.PROFILE, profile),
  
  // Reset all to sample defaults
  resetToDefaults: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.ROUTINES);
    localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
    localStorage.removeItem(STORAGE_KEYS.SCHEDULE);
    localStorage.removeItem(STORAGE_KEYS.DEADLINES);
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    window.location.reload();
  }
};
