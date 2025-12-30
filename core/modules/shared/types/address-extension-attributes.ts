import { AddressValidationStatusId } from './address-validation-status-id';

export interface AddressExtensionAttributes {
  validation_status_id?: AddressValidationStatusId,
  validation_customer_override?: boolean,
  validation_warnings?: string,
  validation_suggested_address?: string,
  validation_validated_at?: string,
  validation_missing_address_components?: string
}
