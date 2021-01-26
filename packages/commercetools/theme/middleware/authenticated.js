export default async ({ $vsf, redirect }) => {
  if (await $vsf.$ct.api.isGuest()) {
    return redirect('/');
  }
};
