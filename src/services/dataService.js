import { supabase } from '../lib/supabase';

// Simple in-memory cache
const cache = {
  events: null,
  eventsTimestamp: 0,
  cashbooks: null,
  cashbooksTimestamp: 0,
};

const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

/**
 * Clear all cached data (useful after creating/updating/deleting records)
 */
export function clearCache() {
  cache.events = null;
  cache.eventsTimestamp = 0;
  cache.cashbooks = null;
  cache.cashbooksTimestamp = 0;
}

/**
 * Fetch all events from Supabase (with caching)
 */
export async function getEvents() {
  // Check cache first
  if (cache.events && Date.now() - cache.eventsTimestamp < CACHE_DURATION) {
    return cache.events;
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  // Update cache
  cache.events = data;
  cache.eventsTimestamp = Date.now();

  return data;
}

/**
 * Fetch a single event by ID (with cache optimization)
 */
export async function getEventById(id) {
  // Check if we have this event in cache
  if (cache.events && Date.now() - cache.eventsTimestamp < CACHE_DURATION) {
    const cachedEvent = cache.events.find(e => e.id === id);
    if (cachedEvent) {
      return cachedEvent; // Return from cache instantly!
    }
  }

  // Otherwise fetch from database
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    throw error;
  }

  return data;
}

/**
 * Fetch events by status
 */
export async function getEventsByStatus(status) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', status)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching events by status:', error);
    throw error;
  }

  return data;
}

/**
 * Fetch events by type
 */
export async function getEventsByType(type) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('type', type)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching events by type:', error);
    throw error;
  }

  return data;
}

/**
 * Fetch cashbook data by ID
 */
export async function getCashbookById(cashbookId) {
  const { data, error } = await supabase
    .from('cashbooks')
    .select('*')
    .eq('id', cashbookId)
    .single();

  if (error) {
    console.error('Error fetching cashbook:', error);
    throw error;
  }

  return data;
}

/**
 * Fetch multiple cashbooks by IDs (optimized for batch loading with caching)
 */
export async function getCashbooksByIds(cashbookIds) {
  // Check cache first
  if (cache.cashbooks && Date.now() - cache.cashbooksTimestamp < CACHE_DURATION) {
    return cache.cashbooks.filter(cb => cashbookIds.includes(cb.id));
  }

  const { data, error } = await supabase
    .from('cashbooks')
    .select('*')
    .in('id', cashbookIds);

  if (error) {
    console.error('Error fetching cashbooks:', error);
    throw error;
  }

  // Update cache with all cashbooks
  if (!cache.cashbooks) {
    cache.cashbooks = data;
    cache.cashbooksTimestamp = Date.now();
  }

  return data;
}

/**
 * ULTRA-FAST: Fetch events with cashbook data in a single query
 * This is the fastest way to load the events page
 */
export async function getEventsWithFunds() {
  // Check cache first
  if (cache.events && cache.cashbooks && 
      Date.now() - cache.eventsTimestamp < CACHE_DURATION &&
      Date.now() - cache.cashbooksTimestamp < CACHE_DURATION) {
    return {
      events: cache.events,
      cashbooks: cache.cashbooks
    };
  }

  // Fetch both in parallel for maximum speed
  const [eventsResult, cashbooksResult] = await Promise.all([
    supabase.from('events').select('*').order('date', { ascending: false }),
    supabase.from('cashbooks').select('*')
  ]);

  if (eventsResult.error) {
    console.error('Error fetching events:', eventsResult.error);
    throw eventsResult.error;
  }

  if (cashbooksResult.error) {
    console.error('Error fetching cashbooks:', cashbooksResult.error);
    throw cashbooksResult.error;
  }

  // Update cache
  cache.events = eventsResult.data;
  cache.eventsTimestamp = Date.now();
  cache.cashbooks = cashbooksResult.data;
  cache.cashbooksTimestamp = Date.now();

  return {
    events: eventsResult.data,
    cashbooks: cashbooksResult.data
  };
}

/**
 * Fetch all transactions for a cashbook
 */
export async function getTransactionsByCashbookId(cashbookId) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('cashbook_id', cashbookId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }

  return data;
}

/**
 * Fetch complete fund data (cashbook + transactions)
 */
export async function getFundData(cashbookId) {
  try {
    const cashbook = await getCashbookById(cashbookId);
    const transactions = await getTransactionsByCashbookId(cashbookId);

    return {
      fundsRaised: cashbook.funds_raised,
      expenses: cashbook.expenses,
      remainingBalance: cashbook.remaining_balance,
      transactions: transactions.map(t => ({
        id: t.id.split('-').pop(), // Extract original ID
        date: t.date,
        description: t.description,
        type: t.type,
        amount: t.amount,
        category: t.category,
        volunteer: t.volunteer,
        receipt: t.receipt
      }))
    };
  } catch (error) {
    console.error('Error fetching fund data:', error);
    return {
      fundsRaised: 0,
      expenses: 0,
      remainingBalance: 0,
      transactions: []
    };
  }
}

/**
 * Create a new event
 */
export async function createEvent(eventData) {
  const { data, error } = await supabase
    .from('events')
    .insert([eventData])
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    throw error;
  }

  return data;
}

/**
 * Update an existing event
 */
export async function updateEvent(id, updates) {
  const { data, error } = await supabase
    .from('events')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    throw error;
  }

  return data;
}

/**
 * Delete an event
 */
export async function deleteEvent(id) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    throw error;
  }

  return true;
}

/**
 * Create a new transaction
 */
export async function createTransaction(cashbookId, transactionData) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ ...transactionData, cashbook_id: cashbookId }])
    .select()
    .single();

  if (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }

  // Update cashbook totals
  await updateCashbookTotals(cashbookId);

  return data;
}

/**
 * Update cashbook totals based on transactions
 */
async function updateCashbookTotals(cashbookId) {
  const transactions = await getTransactionsByCashbookId(cashbookId);
  
  const fundsRaised = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const remainingBalance = fundsRaised - expenses;

  const { error } = await supabase
    .from('cashbooks')
    .update({
      funds_raised: fundsRaised,
      expenses: expenses,
      remaining_balance: remainingBalance,
      updated_at: new Date().toISOString()
    })
    .eq('id', cashbookId);

  if (error) {
    console.error('Error updating cashbook totals:', error);
    throw error;
  }
}

/**
 * Get statistics for dashboard
 */
export async function getDashboardStats() {
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('status');

  const { data: cashbooks, error: cashbooksError } = await supabase
    .from('cashbooks')
    .select('funds_raised, expenses, remaining_balance');

  if (eventsError || cashbooksError) {
    console.error('Error fetching dashboard stats');
    throw eventsError || cashbooksError;
  }

  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => e.status === 'Upcoming').length;
  const ongoingEvents = events.filter(e => e.status === 'Ongoing').length;
  const completedEvents = events.filter(e => e.status === 'Completed').length;

  const totalFundsRaised = cashbooks.reduce((sum, cb) => sum + parseFloat(cb.funds_raised || 0), 0);
  const totalExpenses = cashbooks.reduce((sum, cb) => sum + parseFloat(cb.expenses || 0), 0);
  const totalBalance = cashbooks.reduce((sum, cb) => sum + parseFloat(cb.remaining_balance || 0), 0);

  return {
    totalEvents,
    upcomingEvents,
    ongoingEvents,
    completedEvents,
    totalFundsRaised,
    totalExpenses,
    totalBalance
  };
}
