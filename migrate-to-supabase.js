import { createClient } from '@supabase/supabase-js';
import { FUND_DATA, MOCK_EVENTS } from './src/data/mockData.js';

// Supabase configuration
const supabaseUrl = 'https://ybomzyaamswodtsqskfp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlib216eWFhbXN3b2R0c3Fza2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0Nzk0NzEsImV4cCI6MjA3NjA1NTQ3MX0.rr6MrypJqUuTJFI0xUJCf70urd_X16XZnHJUGERnKNk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrateCashbooks() {
  console.log('🔄 Migrating cashbooks...');
  
  const cashbooks = Object.entries(FUND_DATA).map(([id, data]) => ({
    id,
    funds_raised: data.fundsRaised,
    expenses: data.expenses,
    remaining_balance: data.remainingBalance
  }));

  const { data, error } = await supabase
    .from('cashbooks')
    .upsert(cashbooks, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error migrating cashbooks:', error);
    throw error;
  }

  console.log(`✅ Successfully migrated ${cashbooks.length} cashbooks`);
  return data;
}

async function migrateTransactions() {
  console.log('🔄 Migrating transactions...');
  
  const transactions = [];
  
  Object.entries(FUND_DATA).forEach(([cashbookId, data]) => {
    data.transactions.forEach((transaction) => {
      transactions.push({
        id: `${cashbookId}-${transaction.id}`,
        cashbook_id: cashbookId,
        date: transaction.date,
        description: transaction.description,
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        volunteer: transaction.volunteer || null,
        receipt: transaction.receipt || null
      });
    });
  });

  const { data, error } = await supabase
    .from('transactions')
    .upsert(transactions, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error migrating transactions:', error);
    throw error;
  }

  console.log(`✅ Successfully migrated ${transactions.length} transactions`);
  return data;
}

async function migrateEvents() {
  console.log('🔄 Migrating events...');
  
  const events = MOCK_EVENTS.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    type: event.type,
    status: event.status,
    date: event.date,
    team: event.team,
    cashbook_id: event.cashbook_id,
    media: event.media,
    created_at: event.created_at,
    updated_at: event.updated_at
  }));

  const { data, error } = await supabase
    .from('events')
    .upsert(events, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error migrating events:', error);
    throw error;
  }

  console.log(`✅ Successfully migrated ${events.length} events`);
  return data;
}

async function verifyMigration() {
  console.log('\n🔍 Verifying migration...');
  
  const { data: cashbooks, error: cashbooksError } = await supabase
    .from('cashbooks')
    .select('*');
  
  const { data: transactions, error: transactionsError } = await supabase
    .from('transactions')
    .select('*');
  
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*');

  if (cashbooksError || transactionsError || eventsError) {
    console.error('❌ Error verifying migration');
    if (cashbooksError) console.error('Cashbooks error:', cashbooksError);
    if (transactionsError) console.error('Transactions error:', transactionsError);
    if (eventsError) console.error('Events error:', eventsError);
    return;
  }

  console.log(`\n📊 Migration Summary:`);
  console.log(`   Cashbooks: ${cashbooks?.length || 0}`);
  console.log(`   Transactions: ${transactions?.length || 0}`);
  console.log(`   Events: ${events?.length || 0}`);
}

async function main() {
  console.log('🚀 Starting migration to Supabase...\n');
  
  try {
    // Migrate in order: cashbooks first (parent), then transactions and events
    await migrateCashbooks();
    await migrateTransactions();
    await migrateEvents();
    
    await verifyMigration();
    
    console.log('\n✨ Migration completed successfully!');
  } catch (error) {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  }
}

main();
