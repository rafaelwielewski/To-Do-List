const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px',
      },
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      xs: '0.75',
      sm: '0.875rem',
      base: '1.0rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': 'rem',


    },
    extend: {
      colors: {
        pagebg: '#181b34',
        
        blue: '#1DA1F2',
        green: '#00ba7c',
        whitest: '#FFFFFF',
        darkblue: '#2795D9',
        lightblue: '#EFF9FF',
        darkest: '#080808',
        darker: '#16181c',
        dark: '#2f3336',
        gray: '#657786',
        light: '#AAB8C2',
        lighter: '#E1E8ED',
        lightest: '#F5F8FA',
        success: '#17BF63',
        danger: '#E0245E',
      },
    },
    fill: (theme) => ({
      current: 'currentColor',
      primary: theme('colors.primary'),
    }),
  },
  plugins: [
    require('flowbite/plugin')
  ],
}