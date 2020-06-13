
module.exports = {
  purge: process.env.NODE_ENV === 'production' ? ['./src/**/*.html', './src/**/*.svelte'] : [],
  theme: {
    extend: {
      height: {
        "14" : "3.5rem"
      }
    },
  },
  variants: {},
  plugins: [],
}
