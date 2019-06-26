export async function afterRegistration ({ Vue, config, store, isServer }) {
  if (isServer) await store.dispatch('category-next/_prepareCategoriesHierarchyMap')
}
