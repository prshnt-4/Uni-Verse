import { Task, RoutineItem, Subject, StudySession, ScheduleEvent, Deadline, UserProfile } from '@/types';
import { getAvatarById } from './data/avatars';

export const initialUserProfile: UserProfile = {
  name: 'Prashant Kumar',
  role: 'Student & Developer',
  tagline: 'Building better habits every day.',
  avatar: getAvatarById('regular-01').src,
  streakDays: 14,
  tasksCompletedTotal: 48,
  studyHoursTotal: 64.5,
};

export const initialTasks: Task[] = [
  {
    id: 't-1',
    taskNumber: 53,
    title: 'Load-Up Microservices',
    description: 'Setup API gateways and verify communication between auth service and database clusters.',
    category: 'Projects',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-10-14',
    project: 'Dayflow Cloud',
    checklist: [
      { id: 'c1', text: 'Define Docker network configs', completed: true },
      { id: 'c2', text: 'Configure CORS headers & rate limits', completed: true },
      { id: 'c3', text: 'Write health-check endpoints', completed: false }
    ],
    comments: [
      {
        id: 'cm1',
        author: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'The gateway proxy rules are verified and passing unit tests.',
        date: 'Today, 10:15 AM'
      }
    ],
    assignees: [
      { name: 'Prashant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' }
    ],
    attachmentsCount: 3
  },
  {
    id: 't-2',
    taskNumber: 54,
    title: 'Clean-Up Database Schema',
    description: 'Optimize indexes on user analytics tables and drop legacy columns.',
    category: 'Projects',
    priority: 'medium',
    status: 'todo',
    dueDate: '2026-10-18',
    project: 'Dayflow Cloud',
    checklist: [
      { id: 'c4', text: 'Backup staging DB instance', completed: true },
      { id: 'c5', text: 'Run migration script dry-run', completed: false }
    ],
    comments: [],
    assignees: [
      { name: 'Prashant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
    ],
    attachmentsCount: 1
  },
  {
    id: 't-3',
    taskNumber: 55,
    title: 'Finish-Up Calculus Assignment',
    description: 'Complete problems 12 through 28 on Multivariable Integrals and vector fields.',
    category: 'Study',
    priority: 'high',
    status: 'todo',
    dueDate: '2026-10-15',
    project: 'Academic Core',
    checklist: [
      { id: 'c6', text: 'Solve Stokes Theorem questions', completed: true },
      { id: 'c7', text: 'Verify results in WolframAlpha', completed: false },
      { id: 'c8', text: 'Export PDF solutions', completed: false }
    ],
    comments: [],
    assignees: [
      { name: 'Prashant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
    ],
    attachmentsCount: 2
  },
  {
    id: 't-4',
    taskNumber: 56,
    title: 'Machine Learning Model Fine-Tuning',
    description: 'Train LoRA adapters on domain specific dataset for sentiment classification.',
    category: 'Study',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-10-16',
    project: 'AI Research',
    checklist: [
      { id: 'c9', text: 'Preprocess tokenized sequences', completed: true },
      { id: 'c10', text: 'Evaluate validation loss', completed: true },
      { id: 'c11', text: 'Plot ROC curve', completed: false }
    ],
    comments: [],
    assignees: [
      { name: 'Prashant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
    ],
    attachmentsCount: 4
  },
  {
    id: 't-5',
    taskNumber: 57,
    title: 'Morning 5km Run & Stretching',
    description: 'Cardio training session followed by 15min full body mobility stretch.',
    category: 'Exercise',
    priority: 'low',
    status: 'completed',
    dueDate: '2026-10-12',
    project: 'Health & Wellness',
    checklist: [
      { id: 'c12', text: 'Warm up drills', completed: true },
      { id: 'c13', text: '5km steady pace', completed: true }
    ],
    comments: [],
    assignees: [],
    attachmentsCount: 0
  },
  {
    id: 't-6',
    taskNumber: 58,
    title: 'Analog Electronics Lab Report',
    description: 'Summarize oscilloscope readings and Bode plot analysis of second-order active lowpass filters.',
    category: 'Study',
    priority: 'high',
    status: 'backlog',
    dueDate: '2026-10-20',
    project: 'Academic Core',
    checklist: [
      { id: 'c14', text: 'Include circuit diagrams', completed: false },
      { id: 'c15', text: 'Calculate cutoff frequency error margins', completed: false }
    ],
    comments: [],
    assignees: [
      { name: 'Prashant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
    ],
    attachmentsCount: 1
  },
  {
    id: 't-7',
    taskNumber: 59,
    title: 'Weekly Budget Review',
    description: 'Categorize receipts and plan expenses for the upcoming project semester.',
    category: 'Personal',
    priority: 'low',
    status: 'completed',
    dueDate: '2026-10-11',
    project: 'Personal Life',
    checklist: [
      { id: 'c16', text: 'Sync bank transactions', completed: true },
      { id: 'c17', text: 'Allocate savings buffer', completed: true }
    ],
    comments: [],
    assignees: [],
    attachmentsCount: 0
  }
];

export const initialRoutines: RoutineItem[] = [
  { id: 'r-1', title: 'Wake up & Hydrate (500ml water)', time: '07:00 AM', category: 'morning', completed: true, streak: 12 },
  { id: 'r-2', title: 'Morning Exercise & Mobility', time: '07:30 AM', category: 'exercise', completed: true, streak: 8 },
  { id: 'r-3', title: 'Deep Work: Core Study Block', time: '09:00 AM', category: 'study', completed: true, streak: 14 },
  { id: 'r-4', title: 'Project Development & Coding', time: '11:00 AM', category: 'study', completed: true, streak: 10 },
  { id: 'r-5', title: 'Attend Scheduled University Classes', time: '02:00 PM', category: 'study', completed: false, streak: 5 },
  { id: 'r-6', title: 'Revision & Active Recall Flashcards', time: '05:00 PM', category: 'study', completed: false, streak: 9 },
  { id: 'r-7', title: 'Practice Coding (Algorithms / LeetCode)', time: '08:00 PM', category: 'study', completed: false, streak: 11 },
  { id: 'r-8', title: 'Daily Review & Plan Tomorrow', time: '10:30 PM', category: 'evening', completed: false, streak: 14 },
];

export const initialSubjects: Subject[] = [
  {
    id: 's-1',
    name: 'Mathematics & Calculus',
    code: 'MATH 301',
    teacher: 'Mrs. Endah Pratama',
    color: '#6F91D5',
    bgGradient: 'from-[#4B6EB5] to-[#6F91D5]',
    filesCount: 14,
    weeklyHours: 6.5,
    targetHours: 8.0,
    progress: 82,
    nextSession: 'Tomorrow, 07:30 AM',
    examDate: '2026-11-04'
  },
  {
    id: 's-2',
    name: 'Analog Electronics',
    code: 'ELEC 204',
    teacher: 'Prof. Cole Chandler',
    color: '#6255A5',
    bgGradient: 'from-[#38304F] to-[#6255A5]',
    filesCount: 18,
    weeklyHours: 4.5,
    targetHours: 6.0,
    progress: 75,
    nextSession: 'Wed, 10:30 AM',
    examDate: '2026-11-12'
  },
  {
    id: 's-3',
    name: 'Machine Learning',
    code: 'CS 440',
    teacher: 'Dr. Dimas Surya',
    color: '#F3AFA5',
    bgGradient: 'from-[#D9897E] to-[#F3AFA5]',
    filesCount: 22,
    weeklyHours: 5.5,
    targetHours: 7.0,
    progress: 88,
    nextSession: 'Today, 03:00 PM',
    examDate: '2026-11-18'
  },
  {
    id: 's-4',
    name: 'Control Systems',
    code: 'MECH 310',
    teacher: 'Dr. Helena Lowe',
    color: '#9CCDB7',
    bgGradient: 'from-[#73B397] to-[#9CCDB7]',
    filesCount: 12,
    weeklyHours: 3.0,
    targetHours: 5.0,
    progress: 60,
    nextSession: 'Thu, 01:00 PM',
    examDate: '2026-11-22'
  },
  {
    id: 's-5',
    name: 'Computer Vision',
    code: 'CS 480',
    teacher: 'Mr. Bana Wijaya',
    color: '#F2C98A',
    bgGradient: 'from-[#D8A65A] to-[#F2C98A]',
    filesCount: 16,
    weeklyHours: 4.0,
    targetHours: 5.0,
    progress: 72,
    nextSession: 'Friday, 10:00 AM',
    examDate: '2026-11-28'
  }
];

export const initialScheduleEvents: ScheduleEvent[] = [
  {
    id: 'sch-1',
    title: 'Calculus: Vector Fields',
    category: 'class',
    startTime: '07:30 AM',
    endTime: '09:00 AM',
    instructor: 'Mrs. Endah',
    room: 'Hall B-201',
    completed: true,
    date: '2026-10-12',
    icon: 'Calculator'
  },
  {
    id: 'sch-2',
    title: 'Machine Learning: Neural Networks',
    category: 'class',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    instructor: 'Mr. Dimas',
    room: 'Lab 4',
    completed: true,
    date: '2026-10-12',
    icon: 'Brain'
  },
  {
    id: 'sch-3',
    title: 'Computer Vision Lab',
    category: 'class',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    instructor: 'Mr. Bana',
    room: 'Virtual Classroom',
    completed: true,
    date: '2026-10-12',
    icon: 'Eye'
  },
  {
    id: 'sch-4',
    title: 'Project Development (Dayflow UI)',
    category: 'project',
    startTime: '12:00 PM',
    endTime: '02:00 PM',
    instructor: 'Self / Dev Sprint',
    room: 'Workspace',
    completed: false,
    date: '2026-10-12',
    icon: 'Code'
  },
  {
    id: 'sch-5',
    title: 'Machine Learning Assignment Prep',
    category: 'study',
    startTime: '03:00 PM',
    endTime: '04:30 PM',
    instructor: 'Self Study',
    room: 'Library',
    completed: false,
    date: '2026-10-12',
    icon: 'BookOpen'
  },
  {
    id: 'sch-6',
    title: 'Workout & Active Stretching',
    category: 'workout',
    startTime: '05:00 PM',
    endTime: '06:00 PM',
    instructor: 'Gym / Track',
    room: 'Fitness Center',
    completed: false,
    date: '2026-10-12',
    icon: 'Dumbbell'
  }
];

export const initialDeadlines: Deadline[] = [
  {
    id: 'dl-1',
    title: 'Calculus Assignment 4 Submission',
    subjectOrProject: 'MATH 301',
    dueDate: 'Oct 15, 2026',
    priority: 'high',
    completed: false
  },
  {
    id: 'dl-2',
    title: 'Dayflow Cloud Architecture Doc',
    subjectOrProject: 'Dayflow Cloud',
    dueDate: 'Oct 18, 2026',
    priority: 'medium',
    completed: false
  },
  {
    id: 'dl-3',
    title: 'Analog Electronics Lab Report',
    subjectOrProject: 'ELEC 204',
    dueDate: 'Oct 20, 2026',
    priority: 'high',
    completed: false
  },
  {
    id: 'dl-4',
    title: 'Control Systems Mid-Sem Quiz',
    subjectOrProject: 'MECH 310',
    dueDate: 'Oct 24, 2026',
    priority: 'low',
    completed: false
  }
];

export const initialStudySessions: StudySession[] = [
  {
    id: 'ss-1',
    subjectId: 's-1',
    subjectName: 'Mathematics & Calculus',
    topic: 'Surface Integrals & Divergence Theorem',
    date: '2026-10-12',
    startTime: '07:30 AM',
    endTime: '09:00 AM',
    durationMinutes: 90,
    completed: true,
    notes: 'Understood flux calculations across closed surfaces.'
  },
  {
    id: 'ss-2',
    subjectId: 's-3',
    subjectName: 'Machine Learning',
    topic: 'Backpropagation & Loss Optimization',
    date: '2026-10-12',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    durationMinutes: 60,
    completed: true,
    notes: 'Gradient descent variations: Adam vs RMSProp.'
  },
  {
    id: 'ss-3',
    subjectId: 's-2',
    subjectName: 'Analog Electronics',
    topic: 'Op-Amp Frequency Response',
    date: '2026-10-13',
    startTime: '10:30 AM',
    endTime: '12:00 PM',
    durationMinutes: 90,
    completed: false
  },
  {
    id: 'ss-4',
    subjectId: 's-4',
    subjectName: 'Control Systems',
    topic: 'Root Locus Stability Criteria',
    date: '2026-10-14',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    durationMinutes: 90,
    completed: false
  }
];

export const productivityOverviewData = [
  { day: 'Mon', tasks: 5, studyHours: 3.5, score: 72 },
  { day: 'Tue', tasks: 7, studyHours: 4.2, score: 81 },
  { day: 'Wed', tasks: 4, studyHours: 3.0, score: 68 },
  { day: 'Thu', tasks: 8, studyHours: 5.0, score: 92 },
  { day: 'Fri', tasks: 6, studyHours: 4.0, score: 79 },
  { day: 'Sat', tasks: 9, studyHours: 6.2, score: 95 },
  { day: 'Sun', tasks: 5, studyHours: 3.8, score: 76 },
];

export const studyHoursDistribution = [
  { day: 'M', hours: 3.5, target: 4.0 },
  { day: 'T', hours: 4.2, target: 4.0 },
  { day: 'W', hours: 3.0, target: 4.0 },
  { day: 'T', hours: 5.0, target: 4.0 },
  { day: 'F', hours: 4.0, target: 4.0 },
  { day: 'S', hours: 6.2, target: 5.0 },
  { day: 'S', hours: 3.8, target: 4.0 },
];

export const taskCategoryDistribution = [
  { name: 'Study', value: 45, color: '#6255A5' },
  { name: 'Projects', value: 30, color: '#6F91D5' },
  { name: 'Personal', value: 15, color: '#F3AFA5' },
  { name: 'Exercise', value: 10, color: '#9CCDB7' },
];
