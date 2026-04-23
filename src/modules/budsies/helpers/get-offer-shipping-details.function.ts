import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { DEFAULT_CURRENCY_CODE } from 'src/modules/shared/types/default-currency-code';

const INTERNATIONAL_SHIPPING_COUNTRY_CODES = [
  'AL', 'DZ', 'AD', 'AO', 'AI', 'AR', 'AM', 'AW', 'AU', 'AT',
  'BH', 'BD', 'BB', 'BY', 'BE', 'BM', 'BT', 'BA', 'BR', 'VG',
  'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'KY', 'CF', 'CL',
  'CX', 'CO', 'CR', 'HR', 'CY', 'CZ', 'DK', 'EG', 'SV', 'EE',
  'SZ', 'FK', 'FO', 'FI', 'FR', 'GA', 'GM', 'GE', 'DE', 'GH',
  'GI', 'GR', 'GL', 'GU', 'GT', 'GG', 'GN', 'HK', 'HU', 'IS',
  'IN', 'ID', 'IE', 'IL', 'IT', 'JM', 'JP', 'JO', 'KZ', 'KE',
  'KI', 'XK', 'KW', 'KG', 'LV', 'LB', 'LS', 'LR', 'LI', 'LT',
  'LU', 'MO', 'MY', 'MV', 'MT', 'MX', 'MD', 'MC', 'ME', 'MA',
  'MM', 'NA', 'NR', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'MK',
  'NO', 'OM', 'PK', 'PY', 'PE', 'PH', 'PL', 'PT', 'PR', 'QA',
  'RO', 'RU', 'RW', 'RE', 'SM', 'SA', 'SN', 'RS', 'SG', 'SK',
  'SI', 'SB', 'ZA', 'KR', 'ES', 'LK', 'SD', 'SE', 'CH', 'ST',
  'TW', 'TJ', 'TZ', 'TH', 'TG', 'TO', 'TN', 'TM', 'TV', 'TR',
  'UM', 'VI', 'UG', 'AE', 'GB', 'UY', 'UZ', 'VU', 'VA', 'VN'
];

interface ShippingRateTier {
  maxWeightLbs: number,
  usRateUsd: number,
  internationalRateUsd: number
}

const SHIPPING_RATE_TIERS: ShippingRateTier[] = [
  { maxWeightLbs: 0.0, usRateUsd: 6.95, internationalRateUsd: 10.95 },
  { maxWeightLbs: 1.0, usRateUsd: 6.95, internationalRateUsd: 15.95 },
  { maxWeightLbs: 2.0, usRateUsd: 8.95, internationalRateUsd: 19.92 },
  { maxWeightLbs: 2.5, usRateUsd: 10.95, internationalRateUsd: 21.95 },
  { maxWeightLbs: 3.0, usRateUsd: 15.95, internationalRateUsd: 27.95 },
  { maxWeightLbs: 3.5, usRateUsd: 17.95, internationalRateUsd: 28.95 },
  { maxWeightLbs: 5.0, usRateUsd: 18.95, internationalRateUsd: 30.90 },
  { maxWeightLbs: 5.5, usRateUsd: 19.50, internationalRateUsd: 31.90 },
  { maxWeightLbs: 6.0, usRateUsd: 22.90, internationalRateUsd: 34.90 },
  { maxWeightLbs: 6.5, usRateUsd: 22.50, internationalRateUsd: 32.00 },
  { maxWeightLbs: 7.0, usRateUsd: 23.95, internationalRateUsd: 33.95 },
  { maxWeightLbs: 8.0, usRateUsd: 24.95, internationalRateUsd: 35.00 },
  { maxWeightLbs: 9.0, usRateUsd: 29.85, internationalRateUsd: 60.90 }
];

function findShippingRateTier (weightLbs: number): ShippingRateTier {
  return (
    SHIPPING_RATE_TIERS.find(tier => weightLbs <= tier.maxWeightLbs) ||
    SHIPPING_RATE_TIERS[SHIPPING_RATE_TIERS.length - 1]
  );
}

function buildShippingDetail (countryCodes: string[], rateUsd: number): object {
  return {
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: rateUsd,
      currency: DEFAULT_CURRENCY_CODE
    },
    shippingDestination: countryCodes.map(addressCountry => ({
      '@type': 'DefinedRegion',
      addressCountry
    }))
  };
}

export function getOfferShippingDetails (product: Product): object[] | undefined {
  const weightLbs = product.default_shipping_weight;

  if (!weightLbs) {
    return undefined;
  }

  const tier = findShippingRateTier(weightLbs);

  return [
    buildShippingDetail(['US'], tier.usRateUsd),
    buildShippingDetail(INTERNATIONAL_SHIPPING_COUNTRY_CODES, tier.internationalRateUsd)
  ];
}
