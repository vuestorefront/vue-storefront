const normalizeCategoryId = (preNormalizedCategoryId: string): string => {
  if (preNormalizedCategoryId) return preNormalizedCategoryId.includes('/') ? preNormalizedCategoryId.slice(preNormalizedCategoryId.lastIndexOf('/') + 1) : preNormalizedCategoryId;
  return preNormalizedCategoryId;
};
export default normalizeCategoryId;
