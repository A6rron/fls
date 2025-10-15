# Fund & Ledger System - Vite + React + Tailwind CSS

This project has been successfully converted from vanilla HTML/CSS/JS to a modern **Vite + React + Tailwind CSS** stack while preserving the original design and UI.

## 🚀 Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Figtree Font** - Custom typography from Google Fonts

## 📦 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation bar component
│   ├── Footer.jsx              # Footer component
│   ├── LandingPage.jsx         # Home/landing page
│   ├── EventsPage.jsx          # Events listing page
│   └── EventDetailsPage.jsx    # Event details with transactions
├── data/
│   └── mockData.js             # Mock event and fund data
├── utils/
│   └── formatters.js           # Date and currency formatting utilities
├── App.jsx                     # Main app component with routing
├── main.jsx                    # React entry point
└── index.css                   # Global styles with Tailwind directives
```

## 🎨 Design Preservation

All original design elements have been preserved:
- ✅ Dark theme with gradient background
- ✅ Glass-morphism effects (backdrop blur)
- ✅ Smooth animations and transitions
- ✅ Responsive layout
- ✅ All icons and visual elements
- ✅ Color scheme and typography
- ✅ Interactive hover states

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or next available port)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔄 Migration Details

### What Changed:
1. **Build System**: Vanilla → Vite
2. **UI Framework**: Plain JS → React with hooks
3. **Styling**: Custom CSS → Tailwind CSS utility classes
4. **State Management**: DOM manipulation → React state (useState)
5. **Routing**: Manual page switching → React component-based routing

### What Stayed the Same:
1. **Design & UI**: Exact same look and feel
2. **Functionality**: All features work identically
3. **Data Structure**: Same mock data format
4. **User Experience**: Same navigation and interactions

## 📝 Key Features

- **Landing Page**: Hero section with features and workflow diagram
- **Events Page**: Categorized upcoming and completed events
- **Event Details**: Full transaction history with filtering
- **Transparent Fund Tracking**: Real-time fund management display
- **Cashbook Integration**: Simulated financial backend integration

## 🎯 Component Highlights

### State Management
- Uses React `useState` and `useEffect` hooks
- Component-based state instead of global variables
- Props for parent-child communication

### Styling Approach
- Tailwind utility classes for most styling
- Custom CSS for complex animations
- Responsive design with Tailwind breakpoints
- Glass-morphism with `backdrop-blur-glass` utility

### Performance
- Fast HMR (Hot Module Replacement) with Vite
- Optimized production builds
- Code splitting ready

## 📱 Responsive Design

The application is fully responsive:
- Mobile: Single column layout
- Tablet: 2-column grid for events
- Desktop: 3-4 column grid with full features

## 🔗 Original Files

The original HTML/CSS/JS files are preserved in the `public/` directory for reference.

## 🤝 Contributing

This is an open-source project by MESMX - a student organization from MES College Marampally.

## 📄 License

Same as original project.
