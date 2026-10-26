import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        night: 'var(--c-night)',
        panel: 'var(--c-panel)',
        deep: 'var(--c-deep)',
        paper: 'var(--c-paper)',
        ink: 'var(--c-ink)',
        magenta: 'var(--c-magenta)',
        chrome: 'var(--c-chrome)',
        mute: 'var(--c-mute)',
        carbon: '#0b0b0c',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.06em',
        technical: '0.12em',
      },
      maxWidth: {
        site: '1440px',
      },
      keyframes: {
        'draw-route': {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.35)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'draw-route': 'draw-route 1.6s ease forwards',
        'fade-up': 'fade-up 0.7s ease forwards',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        ticker: 'ticker 28s linear infinite',
      },
      boxShadow: {
        magenta: 'var(--c-shadow-magenta)',
      },
    },
  },
  plugins: [],
}

export default config
