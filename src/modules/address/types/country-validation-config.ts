export interface CountryValidationOptions {
  hideState?: boolean,
  useStateFromAddressComponents?: boolean,
  stateComponentType?: string
}

export type CountryValidationConfig = Record<string, CountryValidationOptions | undefined>;
