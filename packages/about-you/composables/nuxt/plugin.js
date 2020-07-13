import { setup } from '@vue-storefront/about-you-api';

export default function init({ app }) {
  const { locales: availableLocales, locale: defaultLocale } = app.i18n;
  const selectedLocale = availableLocales.find((locale) => locale.code === defaultLocale);
  const options = <%= serialize(options) %>;
  
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
    cartToken: options.getCartToken(app),
    wishlistToken: options.getWishlistToken(app)
  });
}
