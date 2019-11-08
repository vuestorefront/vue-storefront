export const getCategoryExtrasKeyByAttribute = (type: string): string => {
  return 'ce' + (type as string).charAt(0).toUpperCase() + (type as string).slice(1)
}
