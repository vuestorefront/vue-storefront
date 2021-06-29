import { LocalizedStringFragment } from './localized-string';
import { ChannelFragment } from './channel';
import { InitiatorFragment } from './initiator';

export const StoreFragment = `
  ${LocalizedStringFragment}
  ${ChannelFragment}
  ${InitiatorFragment}

  fragment StoreFragment on Store {
    id
    version
    key
    languages
    createdAt
    lastModifiedAt
    name (locale: $locale)
    nameAllLocales {
      ...LocalizedStringFragment
    }
    distributionChannels {
      ...ChannelFragment
    }
    supplyChannels {
      ...ChannelFragment
    }
    createdBy {
      ...InitiatorFragment
    }
    lastModifiedBy {
      ...InitiatorFragment
    }
  }
`;
