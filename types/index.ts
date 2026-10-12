export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'completed';
export type TaskCategory = 'Study' | 'Projects' | 'Personal' | 'Exercise';
export type RoutineCategory = 'morning' | 'study' | 'exercise' | 'evening';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
}

export interface Task {
  id: string;
  taskNumber: number;
  title: string;
  description: string;
  category: TaskCategory;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  project: string;
  checklist: ChecklistItem[];
  comments: CommentItem[];
  assignees?: { name: string; avatar: string }[];
  attachmentsCount?: number;
}

export interface RoutineItem {
  id: string;
  title: string;
  time: string;
  category: RoutineCategory;
  completed: boolean;
  streak: number;
  notes?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  color: string; // gradient or pastel color token
  bgGradient: string;
  filesCount: number;
  weeklyHours: number;
  targetHours: number;
  progress: number;
  nextSession: string;
  examDate?: string;
}

export interface StudySession {
  id: string;
  subjectId: string;
  subjectName: string;
  topic: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  durationMinutes: number;
  completed: boolean;
  notes?: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  category: 'class' | 'study' | 'project' | 'workout';
  startTime: string;
  endTime: string;
  instructor?: string;
  room?: string;
  completed: boolean;
  date: string; // YYYY-MM-DD
  icon?: string;
}

export interface Deadline {
  id: string;
  title: string;
  subjectOrProject: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  tagline: string;
  avatar: string;
  streakDays: number;
  tasksCompletedTotal: number;
  studyHoursTotal: number;
}
