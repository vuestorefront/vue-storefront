import { generatePageCacheKey } from '../../page-cache-key';

describe('generatePageCacheKey', () => {
  it('ignores the cart recovery promo-code instruction', () => {
    const withoutInstruction = generatePageCacheKey(
      'petsies_store',
      'https://example.com/alerts/recover/cart/id/1/code/2'
    );
    const withInstruction = generatePageCacheKey(
      'petsies_store',
      'https://example.com/alerts/recover/cart/id/1/code/2?applyPromoCode=true'
    );

    expect(withInstruction).toBe(withoutInstruction);
  });

  it('keeps unrelated query parameters significant', () => {
    const firstPage = generatePageCacheKey(
      'petsies_store',
      'https://example.com/alerts/recover/cart/id/1/code/2?step=1&applyPromoCode=true'
    );
    const secondPage = generatePageCacheKey(
      'petsies_store',
      'https://example.com/alerts/recover/cart/id/1/code/2?step=2&applyPromoCode=false'
    );

    expect(firstPage).not.toBe(secondPage);
  });
});
