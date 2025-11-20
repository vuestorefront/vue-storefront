export interface GoogleValidationResponse {
  responseId?: string,
  result?: {
    verdict?: {
      possibleNextAction?: string,
      addressComplete?: boolean,
      hasUnconfirmedComponents?: boolean,
      hasInferredComponents?: boolean,
      hasReplacedComponents?: boolean
    },
    address?: {
      formattedAddress?: string,
      postalAddress?: {
        regionCode?: string,
        languageCode?: string,
        postalCode?: string,
        administrativeArea?: string,
        locality?: string,
        addressLines?: string[]
      },
      addressComponents?: {
        componentName?: {
          text?: string,
          languageCode?: string
        },
        componentType?: string,
        confirmationLevel?: string
      }[]
    },
    uspsData?: {
      standardizedAddress?: {
        firstAddressLine?: string,
        cityStateZipAddressLine?: string,
        city?: string,
        state?: string,
        zipCode?: string,
        zipCodeExtension?: string
      }
    }
  }
}
