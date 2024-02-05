import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInFromBottom: {
         '0%': { opacity: "0", transform: 'translateY(300px) rotateX(70deg) scale(1.6)' },
          '100%': { opacity: "1", transform: 'translateY(0) rotateX(0) scale(1)' },
        },
      },
      animation: {
        fadeInFromBottom: 'fadeInFromBottom 0.8s ease-in-out',
      },
      fontFamily: {
        swFont: ['var(--swFont)'],
        stdFont: ['var(--orbitronFont)'],
      }
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    layout: {
      fontSize: {
        small: '0.750rem',
        medium: '0.950rem',
        large: '1rem',
      }
    },
    themes: {
      dark: {
        colors: {
          warning: {
            DEFAULT: 'rgb(250 204 21)',
          }
        }
      }
    }
  })],
}
export default config
