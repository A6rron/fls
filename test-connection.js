import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ybomzyaamswodtsqskfp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlib216eWFhbXN3b2R0c3Fza2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0Nzk0NzEsImV4cCI6MjA3NjA1NTQ3MX0.rr6MrypJqUuTJFI0xUJCf70urd_X16XZnHJUGERnKNk';

console.log('🔌 Testing Supabase connection...\n');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('events')
      .select('count');

    if (error) {
      if (error.message.includes('relation') || error.code === '42P01') {
        console.log('⚠️  Tables do not exist yet.');
        console.log('📋 Next steps:');
        console.log('   1. Go to your Supabase Dashboard SQL Editor');
        console.log('   2. Run the SQL from supabase-schema.sql');
        console.log('   3. Then run: node migrate-to-supabase.js\n');
        return false;
      }
      throw error;
    }

    console.log('✅ Connection successful!');
    console.log('✅ Tables exist and are accessible\n');
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n📋 Troubleshooting:');
    console.log('   - Check your Supabase URL and API key');
    console.log('   - Ensure your Supabase project is active');
    console.log('   - Check your internet connection\n');
    return false;
  }
}

testConnection();
