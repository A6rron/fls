/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0f1419',
        'bg-secondary': '#1a1f2e',
        'card-bg': 'rgba(26, 31, 46, 0.6)',
        'card-border': 'rgba(255, 255, 255, 0.1)',
        'accent-blue': '#595959',
        'accent-blue-dark': '#2d7dd2',
        'accent-green': '#4ade80',
        'accent-green-dark': '#22c55e',
        'accent-slate': '#64748b',
        'accent-pink': '#f472b6',
        'accent-orange': '#fb923c',
        'accent-mint': '#2dd4bf',
        'text-primary': '#f8fafc',
        'text-secondary': '#cbd5e1',
        'text-muted': '#64748b',
      },
      fontFamily: {
        'figtree': ['Figtree', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
