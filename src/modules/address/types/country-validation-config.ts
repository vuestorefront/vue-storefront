/**
 * Configuration options for country-specific address validation logic.
 */
export interface CountryValidationOptions {
/**
   * Indicates that the state (administrative area) is not part of the standard
   * postal address for this country.
   *
   * When true:
   * 1. The Google Validation API is expected to omit the `administrativeArea` field.
   * 2. The UI state selector will be hidden.
   */
  isStateNonPostal?: boolean,

  /**
   * The specific 'type' identifier used to find the state/province value within
   * the Google API's `addressComponents` array.
   *
   * For most countries, this defaults to 'administrative_area_level_1', but
   * can be overridden for countries that use different levels (e.g., 'province' or 'parish').
   */
  stateComponentType?: string
}

export type CountryValidationConfig = Record<string, CountryValidationOptions | undefined>;
