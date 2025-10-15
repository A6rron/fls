# Fund & Ledger System (FLS)

A transparent fund tracking platform for college events built with **pure HTML, CSS, and JavaScript** - no frameworks, no dependencies, no build tools!

## 🎯 What is FLS?

The **Fund & Ledger System** brings complete financial transparency to college events by:
- Tracking all funds collected and spent for events
- Ensuring transparency in donations and expenses
- Maintaining complete financial records
- Showcasing college events with detailed fund information

## ✨ Features

- **Landing Page**: Introduction to FLS with key features and benefits
- **Projects Page**: Browse all college events with search and filter functionality
- **Project Details**: View detailed fund information and transaction history
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Pure Vanilla JS**: No frameworks, no dependencies, just HTML/CSS/JS!

## 📚 Event Types

- **College Events**: Union Day, College Day, Annual Functions
- **Department Fests**: Technical fests, Department celebrations
- **College Fests**: Multi-day mega events (Euphoria, etc.)
- **IV Plans**: Industrial visits, educational trips

## 🚀 Quick Start

### Option 1: Python HTTP Server (Recommended)

```bash
cd public
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Option 2: Node.js HTTP Server

```bash
cd public
npx http-server -p 8000
```

### Option 3: Open Directly

Simply open `index.html` in your web browser.

## 📁 File Structure

```
public/
├── index.html      # Main HTML file with all pages
├── styles.css      # All styling (Tailwind-inspired)
├── app.js          # Application logic with local data
└── README.md       # This file
```

## 📊 Sample Data

The application includes realistic mock data for 5 college events:

1. **Union Day 2025** - Student union celebration (₹85,000 raised)
2. **College Day 2025** - Annual college day (₹1,25,000 raised)
3. **CS Department Fest - CodeFiesta** - Technical fest (₹45,000 raised)
4. **Annual College Fest - Euphoria 2025** - Mega fest (₹1,80,000 raised)
5. **Industrial Visit - Tech Park Bangalore** - IV plan (₹35,000 raised)

Each event includes:
- Complete fund breakdown (raised, expenses, balance)
- Detailed transaction history
- Income sources (union budget, sponsorships, donations, etc.)
- Expense categories (infrastructure, entertainment, catering, etc.)

## ✏️ Customizing Data

All data is stored in `app.js`. To add or modify events:

### Add New Event

Edit `app.js` and add to the `getMockProjects()` function:

```javascript
{
    id: '6',
    title: 'Your Event Name',
    description: 'Event description here',
    type: 'College Event', // or 'Department Fest', 'College Fest', 'IV Plan'
    status: 'Upcoming',    // or 'Ongoing', 'Completed', 'Cancelled'
    date: '2025-12-01',
    team: 'Organizing Team',
    cashbook_id: 'CB2025006',
    media: 'https://images.unsplash.com/photo-xxxxx?w=800',
    created_at: '2025-11-01',
    updated_at: '2025-11-01'
}
```

### Add Financial Data

Add corresponding fund data in the `FUND_DATA` object:

```javascript
CB2025006: {
    fundsRaised: 50000,
    expenses: 30000,
    remainingBalance: 20000,
    transactions: [
        { 
            id: '1', 
            date: '2025-11-01', 
            description: 'Sponsorship', 
            type: 'income', 
            amount: 50000, 
            category: 'Sponsorship' 
        },
        // Add more transactions...
    ]
}
```

## 🎨 Customization

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --purple-600: #9333ea;  /* Primary color */
    --purple-700: #7e22ce;  /* Hover color */
    /* Modify other colors as needed */
}
```

### Change Logo

Edit the navbar in `index.html`:

```html
<button id="nav-logo" class="nav-logo">Your Logo</button>
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 No Build Required

This is a pure vanilla JavaScript application with:
- ✅ No build step
- ✅ No dependencies
- ✅ No package manager required
- ✅ No npm/node_modules
- ✅ Just open and run!

## 👥 About

**A project by MESMX** - Tech Community from MES College Marampally

### GitHub
[View on GitHub](https://github.com/mesmx)

## 📄 License

This project is for educational purposes.

---

**Built for transparent college event management** 🎓💰
