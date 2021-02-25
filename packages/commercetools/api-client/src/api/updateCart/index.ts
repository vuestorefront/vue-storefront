import gql from 'graphql-tag';
import { Logger, CustomQuery } from '@vue-storefront/core';
import defaultQuery from './defaultMutation';
import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL';

const VERSION_MISSMATCH_CODE = 'ConcurrentModification';

export interface UpdateCartParams {
  id: string;
  version: number;
  actions: CartUpdateAction[] | MyCartUpdateAction[];
  versionFallback?: boolean;
}

type UpdateCart = (context, params: UpdateCartParams, customQueryFn?: CustomQuery) => Promise<any>

const updateCart: UpdateCart = async (context, params) => {
  const { locale, acceptLanguage } = context.config;
  const defaultVariables = params
    ? {
      locale,
      acceptLanguage,
      ...params
    }
    : { acceptLanguage };

  const { updateCart: updateCartGql } = context.createQuery({ updateCart: { query: defaultQuery, variables: defaultVariables } });

  try {
    const request = await context.client.mutate({
      mutation: gql`${updateCartGql.query}`,
      variables: updateCartGql.variables,
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
