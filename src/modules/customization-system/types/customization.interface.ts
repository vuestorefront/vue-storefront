import { AvailabilityRules } from './availability-rules.interface';
import { CustomizationAvailabilityFlow } from './customization-availability-flow.type';
import { CustomizationType } from './customization-type';
import { OptionData } from './option-data.interface';
import { OptionVariant } from './option-variant.interface';

export interface Customization {
  availabilityRules: AvailabilityRules,
  bundleOptionId?: number,
  flowAvailability?: CustomizationAvailabilityFlow[],
  id: string,
  isEnabled: boolean,
  isHidden?: boolean,
  parentId?: string,
  name: string,
  optionData?: OptionData,
  showInCart: boolean,
  sn: number,
  title?: string,
  type: CustomizationType,
  variants?: OptionVariant[],
  isLocked: boolean,
  originalCustomizationId?: string
}
