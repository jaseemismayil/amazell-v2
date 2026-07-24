import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#050505',
        panel: '#0b0b0c',
        'panel-2': '#111113',
        line: 'rgba(243,239,230,0.09)',
        'line-strong': 'rgba(243,239,230,0.16)',
        offwhite: '#f3efe6',
        muted: '#8f8c86',
        'muted-2': '#5c5a56',
        gold: '#c9a24b',
        'gold-bright': '#f2d38a',
        'gold-dim': 'rgba(201,162,75,0.35)',
        bronze: '#8a6a3d',
      },
      fontFamily: {
        display: ['var(--font-unbounded)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1360px',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(.16,.84,.44,1)',
      },
    },
  },
  plugins: [],
};

export default config;
