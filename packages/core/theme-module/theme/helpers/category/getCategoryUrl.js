export function getCategoryUrl(category, context = this) {
  return `/c/${context.root.$route.params.slug_1}/${category.slug}`;
}
