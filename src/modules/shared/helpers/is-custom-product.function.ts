const customProductsSkus = [
  'customPrintedSocks_bundle',
  'customPrintedMasks_bundle',
  'customPrintedKeychains_bundle',
  'customFeltedMagnets_bundle',
  'customPillow_bundle',
  'petsiesPhrasePillow_bundle',
  'ForeversDog_bundle',
  'ForeversCat_bundle',
  'ForeversOther_bundle'
];

export default function isCustomProduct (productSku: string): boolean {
  return customProductsSkus.includes(productSku);
}
