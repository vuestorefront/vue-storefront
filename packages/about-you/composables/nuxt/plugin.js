import { setup } from '@vue-storefront/about-you-api';
import { getCartToken } from '@vue-storefront/about-you/nuxt/helpers/cart/getCartToken'
import { getWishlistToken } from '@vue-storefront/about-you/nuxt/helpers/wishlist/getWishlistToken'

export default function init({ app }) {
  const { locales: availableLocales, locale: defaultLocale } = app.i18n;
  const selectedLocale = availableLocales.find((locale) => locale.code === defaultLocale);
  
  setup({
    api: {
      host: '<%= options.api.host %>',
      auth: {
        username: '<%= options.api.auth.username %>',
        password: '<%= options.api.auth.password %>'
      },
      shopId: selectedLocale.shopId
    },
    imgUrl: '<%= options.imgUrl %>',
    cartToken: getCartToken(app),
    wishlistToken: getWishlistToken(app)
  });
}
