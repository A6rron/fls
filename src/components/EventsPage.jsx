import React, { useState, useEffect } from 'react';
import { getEventsWithFunds } from '../services/dataService';
import { formatDate, formatCurrency } from '../utils/formatters';

const EventsPage = ({ onViewDetails }) => {
  const [events, setEvents] = useState([]);
  const [fundDataCache, setFundDataCache] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      // ULTRA-FAST: Fetch everything in one go with caching
      const { events: eventsData, cashbooks } = await getEventsWithFunds();
      
      setEvents(eventsData);
      
      // Create cache mapping event ID to funds raised
      const cache = {};
      eventsData.forEach(event => {
        const cashbook = cashbooks.find(cb => cb.id === event.cashbook_id);
        cache[event.id] = cashbook ? cashbook.funds_raised : 0;
      });
      setFundDataCache(cache);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading events:', error);
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter(e => e.status === 'Upcoming' || e.status === 'Ongoing');
  const completedEvents = events.filter(e => e.status === 'Completed' || e.status === 'Cancelled');

  const getEventTypeClass = (type) => {
    const typeMap = {
      'College Event': 'bg-accent-slate text-white',
      'Department Fest': 'bg-accent-pink text-white',
      'College Fest': 'bg-accent-orange text-white',
      'IV Plan': 'bg-accent-mint text-white',
    };
    return typeMap[type] || 'bg-accent-slate text-white';
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'Upcoming': 'bg-accent-blue text-white',
      'Ongoing': 'bg-accent-green text-white',
      'Completed': 'bg-[rgba(100,116,139,0.5)] text-text-secondary',
      'Cancelled': 'bg-red-500 text-white',
    };
    return statusMap[status] || 'bg-accent-blue text-white';
  };

  const EventCard = ({ event }) => (
    <div
      onClick={() => onViewDetails(event.id)}
      className="bg-card-bg backdrop-blur-glass rounded-[1.25rem] shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-card-border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_45px_rgba(0,0,0,0.7)] hover:border-[rgba(255,255,255,0.2)]"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary transition-colors duration-300 hover:text-accent-blue-dark">
            {event.title}
          </h3>
        </div>
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${getEventTypeClass(event.type)}`}>
            {event.type}
          </span>
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${getStatusClass(event.status)}`}>
            {event.status}
          </span>
        </div>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {formatDate(event.date)}
          </div>
          <div className="text-text-primary font-bold text-base">
            {formatCurrency(fundDataCache[event.id] || 0)}
          </div>
        </div>
      </div>
    </div>
  );

  const EventSection = ({ title, icon, count, events, noEventsMessage }) => (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-7 px-6 py-5 bg-card-bg backdrop-blur-glass rounded-2xl border border-card-border shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3.5">
          <svg className="w-6 h-6 text-accent-blue flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {icon}
          </svg>
          <h2 className="text-2xl font-bold text-text-primary m-0">{title}</h2>
        </div>
        <span className="inline-flex items-center justify-center min-w-[2rem] h-8 px-2.5 bg-gradient-to-br from-accent-blue to-accent-slate text-white text-sm font-bold rounded-full shadow-[0_4px_15px_rgba(74,158,255,0.3)]">
          {count}
        </span>
      </div>
      {events.length === 0 ? (
        <div className="text-center py-16 text-text-muted text-lg">
          <p>{noEventsMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] py-12">
        <div className="max-w-full px-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">All Events</h1>
            <p className="text-text-secondary text-base">Explore college events and their transparent fund tracking</p>
          </div>
          <div className="flex items-center justify-center py-16">
            <svg className="w-8 h-8 text-accent-blue-dark animate-spin" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"></circle>
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-full px-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">All Events</h1>
          <p className="text-text-secondary text-base">Explore college events and their transparent fund tracking</p>
        </div>

        {upcomingEvents.length === 0 && completedEvents.length === 0 ? (
          <div className="text-center py-16 text-text-muted text-lg">
            <p>No events found.</p>
          </div>
        ) : (
          <>
            {upcomingEvents.length > 0 && (
              <EventSection
                title="Upcoming Events"
                icon={
                  <>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </>
                }
                count={upcomingEvents.length}
                events={upcomingEvents}
                noEventsMessage="No upcoming events."
              />
            )}

            {completedEvents.length > 0 && (
              <EventSection
                title="Completed Events"
                icon={
                  <>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </>
                }
                count={completedEvents.length}
                events={completedEvents}
                noEventsMessage="No completed events."
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
