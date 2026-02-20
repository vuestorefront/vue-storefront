import { Actions } from './actions.interface';
import { AvailabilityRules } from './availability-rules.interface';
import { GalleryImage } from './gallery-image.interface';

export interface OptionValue {
  id: string,
  bundleOptionItemId?: number,
  sku?: string,
  name?: string,
  description?: string,
  thumbnailUrl?: string,
  attachmentUrl?: string,
  color?: string,
  price?: number,
  isEnabled: boolean,
  isDefault: boolean,
  availabilityRules?: AvailabilityRules,
  actions?: Actions,
  sn: number,
  galleryImages?: GalleryImage[],
  originalOptionValueId?: string
}
