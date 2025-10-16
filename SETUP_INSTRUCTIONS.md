# 🚀 Complete Setup Instructions

## ✅ What's Been Done

1. ✅ Supabase client library installed
2. ✅ Environment variables configured in `.env`
3. ✅ Database schema created (`supabase-schema.sql`)
4. ✅ Migration script ready (`migrate-to-supabase.js`)
5. ✅ Data service layer created (`src/services/dataService.js`)
6. ✅ Supabase client configured (`src/lib/supabase.js`)

## 📋 What You Need to Do

### Step 1: Create Database Tables in Supabase

**Option A: Using Supabase Dashboard (Recommended)**

1. Open your browser and go to: https://supabase.com/dashboard/project/ybomzyaamswodtsqskfp
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the file `supabase-schema.sql` from this project
5. Copy ALL the SQL content
6. Paste it into the SQL Editor
7. Click **Run** (or press Cmd/Ctrl + Enter)
8. You should see: "Success. No rows returned"

**Option B: Using Supabase CLI (Advanced)**

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref ybomzyaamswodtsqskfp

# Run the migration
supabase db push
```

### Step 2: Verify Tables Were Created

1. In Supabase Dashboard, go to **Table Editor**
2. You should see three tables:
   - `events`
   - `cashbooks`
   - `transactions`

### Step 3: Migrate Your Data

Run the migration script to transfer all mock data to Supabase:

```bash
node migrate-to-supabase.js
```

Expected output:
```
🚀 Starting migration to Supabase...

🔄 Migrating cashbooks...
✅ Successfully migrated 5 cashbooks
🔄 Migrating transactions...
✅ Successfully migrated 27 transactions
🔄 Migrating events...
✅ Successfully migrated 13 events

🔍 Verifying migration...

📊 Migration Summary:
   Cashbooks: 5
   Transactions: 27
   Events: 13

✨ Migration completed successfully!
```

### Step 4: Verify Data in Supabase

1. Go back to **Table Editor** in Supabase Dashboard
2. Click on each table to see the data:
   - `events` → 13 rows
   - `cashbooks` → 5 rows
   - `transactions` → 27 rows

### Step 5: Update Your React Components

Now you need to update your React components to use the new data service instead of mock data.

**Example: Before**
```javascript
import { MOCK_EVENTS, getFundData } from './data/mockData';

function MyComponent() {
  const events = MOCK_EVENTS;
  const fundData = getFundData('CB2025001');
  // ...
}
```

**Example: After**
```javascript
import { getEvents, getFundData } from './services/dataService';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [events, setEvents] = useState([]);
  const [fundData, setFundData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const eventsData = await getEvents();
        const fundData = await getFundData('CB2025001');
        setEvents(eventsData);
        setFundData(fundData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  
  // ... rest of component
}
```

### Step 6: Test Your Application

```bash
npm run dev
```

Open your browser and verify:
- Events are loading from Supabase
- Fund data is displaying correctly
- No console errors

## 🔧 Available Data Service Functions

```javascript
import {
  // Events
  getEvents,              // Get all events
  getEventById,           // Get single event
  getEventsByStatus,      // Filter by status
  getEventsByType,        // Filter by type
  createEvent,            // Create new event
  updateEvent,            // Update event
  deleteEvent,            // Delete event
  
  // Cashbooks & Transactions
  getCashbookById,        // Get cashbook
  getTransactionsByCashbookId,  // Get transactions
  getFundData,            // Get complete fund data
  createTransaction,      // Add transaction
  
  // Dashboard
  getDashboardStats       // Get summary statistics
} from './services/dataService';
```

## 🐛 Troubleshooting

### "Could not find the table" error
- You haven't run the SQL schema yet
- Go to Step 1 and create the tables

### Migration fails
- Check that tables exist in Supabase
- Verify your internet connection
- Check Supabase project is active

### Data not showing in app
- Check browser console for errors
- Verify data exists in Supabase Table Editor
- Make sure you updated components to use async/await

### Permission errors
- Check RLS policies in Supabase
- Verify your anon key is correct in `.env`

## 📁 Project Structure

```
sb1-f3cb5nb4/
├── .env                      # Supabase credentials (DO NOT COMMIT)
├── .env.example              # Template for environment variables
├── supabase-schema.sql       # Database schema
├── migrate-to-supabase.js    # Data migration script
├── test-connection.js        # Connection test script
├── SUPABASE_SETUP.md         # Detailed setup guide
├── SETUP_INSTRUCTIONS.md     # This file
└── src/
    ├── lib/
    │   └── supabase.js       # Supabase client
    ├── services/
    │   └── dataService.js    # Data access layer
    └── data/
        └── mockData.js       # Original mock data (keep for reference)
```

## 🎯 Next Steps After Setup

1. ✅ Tables created
2. ✅ Data migrated
3. 🔄 Update React components to use data service
4. 🔄 Add loading states to UI
5. 🔄 Add error handling
6. 🔄 Implement create/update/delete operations
7. 🔄 Add authentication (optional)

## 🔒 Security Notes

- `.env` file is in `.gitignore` - never commit it
- Current RLS policies allow public access - adjust for production
- Anon key is safe for client-side use
- For production, implement proper authentication

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [React + Supabase Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-react)

## ❓ Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the Supabase dashboard for errors
3. Check browser console for error messages
4. Verify all steps were completed in order
