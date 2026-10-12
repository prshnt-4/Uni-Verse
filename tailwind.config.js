/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F1F0F6',
        card: '#FFFFFF',
        sidebar: '#FFFFFF',
        lavender: {
          light: '#F5F4FA',
          DEFAULT: '#E9E7F2',
          muted: '#DFDCEB',
          deep: '#C9C5DE'
        },
        primary: {
          DEFAULT: '#6255A5',
          dark: '#38304F',
          light: '#7F72C0',
          hover: '#524594'
        },
        blueAccent: {
          soft: '#DCEAFF',
          DEFAULT: '#6F91D5',
          light: '#EAF2FF',
          dark: '#4B6EB5'
        },
        pinkAccent: {
          soft: '#F7DCE5',
          DEFAULT: '#F3AFA5',
          light: '#FDEEF2',
          dark: '#D9897E'
        },
        text: {
          main: '#29283D',
          secondary: '#85869B',
          muted: '#A5A6BA'
        },
        borderBase: '#E9E8F0',
        success: '#9CCDB7',
        warning: '#F2C98A'
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '18px',
        'xl': '22px',
        '2xl': '28px',
        '3xl': '34px',
        'full': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(98, 85, 165, 0.05)',
        'card': '0 8px 30px -4px rgba(41, 40, 61, 0.04)',
        'float': '0 20px 40px -8px rgba(98, 85, 165, 0.08), 0 0 1px 1px rgba(233, 232, 240, 0.8)',
        'pill': '0 2px 10px rgba(98, 85, 165, 0.1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
