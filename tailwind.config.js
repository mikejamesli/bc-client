// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      maxWidth: {
        '8xl': '100rem',
      },
      backgroundColor: theme => ({
        bc: '#191e2f',
      }),
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {},
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar"
    })
  ]
};
