/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        'bg-soft': 'rgb(var(--bg-soft) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        'panel-2': 'rgb(var(--panel-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--ink-2) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        brand: 'rgb(var(--brand) / <alpha-value>)',
        'brand-2': 'rgb(var(--brand-2) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Manrope Variable"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"Noto Sans SC"', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      borderRadius: {
        xl2: '1.35rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgb(var(--shadow) / 0.08), 0 12px 40px -18px rgb(var(--shadow) / 0.18)',
        card: '0 1px 2px rgb(var(--shadow) / 0.05), 0 18px 50px -28px rgb(var(--shadow) / 0.28)',
        lift: '0 8px 24px -10px rgb(var(--shadow) / 0.22), 0 30px 70px -40px rgb(var(--brand) / 0.45)',
        glow: '0 0 0 1px rgb(var(--brand) / 0.16), 0 12px 48px -12px rgb(var(--brand) / 0.35)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, rgb(var(--brand)) 0%, rgb(var(--brand-2)) 52%, rgb(var(--accent)) 100%)',
        'brand-gradient-soft': 'linear-gradient(120deg, rgb(var(--brand) / 0.12), rgb(var(--brand-2) / 0.12), rgb(var(--accent) / 0.1))',
        'grid-fade': 'linear-gradient(to bottom, transparent, rgb(var(--bg)))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.08)' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite',
        'spin-slow': 'spinSlow 26s linear infinite',
        'fade-up': 'fadeUp 0.65s cubic-bezier(.2,.7,.2,1) both',
        'fade-in': 'fadeIn 0.5s ease both',
        shimmer: 'shimmer 2.8s linear infinite',
        'gradient-move': 'gradientMove 8s ease infinite',
      },
      maxWidth: {
        page: '1240px',
        prose: '760px',
      },
    },
  },
  plugins: [],
}
