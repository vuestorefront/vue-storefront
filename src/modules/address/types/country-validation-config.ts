export interface CountryValidationOptions {
  hideState?: boolean,
  useStateFromAddressComponents?: boolean
}

export type CountryValidationConfig = Record<string, CountryValidationOptions>;
