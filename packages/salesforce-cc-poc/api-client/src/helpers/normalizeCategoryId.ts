const normalizeCategoryId = (preNormalizedCategoryId: string): string => {
  return preNormalizedCategoryId.includes('/') ? preNormalizedCategoryId.slice(preNormalizedCategoryId.lastIndexOf('/') + 1) : preNormalizedCategoryId;
};
export default normalizeCategoryId;
