import { Logger } from '@vue-storefront/core';

export default async ({ $vsf, route, redirect }) => {
  try {
    const isGuest = await $vsf.$ct.api.isGuest();

    if (isGuest) {
      throw new Error(`"${ route.fullPath }" route is only available to logged-in customers`);
    }
  } catch (error) {
    Logger.warn(error.toString());
    return redirect('/');
  }
};
