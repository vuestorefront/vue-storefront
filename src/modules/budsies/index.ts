import Vue from 'vue'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import addonFactory from './factories/extra-photo-addon.factory';
import nl2br from './filters/nl2br';
import ExtraPhotoAddon from './models/extra-photo-addon.model';
import { ProductValue } from './models/product.value';
import ErrorConverterService from './services/error-converter.service';
import { budsiesStore } from './store'
import { Dictionary } from './types/Dictionary.type';
import ObjectBuilderInterface from './types/object-builder.interface';
import { ValueCollection } from './types/value.collection';
import { Value } from './types/value.interface';
import { cacheHandlerFactory } from './helpers/cacheHandler';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { isServer } from '@vue-storefront/core/helpers'
import * as types from './store/mutation-types'
import BaseImage from './components/BaseImage.vue';
import ImageSourceItem from './types/image-source-item.interface';
import ImageAspectRatioSpec from './types/image-aspect-ratio-spec.interface';
import Bodypart from './models/bodypart.model';
import BodypartValue from './models/bodypart-value.model';
import isAxiosError from './services/is-axios-error.typeguard';
import * as vuexTypes from './store/mutation-types';
import RushAddon from './models/rush-addon.model';
import { BodyPartValueContentType } from './types/body-part-value-content-type.value';
import { ImageUploadMethod } from './types/image-upload-method.value';
import { ProductId } from './models/product.id';

export const BudsiesModule: StorefrontModule = async function ({ store }) {
  StorageManager.init(types.SN_BUDSIES);

  store.registerModule('budsies', budsiesStore);

  if (!isServer) {
    await store.dispatch('budsies/synchronize');
  }

  store.subscribe(cacheHandlerFactory(Vue));
}

export {
  ExtraPhotoAddon,
  addonFactory,
  nl2br,
  Dictionary,
  ObjectBuilderInterface,
  ErrorConverterService,
  ProductValue,
  ValueCollection,
  Value,
  BaseImage,
  ImageSourceItem,
  ImageAspectRatioSpec,
  Bodypart,
  BodypartValue,
  BodyPartValueContentType,
  isAxiosError,
  vuexTypes,
  RushAddon,
  ImageUploadMethod,
  ProductId
}
