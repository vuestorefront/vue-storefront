import { UseStoreGetters as UseStoreDefaultGetters } from '@vue-storefront/core';
import { StoreQueryResult, Store, Channel, ChannelRole, Address, Geometry, LocalizedString, Maybe } from '../types/GraphQL';

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

interface StoreItem extends Channel {
  _store: Store;
}

interface StoreItemFilterCriteria {
  store?: FilterCriteriaRecord<Store>;
  channel?: FilterCriteriaRecord<Channel>
}

type StoreChannelSetKeys =
  'distributionChannels' |
  'supplyChannels';

interface UseStoreGetters extends UseStoreDefaultGetters<StoreQueryResult, StoreItem> {
  getParentStore(item: StoreItem): Store;
  getOwnName(item: StoreItem): string;
  getParentStoreName(item: StoreItem): string;
  getRoles(item: StoreItem): ChannelRole[];
  getVersion(item: StoreItem): number;
  getParentStoreVersion(item: StoreItem): number;
  getKey(item: StoreItem): string;
  getParentStoreKey(item: StoreItem): string;
  getParentStoreID(item: StoreItem): string;
  getDescription(item: StoreItem): string;
  getDescriptions(item: StoreItem): LocalizedString[];
  getDescriptionByLocale(item: StoreItem, locale: string): string;
  getAddress(item: StoreItem): Maybe<Address>;
  getGeoLocation(item: StoreItem): Maybe<Geometry>;
}

/**
 * Helpers
 */

function hasLocale (locale: string) {
  return function <T extends Localized>(localized: T): boolean {
    return localized?.locale === locale;
  };
}

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

function mapChannelToStoreItem (_store: Store) {
  return function (channel: Channel): StoreItem {
    return { ...channel, _store };
  };
}

function mapChannelSet (store: Store, channels: Channel[]): StoreItem[] {
  return channels?.map(mapChannelToStoreItem(store)) ?? [];
}

function mapChannelSetByKey (store: Store, key: StoreChannelSetKeys, criteria?: FilterCriteriaRecord<Channel>) {
  return mapChannelSet(
    store, filterArrayByCriteriaRecord<Channel>(
      store?.[key], criteria
    )
  );
}

function gainStoreItems (criteria?: FilterCriteriaRecord<Channel>) {
  return function (acc: StoreItem[], store: Store): StoreItem[] {
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

function getParentStore (item: StoreItem): Store {
  return item?._store;
}

function getItems (response: StoreQueryResult, criteria: StoreItemFilterCriteria = {}): StoreItem[] {
  return filterArrayByCriteriaRecord<Store>(response?.results, criteria.store)?.reduce(gainStoreItems(criteria.channel), []) ?? [];
}

function getName (item: StoreItem): string {
  return `${getParentStoreName(item)} ${getOwnName(item)}`.trim();
}

function getID (item: StoreItem): string {
  return item?.id ?? '';
}

function getLangs (item: StoreItem): string[] {
  return getDescriptions(item).map(getLocale);
}

function getOwnName (item: StoreItem): string {
  return item?.name ?? '';
}

function getParentStoreName (item: StoreItem): string {
  return getParentStore(item)?.name ?? '';
}

function getParentStoreID (item: StoreItem): string {
  return getParentStore(item)?.id ?? '';
}

function getRoles (item: StoreItem): ChannelRole[] {
  return item?.roles ?? [];
}

function getVersion (item: StoreItem): number {
  return item?.version ?? -1;
}

function getParentStoreVersion (item: StoreItem): number {
  return getParentStore(item)?.version ?? -1;
}

function getKey (item: StoreItem): string {
  return item?.key ?? '';
}

function getParentStoreKey (item: StoreItem): string {
  return getParentStore(item)?.key ?? '';
}

function getDescription (item: StoreItem): string {
  return item?.description ?? '';
}

function getDescriptions (item: StoreItem): LocalizedString[] {
  return item?.descriptionAllLocales ?? [];
}

function getDescriptionByLocale (item: StoreItem, locale: string): string {
  return getDescriptions(item)?.find(hasLocale(locale))?.value ?? '';
}

function getAddress (item: StoreItem): Maybe<Address> {
  return item?.address ?? null;
}

function getGeoLocation (item: StoreItem): Maybe<Geometry> {
  return item?.geoLocation ?? null;
}

/**
 * Export
 */

const storeGetters: UseStoreGetters = {
  getParentStore,
  getItems,
  getName,
  getOwnName,
  getParentStoreName,
  getKey,
  getParentStoreKey,
  getID,
  getParentStoreID,
  getVersion,
  getParentStoreVersion,
  getLangs,
  getRoles,
  getDescription,
  getDescriptions,
  getDescriptionByLocale,
  getAddress,
  getGeoLocation
};

export default storeGetters;
