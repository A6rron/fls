#!/bin/bash

echo "🚀 Supabase Quick Start Script"
echo "================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"
echo ""

# Test connection
echo "📡 Testing Supabase connection..."
node test-connection.js

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Go to: https://supabase.com/dashboard/project/ybomzyaamswodtsqskfp"
echo "2. Click 'SQL Editor' → 'New Query'"
echo "3. Copy content from 'supabase-schema.sql' and paste it"
echo "4. Click 'Run' to create tables"
echo ""
echo "5. Then run: node migrate-to-supabase.js"
echo ""
echo "📖 For detailed instructions, see: SETUP_INSTRUCTIONS.md"
echo ""
