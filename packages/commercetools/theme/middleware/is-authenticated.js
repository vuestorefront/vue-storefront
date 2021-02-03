export default async ({ app, redirect }) => {
  if (!app.$cookies.get('vsf-commercetools-token')?.scope?.includes('customer_id')) {
    return redirect('/');
  }
};
