export function getCategoryPath(category, context = this) {
  return `/c/${context.$route.params.slug_1}/${category.slug}`;
}
