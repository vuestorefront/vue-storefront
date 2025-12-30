import { AddressValidationStatus } from './address-validation-status';

export interface AddressExtensionAttributes {
  validation_status_id?: AddressValidationStatus,
  validation_customer_override?: boolean,
  validation_warnings?: string,
  validation_suggested_address?: string
}
