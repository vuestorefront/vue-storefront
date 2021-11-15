import defaultMutation from './defaultMutation';
import { CartData } from './../../types/Api';
import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';
import { getStoreKey } from '../../helpers/utils';

/**
 * @remarks References:
 * {@link CartData}
 */
const createCart = async (context, cartDraft: CartData = {}, customQuery?: CustomQuery) => {
  const { locale, acceptLanguage, currency, country, store, inventoryMode } = context.config;

  const defaultVariables = {
    acceptLanguage,
    locale,
    currency,
    draft: {
      currency,
      country,
      inventoryMode,
      ...cartDraft
    },
    ...getStoreKey(store)
  };

  const { createCart: createCartGql } = context.extendQuery(
    customQuery, { createCart: { query: defaultMutation, variables: defaultVariables } }
  );

  const request = await context.client.mutate({
    mutation: gql`${createCartGql.query}`,
    variables: createCartGql.variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default createCart;
