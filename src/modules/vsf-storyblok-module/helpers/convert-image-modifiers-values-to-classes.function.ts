import { ImageModifier } from '../types/image-modifier.value';

export function convertImageModifiersValuesToClasses (
  imageModifiers: ImageModifier[] | undefined
): string[] {
  if (!imageModifiers) {
    return [];
  }

  const list: string[] = [];

  for (const imageModifier of imageModifiers) {
    if (imageModifier === ImageModifier.ROUNDED_CORNERS) {
      list.push('-rounded-corners');
      continue;
    }

    console.warn(`Unexpected image modifier value: ${imageModifier}`);
  }

  return list;
}
