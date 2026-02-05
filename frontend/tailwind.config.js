/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent -- used only for active actions
        primary: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',   // Main button / link color
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Neutral scale 
        neutral: {
          50:  '#fafafa',   // Page background
          100: '#f5f5f5',   // Card backgrounds, hover states
          200: '#e5e5e5',   // Borders
          300: '#d4d4d4',   // Disabled borders
          400: '#a3a3a3',   // Placeholder text, timestamps
          500: '#737373',   // Secondary text
          600: '#525252',   // Body text (use sparingly)
          700: '#404040',   // Body text (default)
          800: '#262626',   // Headings
          900: '#171717',   // Primary headings, high-emphasis text
        },
      },
      fontFamily: {
        // A serif for headings adds the editorial/luxury feel.
        // A clean sans-serif for body - readability.
        sans: ['Geist', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        // minimal.
        'none': 'none',
        'xs':   '0 1px 2px rgba(0, 0, 0, 0.04)',
        'sm':   '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'md':   '0 2px 8px rgba(0, 0, 0, 0.06)',
        'lg':   '0 4px 16px rgba(0, 0, 0, 0.08)',  // Modal / elevated card only
        'popup': '0 8px 32px rgba(0, 0, 0, 0.12)', // Dropdown / popover only
      },
      borderRadius: {
        // Nothing is heavily rounded.
        'none': '0',
        'sm':   '4px',
        'md':   '6px',     // Default for inputs and buttons
        'lg':   '8px',     // Cards
        'xl':   '12px',    // Modal
        'full': '9999px',  // Pills / badges only
      },
      fontSize: {
        'xs':   ['11px', { lineHeight: '16px', letterSpacing: '0.02em' }],
        'sm':   ['13px', { lineHeight: '18px' }],
        'base': ['14px', { lineHeight: '20px' }],
        'md':   ['15px', { lineHeight: '22px' }],
        'lg':   ['18px', { lineHeight: '26px', fontWeight: '600' }],
        'xl':   ['22px', { lineHeight: '30px', fontWeight: '600' }],
        '2xl':  ['28px', { lineHeight: '36px', fontWeight: '600' }],
        '3xl':  ['36px', { lineHeight: '44px', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
}