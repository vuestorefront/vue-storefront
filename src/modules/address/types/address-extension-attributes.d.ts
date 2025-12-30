import { AddressExtensionAttributes } from 'core/modules/checkout';
import { AddressValidationExtensionAttributes } from './address-validation-extension-attributes';

declare module 'core/modules/checkout' {
  interface AddressExtensionAttributes extends AddressValidationExtensionAttributes {}
}
