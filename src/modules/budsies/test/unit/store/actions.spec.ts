import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';

import { actions } from '../../../store/actions';

jest.mock('config', () => ({
  budsies: {
    endpoint: 'https://api.example.com/api/ext/budsies'
  }
}));

jest.mock('@vue-storefront/core/helpers', () => ({
  processURLAddress: jest.fn((url: string) => url)
}));

jest.mock('@vue-storefront/core/lib/sync', () => ({
  TaskQueue: {
    execute: jest.fn()
  }
}));

jest.mock('@vue-storefront/core/compatibility/plugins/event-bus', () => ({
  __esModule: true,
  default: {
    $emit: jest.fn(),
    $off: jest.fn(),
    $on: jest.fn(),
    $once: jest.fn()
  }
}));

describe('Budsies cart recovery actions', () => {
  beforeEach(() => {
    (processURLAddress as jest.Mock).mockClear();
    (TaskQueue.execute as jest.Mock).mockReset();
    (TaskQueue.execute as jest.Mock).mockResolvedValue({
      result: 'cart-token',
      resultCode: 200
    });
  });

  it('URL-encodes and forwards the optional promo-code instruction', async () => {
    await (actions as any).loadRecoverableCart({}, {
      recoveryId: 'recovery-id',
      recoveryCode: 'recovery-code',
      applyPromoCode: 'true&source=recovery link'
    });

    expect((TaskQueue.execute as jest.Mock).mock.calls[0][0].url).toBe(
      'https://api.example.com/api/ext/budsies/carts/recovery-requests?recoveryId=recovery-id&recoveryCode=recovery-code&token={{token}}&applyPromoCode=true%26source%3Drecovery%20link'
    );
  });

  it('preserves the existing request URL when the instruction is absent', async () => {
    await (actions as any).loadRecoverableCart({}, {
      recoveryId: 'recovery-id',
      recoveryCode: 'recovery-code'
    });

    expect((TaskQueue.execute as jest.Mock).mock.calls[0][0].url).toBe(
      'https://api.example.com/api/ext/budsies/carts/recovery-requests?recoveryId=recovery-id&recoveryCode=recovery-code&token={{token}}'
    );
  });
});
