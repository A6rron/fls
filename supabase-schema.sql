-- Create Events Table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  date DATE NOT NULL,
  team TEXT NOT NULL,
  cashbook_id TEXT NOT NULL,
  media TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Cashbooks Table
CREATE TABLE IF NOT EXISTS cashbooks (
  id TEXT PRIMARY KEY,
  funds_raised NUMERIC DEFAULT 0,
  expenses NUMERIC DEFAULT 0,
  remaining_balance NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  cashbook_id TEXT NOT NULL REFERENCES cashbooks(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  category TEXT NOT NULL,
  volunteer TEXT,
  receipt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_cashbook_id ON events(cashbook_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_transactions_cashbook_id ON transactions(cashbook_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE cashbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed for your security requirements)
CREATE POLICY "Enable read access for all users" ON events
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON cashbooks
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON transactions
  FOR SELECT USING (true);

-- Optional: Add insert/update/delete policies if needed
CREATE POLICY "Enable insert for all users" ON events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON events
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON events
  FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON cashbooks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON cashbooks
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON cashbooks
  FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON transactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON transactions
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON transactions
  FOR DELETE USING (true);
