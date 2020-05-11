import { setup } from '@vue-storefront/about-you-api';
import { getCartToken } from '~/helpers/cart/getCartToken';
import { getWishlistToken } from '~/helpers/cart/getWishlistToken';

export default async function init(context) {
  const { app } = context;
  const { locales: availableLocales, locale: defaultLocale } = app.i18n;
  const selectedLocale = availableLocales.find((locale) => locale.code === defaultLocale);

  setup({
    api: {
      host: 'https://boston.backbone-api.demo.aboutyou.cloud/v1/',
      auth: {
        username: 'aboutyou',
        password: 'OmNErAb96Y5Qn75SFhXr'
      },
      shopId: selectedLocale.shopId
    },
    imgUrl: 'https://mt1.dam.demo.aboutyou.cloud/boston',
    cartToken: getCartToken(app),
    wishlistToken: getWishlistToken(app)
  });
}
