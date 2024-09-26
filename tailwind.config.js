/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{html,js,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
			fontFamily: {
				sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        roboto: ["Roboto", "sans-serif"],
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

