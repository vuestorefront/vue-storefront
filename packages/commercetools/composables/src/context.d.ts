import { IntegrationContext } from '@vue-storefront/core';
import { ClientInstance, ApiInstance, Config } from '@vue-storefront/commercetools-api';

declare module '@vue-storefront/core' {
  export interface Context {
    $ct: IntegrationContext<ClientInstance, Config, ApiInstance>;
  }
}
