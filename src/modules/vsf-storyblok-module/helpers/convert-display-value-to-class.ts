import { Display } from '../types/display.value';

export default function convertDisplayValueToClass (value: string | undefined, isStoryblokPreview: boolean): string {
  if (value === Display.MOBILE_ONLY) {
    return isStoryblokPreview ? '-editor-mobile-only' : '-mobile-only';
  }

  if (value === Display.MOBILE_HIDDEN) {
    return isStoryblokPreview ? '-editor-mobile-hidden' : '-mobile-hidden';
  }

  return '';
}
