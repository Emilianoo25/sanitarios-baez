import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A4D8C',
          light: '#1E6BAD',
          dark: '#073661',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#FF6B35',
          hover: '#E55520',
          foreground: '#ffffff',
        },
        bone: '#F8F7F4',
        ink: '#1A1A1A',
        muted: '#5A6B7D',
        border: {
          DEFAULT: '#E8E8E8',
        },
        success: '#16A34A',
        background: '#ffffff',
        foreground: '#1A1A1A',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1A1A1A',
        },
        secondary: {
          DEFAULT: '#F8F7F4',
          foreground: '#1A1A1A',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        input: '#E8E8E8',
        ring: '#0A4D8C',
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        lg: '0.625rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
    },
  },
  plugins: [],
}

export default config
