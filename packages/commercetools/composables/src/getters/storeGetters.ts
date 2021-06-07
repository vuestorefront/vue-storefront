import { UseStoreGetters } from '@vue-storefront/core';
import { StoreQueryResult, Store, Channel, Address, Geometry, Maybe } from '../types/GraphQL';

/**
 * Types
 */

interface Predicate <T> {
  (param: T): boolean;
}

interface Callable {
  (...xs: any): any;
}

interface Localized {
  locale: string;
}

type FilterCriteriaRecord <T extends Record<string, any>> = {
  [K in keyof T]?: T[K] | Predicate<T[K]>;
}

type FilterCriteriaRecordValue <T extends Record<string, any>> =
  FilterCriteriaRecord<T>[keyof T]

type FilterCriteriaRecordField <T extends Record<string, any>> = [
  keyof T, FilterCriteriaRecordValue<T>
];

interface AgnosticStore {
  _storeID: string;
  _channelID: string;
  name: string;
  id: string;
  description: string;
  locales: string[];
  address: Maybe<Address>;
  geoLocation: Maybe<Geometry>;
}

interface AgnosticStoreFilterCriteria {
  store?: FilterCriteriaRecord<Store>;
  channel?: FilterCriteriaRecord<Channel>
}

type StoreChannelSetKeys =
  'distributionChannels' |
  'supplyChannels';

/**
 * Helpers
 */

function getLocale <T extends Localized>(localized: T): string {
  return localized?.locale ?? '';
}

function isCallableCriteriaRecordValue <T>(value: FilterCriteriaRecordValue<T>): value is Predicate<T[keyof T]> {
  return typeof value === 'function';
}

function filterByCriteriaRecordField <T>(target: T) {
  return function ([key, value]: FilterCriteriaRecordField<T>): boolean {
    return isCallableCriteriaRecordValue<T>(value)
      ? value(target?.[key])
      : target?.[key] === value;
  };
}

function filterByCriteriaRecord <T>(criteria: FilterCriteriaRecord<T>) {
  return function (target: T): boolean {
    return Object.entries<FilterCriteriaRecordValue<T>>(criteria)
      .every(
        filterByCriteriaRecordField<T>(target) as Callable
      );
  };
}

function filterArrayByCriteriaRecord <T>(array: T[], criteria?: FilterCriteriaRecord<T>): T[] {
  return criteria
    ? array?.filter(filterByCriteriaRecord<T>(criteria))
    : array;
}

function mapChannelToAgnosticStore (store: Store) {
  return function (channel: Channel): AgnosticStore {
    return {
      // public
      name: `${store?.name ?? ''} - ${channel?.name ?? ''}`.trim(),
      id: `${store?.id ?? ''}/${channel?.id ?? ''}`.trim(),
      description: channel?.description ?? '',
      locales: channel?.descriptionAllLocales?.map(getLocale) ?? [],
      address: channel?.address ?? null,
      geoLocation: channel?.geoLocation ?? null,

      // internal
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

function gainStoreItems (criteria?: FilterCriteriaRecord<Channel>) {
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

function getItems (response: StoreQueryResult, criteria: AgnosticStoreFilterCriteria = {}): AgnosticStore[] {
  return filterArrayByCriteriaRecord<Store>(response?.results, criteria.store)?.reduce(gainStoreItems(criteria.channel), []) ?? [];
}

function getName (item: AgnosticStore): string {
  return item?.name ?? '';
}

function getID (item: AgnosticStore): string {
  return item?.id ?? '';
}

function getDescription (item: AgnosticStore): string {
  return item?.description ?? '';
}

function getLocales (item: AgnosticStore): string[] {
  return item?.locales ?? [];
}

function getAddress (item: AgnosticStore): Maybe<Address> {
  return item?.address ?? null;
}

function getLocation (item: AgnosticStore): Maybe<Geometry> {
  return item?.geoLocation ?? null;
}

/**
 * Export
 */

const storeGetters: UseStoreGetters<StoreQueryResult, AgnosticStore, Maybe<Address>, Maybe<Geometry>> = {
  getItems,
  getName,
  getID,
  getDescription,
  getLocales,
  getAddress,
  getLocation
};

export default storeGetters;
