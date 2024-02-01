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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
