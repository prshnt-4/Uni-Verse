import { getAvatarById } from './avatars';

export interface FriendActivity {
  id: string;
  type: 'study' | 'task' | 'goal' | 'project';
  title: string;
  description: string;
  timestamp: string;
  badgeColor?: string;
}

export interface FriendProject {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'Review' | 'Planning';
  category: string;
}

export interface FriendScheduleItem {
  id: string;
  title: string;
  day: string;
  time: string;
  category: 'Class' | 'Study' | 'Project' | 'Workshop';
  location?: string;
}

export interface FriendProductivityPoint {
  day: string;
  score: number;
  studyHours: number;
  tasksCompleted: number;
}

export interface Friend {
  id: string;
  name: string;
  username: string; // e.g. "aanya" (without @)
  displayName: string; // e.g. "@aanya"
  role: string;
  avatar: string;
  bio: string;
  avatarColor: string; // Tailwind bg or hex
  avatarTextColor: string;
  avatarBgClass: string;
  avatarBorderColor: string;
  initials: string;
  online: boolean;
  statusMessage?: string;
  tasksCompleted: number;
  studyHours: number;
  activeProjects: number;
  productivityScore: number;
  activities: FriendActivity[];
  projects: FriendProject[];
  schedule: FriendScheduleItem[];
  weeklyProductivity: FriendProductivityPoint[];
}

export const DUMMY_FRIENDS: Friend[] = [
  {
    id: 'friend-1',
    name: 'Aanya Sharma',
    username: 'aanya',
    displayName: '@aanya',
    role: 'Student & Researcher',
    avatar: getAvatarById('regular-01').src,
    bio: 'Curious CS sophomore diving deep into Machine Learning and algorithms. Learning something new every single day.',
    avatarColor: '#F7DCE5',
    avatarTextColor: '#D9897E',
    avatarBgClass: 'bg-[#F7DCE5]',
    avatarBorderColor: 'border-[#F3AFA5]',
    initials: 'AS',
    online: true,
    statusMessage: 'Studying Linear Algebra',
    tasksCompleted: 42,
    studyHours: 26.5,
    activeProjects: 3,
    productivityScore: 94,
    weeklyProductivity: [
      { day: 'Mon', score: 85, studyHours: 3.5, tasksCompleted: 6 },
      { day: 'Tue', score: 90, studyHours: 4.2, tasksCompleted: 7 },
      { day: 'Wed', score: 78, studyHours: 3.0, tasksCompleted: 5 },
      { day: 'Thu', score: 95, studyHours: 5.0, tasksCompleted: 8 },
      { day: 'Fri', score: 88, studyHours: 4.0, tasksCompleted: 6 },
      { day: 'Sat', score: 96, studyHours: 6.0, tasksCompleted: 9 },
      { day: 'Sun', score: 80, studyHours: 3.8, tasksCompleted: 5 },
    ],
    activities: [
      {
        id: 'act-1',
        type: 'study',
        title: 'Completed ML Problem Set 4',
        description: 'Derived gradient descent updates for cross-entropy loss function.',
        timestamp: '2 hours ago',
      },
      {
        id: 'act-2',
        type: 'goal',
        title: 'Hit 14-Day Study Streak',
        description: 'Maintained consecutive daily study sessions in the library.',
        timestamp: 'Yesterday at 8:30 PM',
      },
      {
        id: 'act-3',
        type: 'project',
        title: 'Pushed code to Dayflow Research Repo',
        description: 'Added data normalization benchmarks for dataset pipeline.',
        timestamp: '2 days ago',
      },
      {
        id: 'act-4',
        type: 'task',
        title: 'Reviewed Calculus Lecture Slides',
        description: 'Read through Surface Integrals and Divergence theorem notes.',
        timestamp: '3 days ago',
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Neural Vision Classifier',
        description: 'Convolutional neural network for micro-gesture classification.',
        progress: 75,
        status: 'In Progress',
        category: 'Machine Learning',
      },
      {
        id: 'proj-2',
        title: 'Algorithm Visualizer',
        description: 'Interactive canvas explaining graph traversal algorithms.',
        progress: 100,
        status: 'Completed',
        category: 'Web Development',
      },
      {
        id: 'proj-3',
        title: 'Linear Algebra Cheat Sheet',
        description: 'Compact LaTeX notes for midterm revision.',
        progress: 50,
        status: 'In Progress',
        category: 'Academics',
      },
    ],
    schedule: [
      {
        id: 'sch-1',
        title: 'Machine Learning Lab',
        day: 'Today',
        time: '10:00 AM - 12:00 PM',
        category: 'Class',
        location: 'Virtual Lab 3',
      },
      {
        id: 'sch-2',
        title: 'Calculus Study Group',
        day: 'Tomorrow',
        time: '03:30 PM - 05:00 PM',
        category: 'Study',
        location: 'Campus Library B2',
      },
      {
        id: 'sch-3',
        title: 'Sprint Demo & Code Review',
        day: 'Thursday',
        time: '04:00 PM - 05:30 PM',
        category: 'Project',
        location: 'Study Hall',
      },
    ],
  },
  {
    id: 'friend-2',
    name: 'Rahul Verma',
    username: 'rahul',
    displayName: '@rahul',
    role: 'Developer & Tech Lead',
    avatar: getAvatarById('anime-01').src,
    bio: 'Full-stack developer building scalable microservices and clean React interfaces. Building systems that last.',
    avatarColor: '#DCEAFF',
    avatarTextColor: '#4B6EB5',
    avatarBgClass: 'bg-[#DCEAFF]',
    avatarBorderColor: 'border-[#6F91D5]',
    initials: 'RV',
    online: true,
    statusMessage: 'Refactoring API Gateways',
    tasksCompleted: 58,
    studyHours: 31.0,
    activeProjects: 4,
    productivityScore: 98,
    weeklyProductivity: [
      { day: 'Mon', score: 92, studyHours: 4.5, tasksCompleted: 9 },
      { day: 'Tue', score: 95, studyHours: 5.0, tasksCompleted: 10 },
      { day: 'Wed', score: 88, studyHours: 4.0, tasksCompleted: 8 },
      { day: 'Thu', score: 94, studyHours: 4.8, tasksCompleted: 9 },
      { day: 'Fri', score: 97, studyHours: 5.5, tasksCompleted: 11 },
      { day: 'Sat', score: 85, studyHours: 3.5, tasksCompleted: 6 },
      { day: 'Sun', score: 75, studyHours: 2.5, tasksCompleted: 4 },
    ],
    activities: [
      {
        id: 'act-1',
        type: 'project',
        title: 'Deployed Auth Microservice',
        description: 'Successfully released OAuth2 and JWT token rotation service.',
        timestamp: '1 hour ago',
      },
      {
        id: 'act-2',
        type: 'task',
        title: 'Fixed Memory Leak in Websockets',
        description: 'Patched event listener deregistration on disconnect.',
        timestamp: 'Yesterday at 4:15 PM',
      },
      {
        id: 'act-3',
        type: 'study',
        title: 'Read Distributed Systems Papers',
        description: 'Studied Raft consensus protocol and leader election benchmarks.',
        timestamp: '3 days ago',
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Dayflow Cloud Backend',
        description: 'High-performance sync engine for task and habit tracking.',
        progress: 88,
        status: 'In Progress',
        category: 'Cloud Services',
      },
      {
        id: 'proj-2',
        title: 'Redis Cache Proxy',
        description: 'Zero-latency cache wrapper for high volume user queries.',
        progress: 95,
        status: 'Review',
        category: 'Infrastructure',
      },
    ],
    schedule: [
      {
        id: 'sch-1',
        title: 'Backend Architecture Sync',
        day: 'Today',
        time: '02:00 PM - 03:00 PM',
        category: 'Project',
        location: 'Discord Huddle',
      },
      {
        id: 'sch-2',
        title: 'Database Index Optimization',
        day: 'Tomorrow',
        time: '11:00 AM - 01:00 PM',
        category: 'Study',
        location: 'Dev Station',
      },
    ],
  },
  {
    id: 'friend-3',
    name: 'Sneha Gupta',
    username: 'sneha',
    displayName: '@sneha',
    role: 'Student & Data Enthusiast',
    avatar: getAvatarById('japanese-anime-01').src,
    bio: 'Exploring Data Science, statistics, and neural architectures. Always with a cup of matcha tea and notebook.',
    avatarColor: '#E9E7F2',
    avatarTextColor: '#6255A5',
    avatarBgClass: 'bg-[#E9E7F2]',
    avatarBorderColor: 'border-[#8A7CC8]',
    initials: 'SG',
    online: false,
    statusMessage: 'Offline • Revision Time',
    tasksCompleted: 35,
    studyHours: 22.0,
    activeProjects: 2,
    productivityScore: 88,
    weeklyProductivity: [
      { day: 'Mon', score: 80, studyHours: 3.0, tasksCompleted: 5 },
      { day: 'Tue', score: 84, studyHours: 3.5, tasksCompleted: 6 },
      { day: 'Wed', score: 92, studyHours: 4.5, tasksCompleted: 8 },
      { day: 'Thu', score: 86, studyHours: 3.8, tasksCompleted: 6 },
      { day: 'Fri', score: 79, studyHours: 3.0, tasksCompleted: 5 },
      { day: 'Sat', score: 90, studyHours: 4.8, tasksCompleted: 7 },
      { day: 'Sun', score: 82, studyHours: 3.2, tasksCompleted: 5 },
    ],
    activities: [
      {
        id: 'act-1',
        type: 'study',
        title: 'Submitted Statistical Methods Quiz',
        description: 'Aced Bayesian Inference and hypothesis testing questions.',
        timestamp: '3 hours ago',
      },
      {
        id: 'act-2',
        type: 'task',
        title: 'Created Pandas Data Cleaning Script',
        description: 'Handled missing values and standardized datetime indices.',
        timestamp: 'Yesterday at 2:00 PM',
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Health Trends Dashboard',
        description: 'Exploratory data analysis on regional wellness datasets.',
        progress: 60,
        status: 'In Progress',
        category: 'Data Analytics',
      },
      {
        id: 'proj-2',
        title: 'NLP Sentiment Analyzer',
        description: 'Sentiment breakdown for product review streams.',
        progress: 100,
        status: 'Completed',
        category: 'AI / NLP',
      },
    ],
    schedule: [
      {
        id: 'sch-1',
        title: 'Statistics Seminar',
        day: 'Wednesday',
        time: '01:00 PM - 02:30 PM',
        category: 'Class',
        location: 'Lecture Hall 1',
      },
      {
        id: 'sch-2',
        title: 'Deep Learning Group Study',
        day: 'Friday',
        time: '04:00 PM - 06:00 PM',
        category: 'Study',
        location: 'Campus Lounge',
      },
    ],
  },
  {
    id: 'friend-4',
    name: 'Arjun Mehta',
    username: 'arjun',
    displayName: '@arjun',
    role: 'UI/UX Designer',
    avatar: getAvatarById('anime-02').src,
    bio: 'Product designer obsessed with micro-interactions, typography, and pastel palettes. Designing human interfaces.',
    avatarColor: '#F3AFA5',
    avatarTextColor: '#38304F',
    avatarBgClass: 'bg-[#F3AFA5]',
    avatarBorderColor: 'border-[#D9897E]',
    initials: 'AM',
    online: true,
    statusMessage: 'Prototyping Dayflow v2',
    tasksCompleted: 49,
    studyHours: 19.5,
    activeProjects: 3,
    productivityScore: 92,
    weeklyProductivity: [
      { day: 'Mon', score: 88, studyHours: 3.0, tasksCompleted: 7 },
      { day: 'Tue', score: 91, studyHours: 3.5, tasksCompleted: 8 },
      { day: 'Wed', score: 86, studyHours: 2.8, tasksCompleted: 6 },
      { day: 'Thu', score: 94, studyHours: 4.0, tasksCompleted: 9 },
      { day: 'Fri', score: 89, studyHours: 3.2, tasksCompleted: 7 },
      { day: 'Sat', score: 93, studyHours: 4.2, tasksCompleted: 8 },
      { day: 'Sun', score: 81, studyHours: 2.0, tasksCompleted: 4 },
    ],
    activities: [
      {
        id: 'act-1',
        type: 'project',
        title: 'Finalized Dayflow Component Library',
        description: 'Completed Figma design tokens for pastel cards and widgets.',
        timestamp: '30 mins ago',
      },
      {
        id: 'act-2',
        type: 'task',
        title: 'Exported Vector SVG Illustrations',
        description: 'Tending plant and umbrella illustrations delivered.',
        timestamp: 'Yesterday at 6:00 PM',
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Dayflow UI Design System',
        description: 'Comprehensive Tailwind CSS and Figma tokens for dashboard.',
        progress: 92,
        status: 'In Progress',
        category: 'Design System',
      },
      {
        id: 'proj-2',
        title: 'Mobile App Wireframes',
        description: 'Interactive prototype for iOS productivity client.',
        progress: 45,
        status: 'In Progress',
        category: 'Product Design',
      },
    ],
    schedule: [
      {
        id: 'sch-1',
        title: 'Design Critique Session',
        day: 'Today',
        time: '04:00 PM - 05:00 PM',
        category: 'Workshop',
        location: 'Design Studio 4',
      },
      {
        id: 'sch-2',
        title: 'User Testing Interviews',
        day: 'Thursday',
        time: '11:00 AM - 12:30 PM',
        category: 'Project',
        location: 'Zoom Call',
      },
    ],
  },
  {
    id: 'friend-5',
    name: 'Priya Singh',
    username: 'priya',
    displayName: '@priya',
    role: 'Student & Academic Scholar',
    avatar: getAvatarById('regular-02').src,
    bio: 'Electrical Engineering senior focused on analog signals, control systems, and renewable energy circuits.',
    avatarColor: '#9CCDB7',
    avatarTextColor: '#225E45',
    avatarBgClass: 'bg-[#9CCDB7]',
    avatarBorderColor: 'border-[#73B397]',
    initials: 'PS',
    online: true,
    statusMessage: 'Lab Prep: Bode Plots',
    tasksCompleted: 45,
    studyHours: 28.0,
    activeProjects: 2,
    productivityScore: 91,
    weeklyProductivity: [
      { day: 'Mon', score: 84, studyHours: 4.0, tasksCompleted: 6 },
      { day: 'Tue', score: 89, studyHours: 4.5, tasksCompleted: 7 },
      { day: 'Wed', score: 92, studyHours: 5.0, tasksCompleted: 8 },
      { day: 'Thu', score: 91, studyHours: 4.2, tasksCompleted: 7 },
      { day: 'Fri', score: 85, studyHours: 3.5, tasksCompleted: 6 },
      { day: 'Sat', score: 94, studyHours: 5.5, tasksCompleted: 9 },
      { day: 'Sun', score: 79, studyHours: 2.8, tasksCompleted: 4 },
    ],
    activities: [
      {
        id: 'act-1',
        type: 'study',
        title: 'Simulated Circuit in SPICE',
        description: 'Calculated gain margin and phase margin for second-order op-amp.',
        timestamp: '4 hours ago',
      },
      {
        id: 'act-2',
        type: 'goal',
        title: 'Target: 25h Study Week Achieved',
        description: 'Finished all problem sets before the weekend deadline.',
        timestamp: '2 days ago',
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Solar Inverter Design',
        description: 'DC-AC inverter hardware simulation with MPPT tracking.',
        progress: 80,
        status: 'In Progress',
        category: 'Power Systems',
      },
      {
        id: 'proj-2',
        title: 'DSP Audio Filter',
        description: 'Butterworth lowpass filter implemented on ARM Cortex.',
        progress: 100,
        status: 'Completed',
        category: 'Hardware',
      },
    ],
    schedule: [
      {
        id: 'sch-1',
        title: 'Analog Systems Lab',
        day: 'Today',
        time: '01:30 PM - 03:30 PM',
        category: 'Class',
        location: 'Electronics Lab A',
      },
      {
        id: 'sch-2',
        title: 'Control Systems Quiz',
        day: 'Friday',
        time: '09:00 AM - 10:30 AM',
        category: 'Class',
        location: 'Exam Hall 2',
      },
    ],
  },
  {
    id: 'friend-6',
    name: 'Kabir Malhotra',
    username: 'kabir',
    displayName: '@kabir',
    role: 'Developer & Open Source Contributor',
    avatar: getAvatarById('japanese-anime-02').src,
    bio: 'Software engineer keen on compilers, Rust, and systems programming. Contributing to open-source developer tooling.',
    avatarColor: '#C9C5DE',
    avatarTextColor: '#38304F',
    avatarBgClass: 'bg-[#C9C5DE]',
    avatarBorderColor: 'border-[#6255A5]',
    initials: 'KM',
    online: false,
    statusMessage: 'Compiling Rust crates',
    tasksCompleted: 53,
    studyHours: 29.5,
    activeProjects: 3,
    productivityScore: 95,
    weeklyProductivity: [
      { day: 'Mon', score: 91, studyHours: 4.2, tasksCompleted: 8 },
      { day: 'Tue', score: 94, studyHours: 4.8, tasksCompleted: 9 },
      { day: 'Wed', score: 89, studyHours: 4.0, tasksCompleted: 7 },
      { day: 'Thu', score: 96, studyHours: 5.2, tasksCompleted: 10 },
      { day: 'Fri', score: 92, studyHours: 4.5, tasksCompleted: 8 },
      { day: 'Sat', score: 97, studyHours: 5.8, tasksCompleted: 11 },
      { day: 'Sun', score: 82, studyHours: 3.0, tasksCompleted: 5 },
    ],
    activities: [
      {
        id: 'act-1',
        type: 'project',
        title: 'Merged Pull Request on Rust AST Parser',
        description: 'Reduced parsing allocations by 18% with smallvec.',
        timestamp: '5 hours ago',
      },
      {
        id: 'act-2',
        type: 'task',
        title: 'Configured CI/CD GitHub Actions',
        description: 'Added multi-platform matrix tests for macOS and Linux.',
        timestamp: 'Yesterday at 11:00 AM',
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Fast Markdown Compiler',
        description: 'Zero-copy CommonMark parser built in Rust and WebAssembly.',
        progress: 70,
        status: 'In Progress',
        category: 'Compilers',
      },
      {
        id: 'proj-2',
        title: 'CLI Productivity Timer',
        description: 'Terminal-based Pomodoro and task sync tool.',
        progress: 100,
        status: 'Completed',
        category: 'Dev Tools',
      },
    ],
    schedule: [
      {
        id: 'sch-1',
        title: 'Compiler Design Lecture',
        day: 'Thursday',
        time: '10:00 AM - 11:30 AM',
        category: 'Class',
        location: 'Hall C-102',
      },
      {
        id: 'sch-2',
        title: 'Open Source Community Call',
        day: 'Saturday',
        time: '06:00 PM - 07:00 PM',
        category: 'Workshop',
        location: 'Jitsi Meet',
      },
    ],
  },
];

export function getAllFriends(): Friend[] {
  return DUMMY_FRIENDS;
}

export function getFriendByUsername(username: string): Friend | undefined {
  const clean = username.toLowerCase().replace(/^@/, '');
  return DUMMY_FRIENDS.find((f) => f.username.toLowerCase() === clean);
}
