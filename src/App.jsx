import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import EventsPage from './components/EventsPage';
import EventDetailsPage from './components/EventDetailsPage';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleNavigate = (view) => {
    setCurrentView(view);
    if (view !== 'details') {
      setSelectedEventId(null);
    }
  };

  const handleViewDetails = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentView('details');
  };

  const handleBack = () => {
    setCurrentView('events');
    setSelectedEventId(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentView === 'events' && <EventsPage onViewDetails={handleViewDetails} />}
        {currentView === 'details' && <EventDetailsPage eventId={selectedEventId} onBack={handleBack} />}
      </main>

      {currentView === 'landing' && <Footer />}
    </div>
  );
}

export default App;
