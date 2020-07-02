
module.exports = {
  purge: process.env.NODE_ENV === 'production' ? ['./src/**/*.html', './src/**/*.svelte'] : false,
  theme: {
    extend: {
      height: {
        "14" : "3.5rem"
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
      borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
      outline: ['active'],
      textOpacity: ['active']
    }
  },
  plugins: [],
}
