import { ApiClientExtension } from '@vue-storefront/core';
import { CT_COOKIE_NAME, Token } from '../types/setup';

function parseToken(rawToken: string): Token {
  try {
    return JSON.parse(rawToken);
  } catch (e) {
    return null;
  }
}

export const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',

  hooks(request, response) {
    let currentToken = parseToken(request.cookies[CT_COOKIE_NAME]);

    /**
     * Updates token cookie.
     */
    function onTokenChange(token) {
      currentToken = token;

      const options = {
        ...(token?.expires_at && { expires: new Date(token.expires_at) }),
        httpOnly: true,
        secure: request.secure
      };

      return response.cookie(
        CT_COOKIE_NAME,
        JSON.stringify(token),
        options
      );
    }

    /**
     * Returns current access token.
     */
    function onTokenRead() {
      return currentToken;
    }

    /**
     * Removes token cookie.
     */
    function onTokenRemove() {
      currentToken = null;

      return response.clearCookie(CT_COOKIE_NAME);
    }

    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        auth: {
          onTokenChange,
          onTokenRead,
          onTokenRemove
        }
      })
    };
  }
};
