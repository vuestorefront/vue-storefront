import { InitiatorFragment } from './initiator';

export const InventoryEntryFragment = `
  ${InitiatorFragment}

  fragment InventoryEntryFragment on InventoryEntry {
    id
    sku
    version
    createdAt
    lastModifiedAt
    quantityOnStock
    availableQuantity
    restockableInDays
    expectedDelivery
    supplyChannels {
      id
    }
    createdBy {
      ...InitiatorFragment
    }
    lastModifiedBy {
      ...InitiatorFragment
    }
  }
`;
