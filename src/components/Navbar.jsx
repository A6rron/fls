import React from 'react';

const Navbar = ({ currentView, onNavigate }) => {
  return (
    <nav className="bg-card-bg backdrop-blur-glass border-b border-card-border sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-16">
        <button
          onClick={() => onNavigate('landing')}
          className="text-2xl font-bold text-text-primary hover:text-gray-400 transition-all duration-300 hover:scale-105"
        >
          FLS
        </button>
        <div className="flex gap-6">
          <button
            onClick={() => onNavigate('landing')}
            className={`flex items-center gap-2 px-5 py-2 rounded-2xl font-medium transition-all duration-300 ${
              currentView === 'landing'
                ? 'bg-white text-[#1a1f2e] shadow-[0_4px_15px_rgba(255,255,255,0.3)] hover:bg-black hover:text-white hover:shadow-[0_4px_15px_rgba(0,0,0,0.6)]'
                : 'text-text-secondary hover:text-text-primary hover:bg-[rgba(156,163,175,0.15)] hover:-translate-y-0.5'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </button>
          <button
            onClick={() => onNavigate('events')}
            className={`flex items-center gap-2 px-5 py-2 rounded-2xl font-medium transition-all duration-300 ${
              currentView === 'events' || currentView === 'details'
                ? 'bg-white text-[#1a1f2e] shadow-[0_4px_15px_rgba(255,255,255,0.3)] hover:bg-black hover:text-white hover:shadow-[0_4px_15px_rgba(0,0,0,0.6)]'
                : 'text-text-secondary hover:text-text-primary hover:bg-[rgba(156,163,175,0.15)] hover:-translate-y-0.5'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Events</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
