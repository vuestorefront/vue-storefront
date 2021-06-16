import { UseStoreGetters, AgnosticAddress, AgnosticLocale, AgnosticStore } from '@vue-storefront/core';
import { Store, Channel, Address } from '../types/GraphQL';
import { StoresData } from '../types';
import { FilterCriteriaRecord, Localized, filterArrayByCriteriaRecord } from '../helpers/internals';

/**
 * Types
 */

interface StoreFilterCriteria {
  store?: FilterCriteriaRecord<Store>;
  channel?: FilterCriteriaRecord<Channel>
}

type StoreChannelSetKeys =
  'distributionChannels' |
  'supplyChannels';

/**
 * Helpers
 */

function mapToAddress(address: Address): AgnosticAddress {
  return {
    addressLine1: `${address?.country ?? ''} ${address?.city ?? ''} ${address?.postalCode ?? ''}`.trim(),
    addressLine2: `${address?.streetName ?? ''} ${address?.streetNumber ?? ''}`.trim(),
    _address: address ?? null
  };
}

function mapToLocale <T extends Localized>(localized: T): AgnosticLocale {
  return {
    code: localized.locale,
    label: ''
  };
}

function mapToLocales(localized: Localized[]): AgnosticLocale[] {
  return localized?.map(mapToLocale) ?? [];
}

function mapChannelToAgnosticStore (store: Store) {
  return function (channel: Channel): AgnosticStore {
    return {
      name: `${store?.name ?? ''} - ${channel?.name ?? ''}`.trim(),
      id: `${store?.id ?? ''}/${channel?.id ?? ''}`.trim(),
      description: channel?.description ?? '',
      geoLocation: channel?.geoLocation ?? null,
      locales: mapToLocales(channel?.descriptionAllLocales),
      address: mapToAddress(channel?.address),
      _storeID: store?.id ?? '',
      _channelID: channel?.id ?? ''
    };
  };
}

function mapChannelSet (store: Store, channels: Channel[]): AgnosticStore[] {
  return channels?.map(mapChannelToAgnosticStore(store)) ?? [];
}

function mapChannelSetByKey (store: Store, key: StoreChannelSetKeys, criteria?: FilterCriteriaRecord<Channel>): AgnosticStore[] {
  return mapChannelSet(
    store, filterArrayByCriteriaRecord<Channel>(
      store?.[key], criteria
    )
  );
}

function gainAgnosticStoreItems (criteria?: FilterCriteriaRecord<Channel>) {
  return function (acc: AgnosticStore[], store: Store): AgnosticStore[] {
    return [
      ...acc,
      ...mapChannelSetByKey(store, 'distributionChannels', criteria),
      ...mapChannelSetByKey(store, 'supplyChannels', criteria)
    ];
  };
}

/**
 * Getters
 */

function getItems (stores: StoresData, criteria: StoreFilterCriteria = {}): AgnosticStore[] {
  return filterArrayByCriteriaRecord<Store>(stores?.results, criteria.store)?.reduce(gainAgnosticStoreItems(criteria.channel), []) ?? [];
}

function getSelected (stores: StoresData): AgnosticStore | undefined {
  const [storeID, channelID] = (stores?._selected ?? '').split('/');
  return getItems(stores, { store: { id: storeID }, channel: { id: channelID } })[0];
}

/**
 * Export
 */

const storeGetters: UseStoreGetters<StoresData, StoreFilterCriteria> = {
  getItems,
  getSelected
};

export default storeGetters;
