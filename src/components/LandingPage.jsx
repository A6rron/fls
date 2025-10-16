import React from 'react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1280px] mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-card-bg backdrop-blur-glass text-text-primary px-5 py-2 rounded-full text-sm font-medium mb-6 border border-card-border shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Transparent Fund Management
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-5 tracking-tight">
            Fund & Ledger System
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Transparent fund management for college events.
          </p>

          <button
            onClick={() => onNavigate('events')}
            className="inline-flex items-center gap-2 bg-white text-[#1a1f2e] px-7 py-3.5 rounded-2xl text-base font-semibold transition-all duration-300 shadow-[0_8px_25px_rgba(255,255,255,0.3)] hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
          >
            View Events
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-card-bg backdrop-blur-glass p-7 rounded-[1.25rem] shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-card-border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-[rgba(255,255,255,0.2)]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-blue-dark flex items-center justify-center mb-4 shadow-[0_4px_20px_rgba(74,158,255,0.3)]">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Real-time Tracking</h3>
            <p className="text-text-secondary leading-relaxed">
              Monitor funds raised, expenses, and remaining balance for every college event in real-time.
            </p>
          </div>

          <div className="bg-card-bg backdrop-blur-glass p-7 rounded-[1.25rem] shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-card-border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-[rgba(255,255,255,0.2)]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-green to-accent-green-dark flex items-center justify-center mb-4 shadow-[0_4px_20px_rgba(74,222,128,0.3)]">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Complete Visibility</h3>
            <p className="text-text-secondary leading-relaxed">
              View detailed transaction histories and understand where every ruppe is allocated.
            </p>
          </div>

          <div className="bg-card-bg backdrop-blur-glass p-7 rounded-[1.25rem] shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-card-border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-[rgba(255,255,255,0.2)]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-orange to-[#f97316] flex items-center justify-center mb-4 shadow-[0_4px_20px_rgba(251,146,60,0.3)]">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Trust & Accountability</h3>
            <p className="text-text-secondary leading-relaxed">
              Build trust among students and organizers with transparent financial reporting.
            </p>
          </div>
        </div>

        {/* Workflow Section */}
        <div className="mt-14 pt-14 border-t border-[rgba(255,255,255,0.1)]">
          <h3 className="text-3xl font-extrabold text-text-primary text-center mb-3 tracking-tight">How It Works</h3>
          <p className="text-lg text-text-secondary text-center mb-8 font-normal">
            Complete transparency from collection to spending
          </p>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-3 max-w-[1200px] mx-auto">
            {/* Step 1 */}
            <div className="relative bg-card-bg backdrop-blur-glass border border-card-border rounded-[1.25rem] p-8 text-center transition-all duration-300 w-full max-w-[280px] min-h-[300px] flex flex-col items-center justify-start shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-[rgba(255,255,255,0.2)]">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-slate rounded-full flex items-center justify-center font-extrabold text-lg text-white border-[3px] border-bg-secondary shadow-[0_4px_15px_rgba(89,89,89,0.4)]">
                1
              </div>
              <div className="w-[4.5rem] h-[4.5rem] mt-4 mb-5 bg-gradient-to-br from-[rgba(89,89,89,0.3)] to-[rgba(100,116,139,0.3)] rounded-[1.25rem] flex items-center justify-center transition-all duration-300 border border-[rgba(255,255,255,0.1)]">
                <svg className="w-9 h-9 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-text-primary mb-2.5 leading-tight tracking-tight">
                Donations via Cashbook
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed font-normal flex-grow">
                Students and sponsors contribute directly to the main Cashbook account via UPI and other payment methods
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center text-accent-blue opacity-70 rotate-90 lg:rotate-0 flex-shrink-0">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            {/* Step 2 */}
            <div className="relative bg-card-bg backdrop-blur-glass border border-card-border rounded-[1.25rem] p-8 text-center transition-all duration-300 w-full max-w-[280px] min-h-[300px] flex flex-col items-center justify-start shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-[rgba(255,255,255,0.2)]">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-slate rounded-full flex items-center justify-center font-extrabold text-lg text-white border-[3px] border-bg-secondary shadow-[0_4px_15px_rgba(89,89,89,0.4)]">
                2
              </div>
              <div className="w-[4.5rem] h-[4.5rem] mt-4 mb-5 bg-gradient-to-br from-[rgba(89,89,89,0.3)] to-[rgba(100,116,139,0.3)] rounded-[1.25rem] flex items-center justify-center transition-all duration-300 border border-[rgba(255,255,255,0.1)]">
                <svg className="w-9 h-9 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <line x1="19" y1="8" x2="19" y2="14"></line>
                  <line x1="22" y1="11" x2="16" y2="11"></line>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-text-primary mb-2.5 leading-tight tracking-tight">
                Cashbook Wallets for Volunteers
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed font-normal flex-grow">
                Event organizers allocate funds to volunteers via Cashbook wallets for managing specific event expenses
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center text-accent-blue opacity-70 rotate-90 lg:rotate-0 flex-shrink-0">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            {/* Step 3 */}
            <div className="relative bg-card-bg backdrop-blur-glass border border-card-border rounded-[1.25rem] p-8 text-center transition-all duration-300 w-full max-w-[280px] min-h-[300px] flex flex-col items-center justify-start shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-[rgba(255,255,255,0.2)]">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-slate rounded-full flex items-center justify-center font-extrabold text-lg text-white border-[3px] border-bg-secondary shadow-[0_4px_15px_rgba(89,89,89,0.4)]">
                3
              </div>
              <div className="w-[4.5rem] h-[4.5rem] mt-4 mb-5 bg-gradient-to-br from-[rgba(89,89,89,0.3)] to-[rgba(100,116,139,0.3)] rounded-[1.25rem] flex items-center justify-center transition-all duration-300 border border-[rgba(255,255,255,0.1)]">
                <svg className="w-9 h-9 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-text-primary mb-2.5 leading-tight tracking-tight">
                Volunteers Make Payments
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed font-normal flex-grow">
                Volunteers make purchases using their Cashbook wallets, with each transaction tracked and attributed
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center text-accent-blue opacity-70 rotate-90 lg:rotate-0 flex-shrink-0">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            {/* Step 4 */}
            <div className="relative bg-card-bg backdrop-blur-glass border border-card-border rounded-[1.25rem] p-8 text-center transition-all duration-300 w-full max-w-[280px] min-h-[300px] flex flex-col items-center justify-start shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-[rgba(255,255,255,0.2)]">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-slate rounded-full flex items-center justify-center font-extrabold text-lg text-white border-[3px] border-bg-secondary shadow-[0_4px_15px_rgba(89,89,89,0.4)]">
                4
              </div>
              <div className="w-[4.5rem] h-[4.5rem] mt-4 mb-5 bg-gradient-to-br from-[rgba(89,89,89,0.3)] to-[rgba(100,116,139,0.3)] rounded-[1.25rem] flex items-center justify-center transition-all duration-300 border border-[rgba(255,255,255,0.1)]">
                <svg className="w-9 h-9 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-text-primary mb-2.5 leading-tight tracking-tight">
                Auto-Synced via Cashbook API
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed font-normal flex-grow">
                Every transaction is automatically synced from Cashbook to FLS, showing who made each payment for complete transparency
              </p>
            </div>
          </div>
        </div>

        {/* Transparency Highlight */}
        <div className="mt-16 mb-16 max-w-[900px] mx-auto">
          <div className="bg-card-bg backdrop-blur-glass border border-card-border rounded-3xl p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-[rgba(255,255,255,0.2)]">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent-blue to-accent-blue-dark rounded-3xl mb-6 shadow-[0_8px_30px_rgba(89,89,89,0.4)] transition-all duration-400">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-text-primary mb-4 tracking-tight leading-tight">
              Powered by Cashbook.in
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-[700px] mx-auto font-normal">
              FLS uses <a href="https://cashbook.in/" target="_blank" rel="noopener noreferrer" className="text-accent-blue font-semibold hover:underline">Cashbook</a> as the financial backend. All donations go to the main account, volunteers get digital wallets, and every expense shows who paid—ensuring complete transparency and accountability.
            </p>

            {/* Visual Diagram - College Day Example */}
            <div className="mt-12 pt-10 border-t border-[rgba(255,255,255,0.1)]">
              <h3 className="text-xl font-bold text-text-primary mb-3">Example: College Day Event</h3>
              <p className="text-sm text-text-secondary mb-8">See how funds flow from the main account to volunteer wallets</p>
              
              <div className="max-w-[700px] mx-auto">
                {/* Virtual Account */}
                <div className="bg-card-bg border-2 border-accent-blue rounded-lg p-4 mb-6 text-center">
                  <h4 className="text-base font-bold text-text-primary">Virtual Account</h4>
                  <p className="text-xs text-text-secondary mb-2">College Day Event Fund</p>
                  <p className="text-sm font-bold text-green-500">Balance: ₹60,000</p>
                </div>

                {/* Connecting Lines */}
                <div className="flex justify-center mb-6">
                  <div className="flex gap-12">
                    <div className="w-px h-8 bg-accent-blue/50"></div>
                    <div className="w-px h-8 bg-accent-blue/50"></div>
                    <div className="w-px h-8 bg-accent-blue/50"></div>
                  </div>
                </div>

                {/* Wallets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Volunteer Wallet A */}
                  <div className="bg-card-bg border border-card-border rounded-lg p-4 text-center">
                    <h5 className="text-sm font-bold text-text-primary mb-1">Arjun's Wallet</h5>
                    <p className="text-xs text-text-secondary mb-3">Guest arrangement</p>
                    <div className="pt-3 border-t border-[rgba(255,255,255,0.1)]">
                      <p className="text-xs text-text-secondary">Guest Payment</p>
                      <p className="text-xs font-semibold text-red-500 mt-1">₹15,000</p>
                    </div>
                  </div>

                  {/* Volunteer Wallet B */}
                  <div className="bg-card-bg border border-card-border rounded-lg p-4 text-center">
                    <h5 className="text-sm font-bold text-text-primary mb-1">Meera's Wallet</h5>
                    <p className="text-xs text-text-secondary mb-3">Catering Coordinator</p>
                    <div className="pt-3 border-t border-[rgba(255,255,255,0.1)]">
                      <p className="text-xs text-text-secondary">Food & Beverages</p>
                      <p className="text-xs font-semibold text-red-500 mt-1">₹25,000</p>
                    </div>
                  </div>

                  {/* Event Admin */}
                  <div className="bg-card-bg border border-card-border rounded-lg p-4 text-center">
                    <h5 className="text-sm font-bold text-text-primary mb-1">Vishnu's Wallet</h5>
                    <p className="text-xs text-text-secondary mb-3">Overall Coordinator</p>
                    <div className="pt-3 border-t border-[rgba(255,255,255,0.1)]">
                      <p className="text-xs text-text-secondary">Sound & Stage</p>
                      <p className="text-xs font-semibold text-red-500 mt-1">₹20,000</p>
                    </div>
                  </div>
                </div>

                {/* Info Note */}
                <div className="mt-6 bg-[rgba(74,158,255,0.05)] border border-accent-blue/30 rounded-lg p-3">
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Volunteers make purchases directly from their Cashbook wallets. Every transaction is automatically synced to FLS, showing who made each payment and for what purpose—ensuring complete transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
