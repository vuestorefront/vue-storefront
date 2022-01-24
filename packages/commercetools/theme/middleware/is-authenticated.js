export default async ({ $vsf, route, redirect }) => {
  try {
    const isLoggedIn = await $vsf.$ct.api.isLoggedIn();

    if (!isLoggedIn) {
      throw new Error(`"${ route.fullPath }" route is only available to logged-in customers`);
    }
  } catch (error) {
    console.warn(error.toString());
    return redirect('/');
  }
};
