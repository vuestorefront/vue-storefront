import gql from 'graphql-tag';
import { Logger } from '@vue-storefront/core';
import defaultQuery from './defaultMutation';
import { CustomQueryFn } from './../../types/Api';
import { getCustomQuery } from './../../helpers/queries';
import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL';

const VERSION_MISSMATCH_CODE = 'ConcurrentModification';

export interface UpdateCartParams {
  id: string;
  version: number;
  actions: CartUpdateAction[] | MyCartUpdateAction[];
  versionFallback?: boolean;
}

const updateCart = async (context, params: UpdateCartParams, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage } = context.config;
  const defaultVariables = params
    ? {
      locale,
      acceptLanguage,
      ...params
    }
    : { acceptLanguage };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  try {
    const request = await context.client.mutate({
      mutation: gql`${query}`,
      variables,
      fetchPolicy: 'no-cache'
    });

    return request;
  } catch (error) {
    const canRetry = params.versionFallback ?? true;
    const causedByMissmatch = error.graphQLErrors?.[0]?.code?.includes(VERSION_MISSMATCH_CODE);

    if (!causedByMissmatch || !canRetry) {
      throw error;
    }

    Logger.debug('Cart version missmatch. Retrying with current version.');

    return updateCart(context, {
      ...params,
      version: error.graphQLErrors[0].currentVersion
    });
  }
};

export default updateCart;
