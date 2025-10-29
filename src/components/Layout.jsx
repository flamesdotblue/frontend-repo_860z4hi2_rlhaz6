import React from 'react';
import { Home, Settings, Puzzle, Rocket, Terminal, Bell } from 'lucide-react';

const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors border border-transparent hover:border-cyan-500/30 hover:bg-white/5 ${
      active ? 'bg-white/10 border-cyan-500/40 text-white' : 'text-zinc-300'
    }`}
  >
    <Icon size={18} className={active ? 'text-cyan-400' : 'text-zinc-400'} />
    <span className="font-medium">{label}</span>
  </button>
);

export default function Layout({ currentView, setCurrentView, children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0b0f] via-[#0b0f17] to-[#0f1020] text-zinc-100">
      {/* Top bar */}
      <div className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 shadow-[0_0_30px_-5px] shadow-cyan-500/40" />
            <div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight">ZeroSync Playground</h1>
              <p className="text-xs text-zinc-400 -mt-0.5">The Hardhat for Rollups</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 flex items-center gap-2">
              <Terminal size={16} className="text-cyan-400" />
              <span className="hidden sm:inline">Open Terminal</span>
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200">
              <Bell size={16} className="text-fuchsia-400" />
            </button>
            <div className="h-8 w-px bg-white/10 mx-1" />
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-500" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2 space-y-2">
          <NavButton
            icon={Home}
            label="Dashboard"
            active={currentView === 'dashboard'}
            onClick={() => setCurrentView('dashboard')}
          />
          <NavButton
            icon={Settings}
            label="Config Editor"
            active={currentView === 'config'}
            onClick={() => setCurrentView('config')}
          />
          <NavButton
            icon={Puzzle}
            label="Workspace"
            active={currentView === 'workspace'}
            onClick={() => setCurrentView('workspace')}
          />
          <NavButton
            icon={Rocket}
            label="Deploy & Proofs"
            active={currentView === 'proofs'}
            onClick={() => setCurrentView('proofs')}
          />

          <div className="mt-4 p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <p className="text-xs text-zinc-400">Powered by ZeroSync SDK — unified framework for rollup devs.</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="col-span-12 lg:col-span-9 xl:col-span-10">
          {children}
        </main>
      </div>
    </div>
  );
}
