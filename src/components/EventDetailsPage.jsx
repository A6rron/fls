import React, { useState, useEffect } from 'react';
import { getEventById, getFundData } from '../services/dataService';
import { formatDateLong, formatCurrency } from '../utils/formatters';

const EventDetailsPage = ({ eventId, onBack }) => {
  const [event, setEvent] = useState(null);
  const [fundData, setFundData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadEventData = async () => {
      if (eventId) {
        setLoading(true);
        setImageError(false); // Reset image error for new event
        try {
          // Fetch event first (usually cached, so very fast)
          const foundEvent = await getEventById(eventId);
          setEvent(foundEvent);
          
          // Then fetch fund data (also benefits from cache)
          if (foundEvent) {
            const funds = await getFundData(foundEvent.cashbook_id);
            setFundData(funds);
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Error loading event details:', error);
          setLoading(false);
        }
      }
    };
    loadEventData();
  }, [eventId]);

  if (loading || !event || !fundData) {
    return (
      <div className="min-h-[calc(100vh-4rem)] py-12 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 text-accent-blue-dark animate-spin mx-auto" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
          </svg>
          <p className="mt-4 text-text-secondary">Loading event details...</p>
        </div>
      </div>
    );
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

        {event.media && !imageError && (
          <div className="h-80 rounded-3xl overflow-hidden mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <img 
              src={event.media} 
              alt={event.title} 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          </div>
        )}
        
        {event.media && imageError && (
          <div className="h-80 rounded-3xl overflow-hidden mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)] bg-gradient-to-br from-accent-blue/20 to-accent-slate/20 flex items-center justify-center border border-card-border">
            <div className="text-center">
              <svg className="w-16 h-16 text-text-muted mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <p className="text-text-muted text-sm">Image unavailable</p>
            </div>
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
                        {transaction.type === 'expense' && (
                          <button 
                            className="block mt-1 text-xs font-mono text-white opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                            onClick={() => {
                              if (transaction.receipt) {
                                setCurrentReceipt(transaction.receipt);
                                setShowReceipt(true);
                              } else {
                                alert('Receipt not available for this transaction');
                              }
                            }}
                          >
                            view receipt
                          </button>
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

      {/* Receipt Popup Modal */}
      {showReceipt && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowReceipt(false)}
        >
          <div 
            className="bg-card-bg backdrop-blur-glass rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.8)] border border-card-border p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-text-primary">Receipt Details</h3>
              <button 
                onClick={() => setShowReceipt(false)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <pre className="text-sm font-mono text-white whitespace-pre-wrap bg-[rgba(0,0,0,0.3)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)]">
              {currentReceipt}
            </pre>
            <button 
              onClick={() => setShowReceipt(false)}
              className="mt-6 w-full px-4 py-3 bg-gradient-to-br from-accent-blue to-accent-slate text-white rounded-xl font-medium transition-all duration-300 hover:shadow-[0_6px_20px_rgba(74,158,255,0.4)] hover:-translate-y-0.5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;
