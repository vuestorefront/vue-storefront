import { AvailabilityRules } from './availability-rules.interface';
import { CustomizationType } from './customization-type';
import { OptionData } from './option-data.interface';
import { OptionVariant } from './option-variant.interface';

export interface Customization {
  availabilityRules: AvailabilityRules,
  bundleOptionId?: number,
  id: string,
  isEnabled: boolean,
  parentId?: string,
  name: string,
  optionData?: OptionData,
  showInCart: boolean,
  sn: number,
  title?: string,
  type: CustomizationType,
  variants?: OptionVariant[],
  isLocked: boolean
}
