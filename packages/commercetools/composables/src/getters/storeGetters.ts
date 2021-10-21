import { AgnosticAddress, AgnosticLocale, AgnosticStore, UseStoreGetters } from '@vue-storefront/core';
import { Store, Channel, Address } from '../types/GraphQL';
import { StoresData } from '../types';
import { FilterCriteriaRecord, Localized, filterArrayByCriteriaRecord } from '../helpers/internals';

export interface StoreFilterCriteria {
  store?: FilterCriteriaRecord<Store>;
  channel?: FilterCriteriaRecord<Channel>
}

type StoreChannelSetKeys =
  'distributionChannels' |
  'supplyChannels';

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

    /**
     * TODO
     * CT GraphQL "LocalizedString" type does not provide locale label value.
     * The default value is empty string to match the "AgnosticLocale" type.
     * Maybe AgnosticLocale["label"] property should be optional?
     */
    label: ''
  };
}

function mapToLocales(localized: Localized[]): AgnosticLocale[] {
  return localized?.map(mapToLocale) ?? null;
}

function mapStoreAndChannelToAgnosticStore (store: Store) {
  return function (channel?: Channel): AgnosticStore {
    return {
      name: `${store?.name ?? ''}${channel?.name ? ` - ${channel?.name}` : ''}`.trim(),
      id: `${store?.id ?? ''}${channel?.id ? `/${channel?.id}` : ''}`.trim(),
      description: channel?.description ?? '',
      geoLocation: channel?.geoLocation ?? null,
      locales: (mapToLocales(channel?.descriptionAllLocales) ?? store.languages) ?? [],
      address: mapToAddress(channel?.address),
      key: `${store?.key ?? ''}${channel?.id ? `/${channel?.id}` : ''}`.trim(),
      _storeID: store?.id ?? null,
      _channelID: channel?.id ?? null
    };
  };
}

function mapChannelSet (store: Store, channels: Channel[]): AgnosticStore[] {
  return channels?.map(mapStoreAndChannelToAgnosticStore(store)) ?? [];
}

function mapChannelSetByKey (store: Store,
  key: StoreChannelSetKeys,
  criteria?: FilterCriteriaRecord<Channel>): AgnosticStore[] {
  return mapChannelSet(
    store,
    filterArrayByCriteriaRecord<Channel>(
      store?.[key],
      criteria
    )
  );
}

function gainAgnosticStoreItems (criteria?: FilterCriteriaRecord<Channel>) {
  return function (acc: AgnosticStore[], store: Store): AgnosticStore[] {
    const mappedStores = [
      ...mapChannelSetByKey(store, 'distributionChannels', criteria),
      ...mapChannelSetByKey(store, 'supplyChannels', criteria)
    ];

    return [
      ...acc,
      ...(!mappedStores.length && !criteria
        ? [mapStoreAndChannelToAgnosticStore(store)()]
        : mappedStores)
    ];
  };
}

function getItems (stores: StoresData, criteria: StoreFilterCriteria = {}): AgnosticStore[] {
  return filterArrayByCriteriaRecord<Store>(
    stores?.results,
    criteria?.store)
    ?.reduce(gainAgnosticStoreItems(criteria.channel), []) ?? [];
}

function getSelected (stores: StoresData): AgnosticStore | undefined {
  return getItems(stores, { store: { key: (stores?._selectedStore ?? '') }})[0];
}

/**
 * @remarks References:
 * {@link StoresData}, {@link StoreFilterCriteria}
 */
const storeGetters: UseStoreGetters<StoresData, StoreFilterCriteria> = {
  getItems,
  getSelected
};

export default storeGetters;
