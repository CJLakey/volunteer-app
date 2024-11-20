/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",  // Target pages inside src
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",    // Target app directory inside src (if used)
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}", // In case styles use JSX/TSX files for custom components
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Include the components directory on the same level as src
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};