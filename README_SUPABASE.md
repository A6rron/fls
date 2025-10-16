# 🗄️ Supabase Database Integration

This project has been set up to migrate from mock data to a real Supabase database.

## 🎯 Quick Start (3 Steps)

### Step 1: Create Database Tables
1. Open: https://supabase.com/dashboard/project/ybomzyaamswodtsqskfp
2. Go to **SQL Editor** → **New Query**
3. Copy all content from `supabase-schema.sql`
4. Paste and click **Run**

### Step 2: Migrate Your Data
```bash
node migrate-to-supabase.js
```

### Step 3: Update Your Code
Replace mock data imports with the data service:
```javascript
// Old way
import { MOCK_EVENTS } from './data/mockData';

// New way
import { getEvents } from './services/dataService';
const events = await getEvents();
```

See `src/components/ExampleSupabaseUsage.jsx` for a complete example.

## 📊 What's Included

### Database Schema
- **Events** (13 records) - All event information
- **Cashbooks** (5 records) - Financial summaries  
- **Transactions** (27 records) - All income/expense records

### Code Files
- `src/lib/supabase.js` - Supabase client
- `src/services/dataService.js` - Data access layer with all CRUD operations
- `src/components/ExampleSupabaseUsage.jsx` - Example React component

### Scripts
- `migrate-to-supabase.js` - Migrate mock data to Supabase
- `test-connection.js` - Test database connection
- `quick-start.sh` - Quick start helper script

### Documentation
- `SETUP_INSTRUCTIONS.md` - Detailed step-by-step guide
- `SUPABASE_SETUP.md` - Technical documentation
- `MIGRATION_SUMMARY.md` - Complete overview

## 🔧 Available Functions

```javascript
// Events
getEvents()                    // Get all events
getEventById(id)              // Get single event  
getEventsByStatus('Upcoming') // Filter by status
getEventsByType('College Event') // Filter by type
createEvent(data)             // Create new event
updateEvent(id, updates)      // Update event
deleteEvent(id)               // Delete event

// Financial Data
getFundData(cashbookId)       // Get complete fund data
getCashbookById(id)           // Get cashbook
getTransactionsByCashbookId(id) // Get transactions
createTransaction(cashbookId, data) // Add transaction

// Analytics
getDashboardStats()           // Get summary statistics
```

## 📁 Project Structure

```
sb1-f3cb5nb4/
├── 📄 README_SUPABASE.md          ← You are here
├── 📄 SETUP_INSTRUCTIONS.md       ← Step-by-step guide
├── 📄 MIGRATION_SUMMARY.md        ← Complete overview
├── 📄 SUPABASE_SETUP.md           ← Technical docs
│
├── 🔧 Configuration
│   ├── .env                       ← Supabase credentials (DO NOT COMMIT)
│   ├── .env.example               ← Template
│   └── supabase-schema.sql        ← Database schema
│
├── 🚀 Scripts
│   ├── migrate-to-supabase.js     ← Data migration
│   ├── test-connection.js         ← Connection test
│   └── quick-start.sh             ← Quick start helper
│
└── 💻 Source Code
    ├── src/lib/supabase.js        ← Supabase client
    ├── src/services/dataService.js ← Data access layer
    └── src/components/ExampleSupabaseUsage.jsx ← Example
```

## ⚡ Quick Commands

```bash
# Test connection
node test-connection.js

# Migrate data
node migrate-to-supabase.js

# Start dev server
npm run dev

# Quick start (all-in-one)
./quick-start.sh
```

## 🔒 Security

- ✅ Environment variables in `.env` (not committed to git)
- ✅ Row Level Security enabled on all tables
- ✅ Proper indexes for performance
- ✅ Secure anon key for client-side use

## 📚 Learn More

- [Supabase Documentation](https://supabase.com/docs)
- [React + Supabase Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
- [JavaScript Client Docs](https://supabase.com/docs/reference/javascript/introduction)

## 🐛 Troubleshooting

**"Table does not exist"**
→ Run the SQL schema in Supabase Dashboard first

**Migration fails**
→ Check that tables exist and your internet connection is active

**Data not loading**
→ Check browser console for errors
→ Verify migration completed successfully

## 💡 Tips

1. Always use `async/await` when calling data service functions
2. Add loading states to your components
3. Implement proper error handling
4. Check the example component for best practices

## 🎓 Example Usage

```javascript
import { useState, useEffect } from 'react';
import { getEvents, getFundData } from './services/dataService';

function MyComponent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

---

**Ready to migrate?** Start with `SETUP_INSTRUCTIONS.md` for detailed guidance!
