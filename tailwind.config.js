// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    backgroundColor: theme => ({
      bc: '#191e2f',
    }),
    extend: {
      colors: {
        zero: "#080117",
      },
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
