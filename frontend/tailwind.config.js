/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ONLY YOUR 4 COLORS - NO GRAYSCALE, NO OTHER COLORS
        // Everything derives from these 4 values
        
        // PRIMARY - Deep Purple (#1A0088) - Main UI, text, borders
        primary: {
          50:  '#F5F0FF',   // Lightest - backgrounds
          100: '#EBE5FF',   // Very light - hover states
          200: '#D6CCFF',   // Light - borders
          300: '#B8A3FF',   // Medium-light - disabled states
          400: '#9170FF',   // Medium - secondary elements
          500: '#6B47FF',   // Bright - hover/active
          600: '#1A0088',   // MAIN COLOR - primary actions, dark text
          700: '#140066',   // Dark - emphasis text
          800: '#0F0052',   // Darker - headings
          900: '#0A003D',   // Darkest - high contrast text
        },
        
        // ACCENT - Coral Orange (#FF5E32) - Warnings, errors, highlights
        accent: {
          50:  '#FFF5F2',   // Lightest - error backgrounds
          100: '#FFE8E0',   // Very light - alert backgrounds
          200: '#FFCEB8',   // Light - borders
          300: '#FFB08A',   // Medium-light
          400: '#FF8B5C',   // Medium
          500: '#FF5E32',   // MAIN COLOR - errors, warnings
          600: '#E54A1F',   // Dark - emphasis
          700: '#B83A15',   // Darker
          800: '#8A2B0F',   // Very dark
          900: '#5C1D0A',   // Darkest
        },
        
        // SUCCESS - Lime Green (#B6CF4F) - Success states, confirmations
        success: {
          50:  '#F9FCF0',   // Lightest - success backgrounds
          100: '#F2F8E0',   // Very light
          200: '#E5F1C2',   // Light - borders
          300: '#D4E89A',   // Medium-light
          400: '#C5DC72',   // Medium
          500: '#B6CF4F',   // MAIN COLOR - success states
          600: '#9AB83D',   // Dark
          700: '#7A942F',   // Darker
          800: '#5A6F23',   // Very dark - success text
          900: '#3A4A17',   // Darkest
        },
        
        // BACKGROUND - Cream (#EFE7D4) - Backgrounds, soft contrast
        background: {
          50:  '#FEFDFB',   // Almost white
          100: '#FBF9F5',   // Very light cream
          200: '#F7F3EB',   // Light cream
          300: '#EFE7D4',   // MAIN COLOR - primary background
          400: '#E5D9BC',   // Medium cream
          500: '#D9C9A2',   // Darker cream
          600: '#C8B080',   // Even darker
          700: '#B0935C',   // Brown-cream
          800: '#8A6F3C',   // Dark brown
          900: '#5C4A28',   // Darkest brown
        },
        
        // MAPPED SEMANTIC COLORS - Use your 4 colors for all purposes
        // Text colors - Use PRIMARY shades for all text
        text: {
          DEFAULT: '#0A003D',  // primary-900 for body text
          light: '#6B47FF',    // primary-500 for secondary text
          muted: '#9170FF',    // primary-400 for disabled/placeholder
        },
        
        // Border colors - Use PRIMARY and BACKGROUND shades
        border: {
          DEFAULT: '#D6CCFF',  // primary-200 for standard borders
          light: '#EBE5FF',    // primary-100 for subtle borders
          dark: '#1A0088',     // primary-600 for emphasis borders
        },
        
        // Surface colors - Use BACKGROUND and PRIMARY shades
        surface: {
          DEFAULT: '#FFFFFF',  // White for cards
          cream: '#EFE7D4',    // background-300 for page bg
          light: '#F5F0FF',    // primary-50 for hover states
        },
      },
      
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      
      boxShadow: {
        // Shadows use PRIMARY color with opacity
        'xs':   '0 1px 2px rgba(26, 0, 136, 0.04)',
        'sm':   '0 1px 3px rgba(26, 0, 136, 0.06), 0 1px 2px rgba(26, 0, 136, 0.04)',
        'md':   '0 2px 8px rgba(26, 0, 136, 0.08)',
        'lg':   '0 4px 16px rgba(26, 0, 136, 0.10)',
        'xl':   '0 8px 32px rgba(26, 0, 136, 0.12)',
      },
      
      borderRadius: {
        'sm':   '4px',
        'md':   '6px',
        'lg':   '8px',
        'xl':   '12px',
        'full': '9999px',
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
      
      animation: {
        'slide-down': 'slideDown 0.6s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
      },
      
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(10%)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}

