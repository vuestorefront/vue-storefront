const ADDITIONAL_FIELDS_LIST = [
  'thumbnail',
  'plushieId',
  'email',
  'plushieBreed',
  'plushieName',
  'plushieDescription',
  'uploadMethod',
  'bodyparts',
  'customerImages',
  'giftcard_options'
];

export default function fillProductWithAdditionalFields (
  {
    product,
    serverItem
  }: {
    product: Record<string, any>,
    serverItem: Record<string, any>
  }
): void {
  for (const key of ADDITIONAL_FIELDS_LIST) {
    if (serverItem.hasOwnProperty(key)) {
      product[key] = serverItem[key];
    }
  }
}
