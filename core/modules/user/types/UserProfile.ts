export interface UserProfile {
  customer: {
    email: string,
    firstname: string,
    lastname: string,
    website_id?: number | string,
    addresses?: {
      firstname: string,
      lastname: string,
      street: (string | number)[],
      city: string,
      region?: {
        region: string | null,
        [k: string]: any
      },
      country_id: string | null,
      postcode: string | null,
      company?: string,
      telephone?: string,
      default_billing?: boolean,
      default_shipping?: boolean,
      [k: string]: any
    }[],
    custom_attributes?: {
      attribute_code: string,
      value: string | null,
      [k: string]: any
    }[],
    [k: string]: any
  }
}
