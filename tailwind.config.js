/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#1193d4",
        "background-light": "#f6f7f8",
        "background-dark": "#101c22",
        "foreground-light": "#111618",
        "foreground-dark": "#f0f3f4",
        "subtle-light": "#617c89",
        "subtle-dark": "#dbe2e6",
        "border-light": "#dbe2e6",
        "border-dark": "#3a4a53"
      },
      fontFamily: {
        "display": ["Newsreader", "serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}

