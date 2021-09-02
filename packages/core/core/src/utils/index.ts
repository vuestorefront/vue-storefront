/* istanbul ignore file */

import { onSSR, vsfRef, configureSSR } from './ssr';
import { sharedRef } from './shared';
import wrap from './wrap';
import { Logger, registerLogger } from './logger';
import mask from './logger/mask';
import { useVSFContext, configureContext, generateContext } from './context';
import { integrationPlugin } from './nuxt';
import { configureFactoryParams } from './factoryParams';

export {
  wrap,
  onSSR,
  vsfRef,
  configureSSR,
  sharedRef,
  Logger,
  registerLogger,
  mask,
  configureContext,
  useVSFContext,
  configureFactoryParams,
  generateContext,
  integrationPlugin
};
