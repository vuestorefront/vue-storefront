import { createFormatPrice } from './../../src/getters/_utils';

describe('[commercetools-getters] utils/createPrice', () => {

  it('calls IntL', () => {
    const formatMock = jest.fn();
    jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({ format: formatMock } as any));

    createFormatPrice(123456);

    expect(formatMock).toBeCalled();
  });

  it('returns null', () => {
    const formatMock = jest.fn();
    jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({ format: formatMock } as any));

    const price = createFormatPrice(null);

    expect(formatMock).not.toBeCalled();
    expect(price).toBe(null);
  });
});
