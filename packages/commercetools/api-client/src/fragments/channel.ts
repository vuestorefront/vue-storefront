import { LocalizedStringFragment } from './localized-string';
import { AddressFragment } from './address';

export const ChannelFragment = `
  ${LocalizedStringFragment}
  ${AddressFragment}

  fragment ChannelFragment on Channel {
    id
    version
    key
    roles
    name(locale: $locale)
    description(locale: $locale)
    nameAllLocales {
      ...LocalizedStringFragment
    }
    descriptionAllLocales {
      ...LocalizedStringFragment
    }
    address {
      ...DefaultAddress
    }
  }
`;
