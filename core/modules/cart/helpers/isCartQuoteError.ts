import CartQuoteError from '../types/CartQuoteError';

export default function isCartQuoteError (errorMessage: string): boolean {
  let isError = false;

  [
    CartQuoteError.ACTIVE_QUOTE_NOT_FOUND,
    CartQuoteError.NO_QUOTE_FOUND_FOR_CART_ID,
    CartQuoteError.USER_IS_NOT_AUTHORIZED
  ].forEach((error) => {
    if (errorMessage.includes(error)) {
      isError = true;
    }
  })

  return isError;
}
