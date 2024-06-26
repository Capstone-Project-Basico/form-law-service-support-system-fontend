import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

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
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-bg': "url('/anhnen.jpg')",
      },
      fontFamily: {
        sans: ['Roboto Condensed', 'Arial', 'Helvetica', 'sans-serif'],'lora': ['Lora', 'serif'],
        // other fonts...
      },
      letterSpacing: {
        custom: '1px',
      },
      
      colors: {
        primary: '#FF0004',
      },
      scale: {
        '200': '2',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
