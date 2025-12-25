export interface CountryValidationOptions {
  isStateNonPostal?: boolean,
  stateComponentType?: string
}

export type CountryValidationConfig = Record<string, CountryValidationOptions | undefined>;
