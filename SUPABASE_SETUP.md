# Supabase Database Setup Guide

This guide will help you set up and migrate your data to Supabase.

## Prerequisites

- Node.js installed
- Supabase account and project created
- Database credentials (already configured in `.env`)

## Step 1: Create Database Tables

1. Go to your Supabase Dashboard: https://ybomzyaamswodtsqskfp.supabase.co
2. Navigate to the **SQL Editor** section
3. Copy the contents of `supabase-schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** to create all tables and policies

Alternatively, you can run the SQL file directly if you have the Supabase CLI installed:
```bash
supabase db push
```

## Step 2: Migrate Mock Data to Supabase

Run the migration script to transfer all mock data to your Supabase database:

```bash
node migrate-to-supabase.js
```

This script will:
- ✅ Migrate all cashbooks (5 cashbooks)
- ✅ Migrate all transactions (27 transactions)
- ✅ Migrate all events (13 events)
- ✅ Verify the migration

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

## Step 3: Verify Data in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Table Editor**
3. Check the following tables:
   - `events` - Should have 13 rows
   - `cashbooks` - Should have 5 rows
   - `transactions` - Should have 27 rows

## Database Schema

### Tables

#### `events`
- `id` (TEXT, PRIMARY KEY)
- `title` (TEXT)
- `description` (TEXT)
- `type` (TEXT) - College Event, Department Fest, College Fest, IV Plan
- `status` (TEXT) - Upcoming, Ongoing, Completed
- `date` (DATE)
- `team` (TEXT)
- `cashbook_id` (TEXT)
- `media` (TEXT) - Image URL
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### `cashbooks`
- `id` (TEXT, PRIMARY KEY)
- `funds_raised` (NUMERIC)
- `expenses` (NUMERIC)
- `remaining_balance` (NUMERIC)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### `transactions`
- `id` (TEXT, PRIMARY KEY)
- `cashbook_id` (TEXT, FOREIGN KEY)
- `date` (DATE)
- `description` (TEXT)
- `type` (TEXT) - income, expense
- `amount` (NUMERIC)
- `category` (TEXT)
- `volunteer` (TEXT, NULLABLE)
- `receipt` (TEXT, NULLABLE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Using the Data Service

The application now uses `src/services/dataService.js` to interact with Supabase. Here are some examples:

```javascript
import { 
  getEvents, 
  getEventById, 
  getFundData,
  createEvent,
  updateEvent 
} from './services/dataService';

// Fetch all events
const events = await getEvents();

// Fetch a specific event
const event = await getEventById('1');

// Fetch fund data for a cashbook
const fundData = await getFundData('CB2025001');

// Create a new event
const newEvent = await createEvent({
  id: '14',
  title: 'New Event',
  description: 'Event description',
  type: 'College Event',
  status: 'Upcoming',
  date: '2025-12-20',
  team: 'Event Team',
  cashbook_id: 'CB2025001',
  media: 'https://example.com/image.jpg'
});

// Update an event
const updated = await updateEvent('1', {
  status: 'Ongoing'
});
```

## Environment Variables

The `.env` file contains your Supabase credentials:

```env
VITE_SUPABASE_URL=https://ybomzyaamswodtsqskfp.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Important:** Never commit the `.env` file to version control. It's already added to `.gitignore`.

## Security Notes

1. **Row Level Security (RLS)** is enabled on all tables
2. Current policies allow public read/write access - adjust these in production
3. The anon key is safe to use in client-side code
4. For production, implement proper authentication and authorization

## Troubleshooting

### Migration fails with "relation does not exist"
- Make sure you ran the SQL schema file first (Step 1)

### Permission denied errors
- Check that RLS policies are properly configured
- Verify your anon key is correct

### Data not showing in app
- Clear browser cache and reload
- Check browser console for errors
- Verify the data exists in Supabase Table Editor

## Next Steps

1. ✅ Database tables created
2. ✅ Data migrated
3. 🔄 Update your React components to use the new data service
4. 🔄 Test all CRUD operations
5. 🔄 Implement proper error handling
6. 🔄 Add loading states to your UI

## Support

For issues with Supabase, check:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
