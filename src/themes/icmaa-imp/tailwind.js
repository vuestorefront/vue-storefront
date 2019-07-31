const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  prefix: 't-',
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        sans: [ 'Roboto', ...defaultTheme.fontFamily.sans ]
      },
      colors: {
        'primary': '#611122',
        'sale': '#006EA1',
        'alt-1': '#3D9FA5',
        'alt-2': '#CE8F4B',
        'alt-3': '#65BD82',
        'base-darkest': '#000000',
        'base-dark': '#1E1E1E',
        'base-tone': '#3E3E3E',
        'base-light': '#999999',
        'base-lighter': '#C7C7C7',
        'base-lightest': '#EDEDED'
      },
      spacing: {
        '3-1/2': '0.85rem'
      },
      fontSize: {
        'xxs': '0.625rem'
      },
      lineHeight: {
        'looser': '3',
        'super-loose': '4'
      },
      flex: {
        'fix': '0 0 auto',
        'expand': '1 0 auto'
      }
    }
  },
  variants: {
    backgroundColor: ['group-hover', 'responsive', 'hover', 'focus'],
    textColor: ['group-hover', 'responsive', 'hover', 'focus', 'placeholder'],
    opacity: ['placeholder']
  },
  plugins: [
    require('tailwindcss-accessibility'),
    /**
     * Add placeholder variant
     * @see https://tailwindcss.com/docs/pseudo-class-variants/#creating-custom-variants
    */
    function ({ addVariant, e }) {
      addVariant('placeholder', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`placeholder${separator}${className}`)}::placeholder`
        })
      })
    }
  ]
}
