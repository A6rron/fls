import React, { useState, useEffect } from 'react';
import { MOCK_EVENTS, getFundData } from '../data/mockData';
import { formatDateLong, formatCurrency } from '../utils/formatters';

const EventDetailsPage = ({ eventId, onBack }) => {
  const [event, setEvent] = useState(null);
  const [fundData, setFundData] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    if (eventId) {
      const foundEvent = MOCK_EVENTS.find(e => e.id === eventId);
      setEvent(foundEvent);
      if (foundEvent) {
        const funds = getFundData(foundEvent.cashbook_id);
        setFundData(funds);
      }
    }
  }, [eventId]);

  if (!event || !fundData) {
    return null;
  }

  const getStatusClass = (status) => {
    const statusMap = {
      'Upcoming': 'bg-accent-blue text-white',
      'Ongoing': 'bg-accent-green text-white',
      'Completed': 'bg-[rgba(100,116,139,0.5)] text-text-secondary',
      'Cancelled': 'bg-red-500 text-white',
    };
    return statusMap[status] || 'bg-accent-blue text-white';
  };

  const getFilteredTransactions = () => {
    if (currentFilter === 'income') {
      return fundData.transactions.filter(t => t.type === 'income');
    } else if (currentFilter === 'expense') {
      return fundData.transactions.filter(t => t.type === 'expense');
    }
    return fundData.transactions;
  };

  const filteredTransactions = getFilteredTransactions();

  const getFilterTitle = () => {
    if (currentFilter === 'income') return 'Funds Raised - Detailed Transactions';
    if (currentFilter === 'expense') return 'Expenses - Detailed Transactions';
    return 'Transaction Summary';
  };

  const handleStatCardClick = (filter) => {
    setCurrentFilter(filter);
    setTimeout(() => {
      document.querySelector('.transactions-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-[1280px] mx-auto px-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-text-secondary bg-card-bg backdrop-blur-glass border border-card-border rounded-2xl px-4 py-2 mb-8 transition-all duration-300 hover:text-text-primary hover:-translate-x-1 hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Events
        </button>

        {event.media && (
          <div className="h-80 rounded-3xl overflow-hidden mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <img src={event.media} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="bg-card-bg backdrop-blur-glass rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-card-border p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-text-primary mb-4">{event.title}</h1>
              <p className="text-base text-text-secondary leading-relaxed">{event.description}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap h-fit ${getStatusClass(event.status)}`}>
              {event.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-slate rounded-2xl flex items-center justify-center text-white shadow-[0_4px_20px_rgba(74,158,255,0.3)]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div>
                <p className="text-sm text-text-muted">Event Date</p>
                <p className="font-semibold text-text-primary">{formatDateLong(event.date)}</p>
              </div>
            </div>

            {event.team && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-slate rounded-2xl flex items-center justify-center text-white shadow-[0_4px_20px_rgba(74,158,255,0.3)]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Organized By</p>
                  <p className="font-semibold text-text-primary">{event.team}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            onClick={() => handleStatCardClick('income')}
            className="bg-card-bg backdrop-blur-glass rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-card-border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_50px_rgba(0,0,0,0.8)] hover:border-[rgba(255,255,255,0.3)] cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-secondary text-sm">Funds Raised</p>
              <svg className="w-5 h-5 text-accent-green-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <p className="text-3xl font-bold text-text-primary">{formatCurrency(fundData.fundsRaised)}</p>
            <p className="text-xs text-text-muted mt-2 font-medium opacity-70">Click to view details</p>
          </div>

          <div
            onClick={() => handleStatCardClick('expense')}
            className="bg-card-bg backdrop-blur-glass rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-card-border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_50px_rgba(0,0,0,0.8)] hover:border-[rgba(255,255,255,0.3)] cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-secondary text-sm">Expenses</p>
              <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
              </svg>
            </div>
            <p className="text-3xl font-bold text-text-primary">{formatCurrency(fundData.expenses)}</p>
            <p className="text-xs text-text-muted mt-2 font-medium opacity-70">Click to view details</p>
          </div>

          <div className="bg-card-bg backdrop-blur-glass rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-card-border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-[rgba(255,255,255,0.2)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-secondary text-sm">Remaining Balance</p>
              <svg className="w-5 h-5 text-accent-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <p className="text-3xl font-bold text-text-primary">{formatCurrency(fundData.remainingBalance)}</p>
          </div>
        </div>

        <div className="transactions-card bg-card-bg backdrop-blur-glass rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-card-border p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-text-primary m-0">{getFilterTitle()}</h2>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCurrentFilter('all')}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 outline-none ${
                  currentFilter === 'all'
                    ? 'bg-gradient-to-br from-accent-blue to-accent-slate text-white border-transparent shadow-[0_4px_15px_rgba(74,158,255,0.3)] hover:shadow-[0_6px_20px_rgba(74,158,255,0.4)] hover:-translate-y-0.5'
                    : 'border-card-border bg-[rgba(255,255,255,0.05)] text-text-secondary hover:bg-[rgba(255,255,255,0.1)] hover:text-text-primary hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCurrentFilter('income')}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 outline-none ${
                  currentFilter === 'income'
                    ? 'bg-gradient-to-br from-accent-blue to-accent-slate text-white border-transparent shadow-[0_4px_15px_rgba(74,158,255,0.3)] hover:shadow-[0_6px_20px_rgba(74,158,255,0.4)] hover:-translate-y-0.5'
                    : 'border-card-border bg-[rgba(255,255,255,0.05)] text-text-secondary hover:bg-[rgba(255,255,255,0.1)] hover:text-text-primary hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                Funds Raised
              </button>
              <button
                onClick={() => setCurrentFilter('expense')}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 outline-none ${
                  currentFilter === 'expense'
                    ? 'bg-gradient-to-br from-accent-blue to-accent-slate text-white border-transparent shadow-[0_4px_15px_rgba(74,158,255,0.3)] hover:shadow-[0_6px_20px_rgba(74,158,255,0.4)] hover:-translate-y-0.5'
                    : 'border-card-border bg-[rgba(255,255,255,0.05)] text-text-secondary hover:bg-[rgba(255,255,255,0.1)] hover:text-text-primary hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                Expenses
              </button>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-text-muted">
              <p>No transactions recorded yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-text-secondary border-b-2 border-[rgba(255,255,255,0.1)]">Date</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-text-secondary border-b-2 border-[rgba(255,255,255,0.1)]">Description</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-text-secondary border-b-2 border-[rgba(255,255,255,0.1)]">Category</th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-text-secondary border-b-2 border-[rgba(255,255,255,0.1)]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map(transaction => (
                    <tr key={transaction.id} className="hover:bg-[rgba(255,255,255,0.05)]">
                      <td className="px-4 py-4 text-sm border-b border-[rgba(255,255,255,0.05)] text-text-muted">
                        {formatDateLong(transaction.date)}
                      </td>
                      <td className="px-4 py-4 text-sm border-b border-[rgba(255,255,255,0.05)] text-text-primary font-medium">
                        {transaction.description}
                        {transaction.type === 'expense' && transaction.volunteer && (
                          <span className="block mt-1 text-sm text-accent-blue font-normal italic">
                            Paid by: {transaction.volunteer}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm border-b border-[rgba(255,255,255,0.05)]">
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[rgba(74,158,255,0.2)] text-accent-blue">
                          {transaction.category}
                        </span>
                      </td>
                      <td className={`px-4 py-4 text-sm border-b border-[rgba(255,255,255,0.05)] text-right font-bold ${
                        transaction.type === 'income' ? 'text-accent-green-dark' : 'text-red-500'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
