import gql from 'graphql-tag';
import { Logger, CustomQuery } from '@vue-storefront/core';
import defaultQuery from './defaultMutation';
import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL';
import { getStoreKey } from '../../helpers/utils';

const VERSION_MISMATCH_CODE = 'ConcurrentModification';

export interface UpdateCartParams {
  id: string;
  version: number;
  actions: CartUpdateAction[] | MyCartUpdateAction[];
  versionFallback?: boolean;
}

/**
 * @remarks References:
 * {@link UpdateCartParams}
 */
const updateCart = async (context, params: UpdateCartParams, customQuery?: CustomQuery) => {
  const { locale, acceptLanguage, currency, store } = context.config;

  const userVariables = params ? {
    locale,
    currency,
    ...params
  } : {};

  const defaultVariables = {
    ...userVariables,
    acceptLanguage,
    ...getStoreKey(store)
  };

  const { updateCart: updateCartGql } = context.extendQuery(
    customQuery, { updateCart: { query: defaultQuery, variables: defaultVariables } }
  );

  try {
    return await context.client.mutate({
      mutation: gql`${updateCartGql.query}`,
      variables: updateCartGql.variables,
      fetchPolicy: 'no-cache'
    });
  } catch (error) {
    const canRetry = params.versionFallback ?? true;
    const causedByMismatch = error.graphQLErrors?.[0]?.code?.includes(VERSION_MISMATCH_CODE);
    const currentVersion = error.graphQLErrors?.[0]?.currentVersion;

    if (!causedByMismatch || !canRetry || !currentVersion) {
      throw error;
    }

    Logger.debug('Cart version mismatch. Retrying with current version.');

    return updateCart(context, { ...params, version: currentVersion }, customQuery);
  }
};

export default updateCart;
