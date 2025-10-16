import { useState, useEffect } from 'react';
import { 
  getEvents, 
  getEventsByStatus, 
  getFundData,
  getDashboardStats 
} from '../services/dataService';

/**
 * Example component showing how to use Supabase data service
 * This is a reference implementation - adapt it to your needs
 */
export default function ExampleSupabaseUsage() {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [fundData, setFundData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // Fetch all events
      const allEvents = await getEvents();
      setEvents(allEvents);

      // Fetch upcoming events only
      const upcoming = await getEventsByStatus('Upcoming');
      setUpcomingEvents(upcoming);

      // Fetch fund data for a specific cashbook
      const funds = await getFundData('CB2025001');
      setFundData(funds);

      // Fetch dashboard statistics
      const statistics = await getDashboardStats();
      setStats(statistics);

    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data from Supabase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg mb-2">Error Loading Data</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadData}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Supabase Data Example</h1>

      {/* Dashboard Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm text-blue-600 font-medium">Total Events</h3>
            <p className="text-2xl font-bold text-blue-900">{stats.totalEvents}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm text-green-600 font-medium">Upcoming</h3>
            <p className="text-2xl font-bold text-green-900">{stats.upcomingEvents}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm text-purple-600 font-medium">Total Funds</h3>
            <p className="text-2xl font-bold text-purple-900">₹{stats.totalFundsRaised.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-sm text-orange-600 font-medium">Balance</h3>
            <p className="text-2xl font-bold text-orange-900">₹{stats.totalBalance.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* All Events */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">All Events ({events.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={event.media} 
                alt={event.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className={`px-2 py-1 rounded ${
                  event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                  event.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.status}
                </span>
                <span className="text-gray-500">{event.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events ({upcomingEvents.length})</h2>
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <div key={event.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.team}</p>
                </div>
                <span className="text-sm text-blue-600 font-medium">{event.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fund Data Example */}
      {fundData && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Fund Data (CB2025001)</h2>
          <div className="bg-white border rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Funds Raised</p>
                <p className="text-xl font-bold text-green-600">₹{fundData.fundsRaised.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expenses</p>
                <p className="text-xl font-bold text-red-600">₹{fundData.expenses.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-xl font-bold text-blue-600">₹{fundData.remainingBalance.toLocaleString()}</p>
              </div>
            </div>
            
            <h3 className="font-semibold mb-3">Recent Transactions</h3>
            <div className="space-y-2">
              {fundData.transactions.slice(0, 5).map(transaction => (
                <div key={transaction.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                  </div>
                  <span className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={loadData}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}
