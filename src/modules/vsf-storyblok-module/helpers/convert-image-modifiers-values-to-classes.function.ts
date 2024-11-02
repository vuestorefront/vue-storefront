import { ImageStyleModifier } from '../types/image-style-modifier.value';

export function convertImageStyleModifiersValuesToClasses (
  imageStyleModifiers: ImageStyleModifier[] | undefined
): string[] {
  if (!imageStyleModifiers) {
    return [];
  }

  const list: string[] = [];

  for (const imageStyleModifier of imageStyleModifiers) {
    if (imageStyleModifier === ImageStyleModifier.ROUNDED_CORNERS) {
      list.push('-rounded-corners');
      continue;
    }

    console.warn(`Unexpected image modifier value: ${imageStyleModifier}`);
  }

  return list;
}
