import useWishlist from '../../../src/composables/useWishlist';
import * as aycClient from '@vue-storefront/about-you-api';

jest.mock('@vue-storefront/about-you-api');
const mockedAycClient = aycClient as jest.Mocked<
  typeof aycClient
>;

jest.mock('../../../src/factories/useWishlistFactory', () => ({
  useWishlistFactory: (params) => () => params
}));

describe('[about-you-composables] useWishlist', () => {
  it('returns wishlist promise on refreshWishlist', async () => {
    mockedAycClient.getWishlist.mockResolvedValueOnce(Promise.resolve({key: 'iha', items: []}));
    const { loadWishlist } = useWishlist() as any;
    const wishlistResponse = await loadWishlist();
    expect(wishlistResponse).toEqual({key: 'iha', items: []});
  });

  it('adds product to wishlist', async () => {
    const mockedWishlistProduct = { product: { id: '1' } } as any;
    mockedAycClient.addItemToWishlist.mockResolvedValueOnce({
      type: 'success',
      wishlist: {
        key: '1ca',
        items: [{ key: '1ca1', product: mockedWishlistProduct }]
      }
    });
    const { addToWishlist } = useWishlist();
    const addToWishlistResponse = await addToWishlist(mockedWishlistProduct, 1);
    expect(addToWishlistResponse).toEqual({
      key: '1ca',
      items: [{ key: '1ca1', product: mockedWishlistProduct }]
    });
  });

  it('rejects adding product to wishlist', async () => {
    expect.assertions(1);
    const mockedWishlistProduct = { product: { id: '1' } } as any;
    mockedAycClient.addItemToWishlist.mockResolvedValueOnce({
      type: 'failure',
      wishlist: null
    });
    const { addToWishlist } = useWishlist();
    await addToWishlist(
      mockedWishlistProduct,
      1
    ).catch(e => {
      expect(e).toBe(undefined);
    });
  });

  it('removes product from wishlist', async () => {
    const mockedWishlist = { key: '1dc', items: [] };

    mockedAycClient.deleteItemFromWishlist.mockResolvedValueOnce(
      Promise.resolve(mockedWishlist)
    );

    const { removeFromWishlist, wishlist } = useWishlist();
    (wishlist.value.key as any) = mockedWishlist.key;

    const removeFromWishlistResponse = await removeFromWishlist({key: '1', product: ({} as any)});
    expect(removeFromWishlistResponse).toEqual(mockedWishlist);
  });
});
