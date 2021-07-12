import { onError } from 'apollo-link-error';
import { Logger } from '@vue-storefront/core';

export const createErrorHandler = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        if (!message.includes('Resource Owner Password Credentials Grant')) {
          if (!locations) {
            Logger.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
            return;
          }

          const parsedLocations = locations.map(({ column, line }) => `[column: ${column}, line: ${line}]`);

          Logger.error(`[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(', ')}, Path: ${path}`);
        }
      });
    }

    if (networkError) {
      Logger.error(`[Network error]: ${networkError}`);
    }
  });
};
