'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  FolderKanban,
  Archive,
  BarChart3,
  LayoutDashboard,
  CalendarCheck2,
  GraduationCap,
  CalendarDays,
  ChevronDown,
  X
} from 'lucide-react';
import { FriendsSection } from '../friends/FriendsSection';

interface AppSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function AppSidebar({
  mobileOpen = false,
  onCloseMobile,
  collapsed = false,
  onToggleCollapse,
}: AppSidebarProps) {
  const pathname = usePathname();
  const [tasksSubmenuOpen, setTasksSubmenuOpen] = useState(true);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Submenu items under Tasks (from Reference 1)
  const taskSubItems = [
    { name: 'Priority', href: '/tasks?view=priority', badge: '13', badgeColor: 'bg-blueAccent-soft text-accent-blue' },
    { name: 'Board', href: '/projects', activeHighlight: true },
    { name: 'Inbox', href: '/tasks?view=inbox', badge: '2', badgeColor: 'bg-blueAccent-soft text-accent-blue' },
    { name: 'Activity', href: '/tasks?view=activity' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-text-main/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Permanently Fixed Sidebar (220px, height: 100vh) with rounded outer corners */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white border border-borderBase/70 rounded-[20px] overflow-hidden flex flex-col justify-between transition-all duration-300 ease-in-out shadow-soft ${
          collapsed ? 'w-[72px]' : 'w-[220px]'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ height: '100vh' }}
      >
        {/* Top Icons Bar (Header: shrink-0) */}
        <div className="shrink-0 p-3.5 pb-2.5 border-b border-borderBase/50 flex items-center justify-between">
          {/* Menu / Collapse Icon */}
          <button
            onClick={onToggleCollapse || onCloseMobile}
            className="p-1.5 rounded-xl text-text-secondary hover:text-text-main hover:bg-lavender-light transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-4 h-4 stroke-[2]" />
          </button>

          {!collapsed && (
            <>
              {/* Search Icon */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-1.5 rounded-xl text-text-secondary hover:text-text-main hover:bg-lavender-light transition-colors"
                title="Quick Search"
              >
                <Search className="w-4 h-4 stroke-[2]" />
              </button>

              {/* Notification Bell with indicator dot */}
              <div className="relative">
                <button
                  onClick={() => setShowNotificationModal(!showNotificationModal)}
                  className="p-1.5 rounded-xl text-text-secondary hover:text-text-main hover:bg-lavender-light transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 stroke-[2]" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-pinkAccent" />
                </button>
              </div>

              {/* Help / Question Icon */}
              <button
                onClick={() => setShowHelpModal(true)}
                className="p-1.5 rounded-xl text-text-secondary hover:text-text-main hover:bg-lavender-light transition-colors"
                title="Dayflow Shortcuts & Help"
              >
                <HelpCircle className="w-4 h-4 stroke-[2]" />
              </button>

              {/* Mobile close button */}
              {onCloseMobile && (
                <button
                  onClick={onCloseMobile}
                  className="lg:hidden p-1.5 rounded-xl text-text-secondary hover:bg-lavender"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Middle: Scrollable Navigation Container (flex-1 overflow-y-auto) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1">
          {/* 1. Projects */}
          <Link
            href="/projects"
            onClick={onCloseMobile}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl text-[13px] font-semibold transition-all ${
              pathname === '/projects' && !pathname.includes('view')
                ? 'bg-lavender text-primary shadow-inner-soft'
                : 'text-text-secondary hover:text-text-main hover:bg-lavender-light'
            }`}
            title="Projects"
          >
            <div className="w-4 h-4 flex items-center justify-center shrink-0">
              <FolderKanban className="w-4 h-4 stroke-[2]" />
            </div>
            {!collapsed && <span>Project</span>}
          </Link>

          {/* 2. Tasks with colored dot indicator */}
          <div>
            <button
              onClick={() => setTasksSubmenuOpen(!tasksSubmenuOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-[13px] font-semibold transition-all ${
                pathname.startsWith('/tasks')
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-main hover:bg-lavender-light'
              }`}
              title="Tasks"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                  <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                </div>
                {!collapsed && <span>Tasks</span>}
              </div>
              {!collapsed && (
                <ChevronDown
                  className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${
                    tasksSubmenuOpen ? 'rotate-180' : ''
                  }`}
                />
              )}
            </button>

            {/* TASKS SUBMENU (Priority, Board, Inbox, Activity) */}
            {!collapsed && tasksSubmenuOpen && (
              <div className="mt-0.5 space-y-0.5 pl-3">
                {taskSubItems.map((item) => {
                  const isBoardActive =
                    item.name === 'Board' &&
                    (pathname === '/projects' || pathname === '/tasks?view=board');
                  const isItemActive =
                    isBoardActive || pathname.includes(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all ${
                        isItemActive
                          ? 'bg-lavender text-primary font-bold shadow-soft'
                          : 'text-text-secondary hover:text-text-main hover:bg-lavender-light/50'
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECONDARY NAVIGATION (Archive, Analytics) */}
          <div className="pt-2 space-y-0.5">
            <Link
              href="/tasks?view=archive"
              onClick={onCloseMobile}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl text-[13px] font-semibold transition-all ${
                pathname.includes('archive')
                  ? 'bg-lavender text-primary shadow-inner-soft'
                  : 'text-text-secondary hover:text-text-main hover:bg-lavender-light'
              }`}
              title="Archive"
            >
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                <Archive className="w-4 h-4 stroke-[2]" />
              </div>
              {!collapsed && <span>Archive</span>}
            </Link>

            <Link
              href="/analytics"
              onClick={onCloseMobile}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl text-[13px] font-semibold transition-all ${
                pathname === '/analytics'
                  ? 'bg-lavender text-primary shadow-inner-soft'
                  : 'text-text-secondary hover:text-text-main hover:bg-lavender-light'
              }`}
              title="Analytics"
            >
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4 stroke-[2]" />
              </div>
              {!collapsed && <span>Analytics</span>}
            </Link>
          </div>

          {/* Quick Hubs Navigation */}
          {!collapsed && (
            <div className="pt-2.5 mt-2 border-t border-borderBase/40 space-y-0.5">
              <span className="text-[10px] font-bold text-text-muted px-2.5 uppercase tracking-wider block mb-1">
                Hubs
              </span>
              <Link
                href="/"
                onClick={onCloseMobile}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-colors ${
                  pathname === '/'
                    ? 'text-primary font-bold bg-lavender-light'
                    : 'text-text-secondary hover:text-text-main'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/routine"
                onClick={onCloseMobile}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-colors ${
                  pathname === '/routine'
                    ? 'text-primary font-bold bg-lavender-light'
                    : 'text-text-secondary hover:text-text-main'
                }`}
              >
                <CalendarCheck2 className="w-3.5 h-3.5 text-accent-blue" />
                <span>My Routine</span>
              </Link>
              <Link
                href="/study"
                onClick={onCloseMobile}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-colors ${
                  pathname === '/study'
                    ? 'text-primary font-bold bg-lavender-light'
                    : 'text-text-secondary hover:text-text-main'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-pinkAccent-dark" />
                <span>Study Planner</span>
              </Link>
              <Link
                href="/calendar"
                onClick={onCloseMobile}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-colors ${
                  pathname === '/calendar'
                    ? 'text-primary font-bold bg-lavender-light'
                    : 'text-text-secondary hover:text-text-main'
                }`}
              >
                <CalendarDays className="w-3.5 h-3.5 text-success" />
                <span>Calendar</span>
              </Link>
            </div>
          )}
        </div>

        {/* BOTTOM: Friends Section ALWAYS Pinned at bottom of 100vh sidebar (shrink-0 mt-auto) */}
        <div className="shrink-0 mt-auto p-3.5 pt-2.5 pb-3.5 border-t border-borderBase/60 bg-white">
          <FriendsSection onFriendClick={onCloseMobile} collapsed={collapsed} />
        </div>
      </aside>

      {/* Notifications Modal from Top Bell */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 bg-text-main/10 backdrop-blur-xs flex items-start justify-start p-4 lg:pl-16 pt-16">
          <div className="bg-white rounded-2xl w-72 p-4 shadow-float border border-borderBase animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-borderBase/60">
              <span className="text-[13px] font-bold text-text-main">Notifications</span>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-text-secondary hover:text-text-main"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-3 space-y-2 text-[12px]">
              <div className="p-2 rounded-xl bg-lavender-light text-text-main">
                🔔 <strong>Aanya</strong> completed ML Problem Set 4.
              </div>
              <div className="p-2 rounded-xl bg-blueAccent-soft/40 text-text-main">
                ⚡ <strong>Rahul</strong> deployed Auth microservice.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Modal from Top Search */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-float border border-borderBase animate-fade-in">
            <div className="flex items-center justify-between pb-3">
              <span className="text-[14px] font-bold text-text-main">Quick Jump</span>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-text-secondary hover:text-text-main"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, friends, courses..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-borderBase text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 mb-3"
            />
            <div className="space-y-1 text-[12px]">
              <Link
                href="/projects"
                onClick={() => setShowSearchModal(false)}
                className="block p-2 rounded-xl hover:bg-lavender-light font-medium text-text-main"
              >
                📁 Projects & Kanban Board
              </Link>
              <Link
                href="/friends/aanya"
                onClick={() => setShowSearchModal(false)}
                className="block p-2 rounded-xl hover:bg-lavender-light font-medium text-text-main"
              >
                👤 Aanya Sharma (@aanya)
              </Link>
              <Link
                href="/study"
                onClick={() => setShowSearchModal(false)}
                className="block p-2 rounded-xl hover:bg-lavender-light font-medium text-text-main"
              >
                🎓 Study Planner & Timetable
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal from Top Help Icon */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-text-main/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-float border border-borderBase animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-borderBase/60">
              <span className="text-[14px] font-bold text-text-main">Dayflow Quick Guide</span>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-text-secondary hover:text-text-main"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-3 text-[12px] text-text-secondary space-y-2">
              <p>• <strong>Friends:</strong> Click on any friend avatar in the sidebar to view their full profile, projects, and schedule.</p>
              <p>• <strong>Add Friends:</strong> Click the <strong>+</strong> circle button to manage which friends show up in your sidebar.</p>
              <p>• <strong>Kanban Board:</strong> Go to Projects or Tasks &rarr; Board to move cards between columns.</p>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-1.5 rounded-xl bg-primary text-white text-[12px] font-bold"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
