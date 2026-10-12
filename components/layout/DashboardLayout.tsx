'use client';

import React, { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { TopNavbar } from './TopNavbar';
import { RightPanel } from './RightPanel';

interface DashboardLayoutProps {
  children: React.ReactNode;
  showRightPanel?: boolean;
}

export function DashboardLayout({
  children,
  showRightPanel = true
}: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background text-text-main relative selection:bg-primary/20 selection:text-primary">
      {/* Ambient background blur blobs */}
      <div className="fixed top-12 left-10 w-72 h-72 rounded-full bg-lavender/70 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-20 right-10 w-96 h-96 rounded-full bg-pinkAccent-soft/60 blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/2 left-1/3 w-80 h-80 rounded-full bg-blueAccent-soft/50 blur-3xl pointer-events-none -z-10" />

      {/* Permanently Fixed Left Sidebar (220px on desktop) */}
      <AppSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area: padded by 220px on desktop to prevent overlap */}
      <div className="lg:pl-[220px] min-h-screen flex flex-col transition-all duration-300">
        <TopNavbar
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          {/* Center Main Dashboard Area */}
          <main className="flex-1 p-4 sm:p-6 md:p-7 pt-2 min-w-0">
            {children}
          </main>

          {/* Right Information Panel (Desktop XL) */}
          {showRightPanel && (
            <div className="hidden xl:block">
              <RightPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
