import { ReferenceFragment } from './reference';

export const InitiatorFragment = `
  ${ReferenceFragment}

  fragment InitiatorFragment on Initiator {
    isPlatformClient
    externalUserId
    anonymousId
    clientId
    customerRef {
      ...ReferenceFragment
    }
    userRef {
      ...ReferenceFragment
    }
  }
`;
