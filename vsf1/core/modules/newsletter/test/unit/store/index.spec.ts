import * as types from '@vue-storefront/core/modules/newsletter/store/mutation-types';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import { NewsletterService } from '@vue-storefront/core/data-resolver';
import { newsletterStore } from '@vue-storefront/core/modules/newsletter/store';

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn()
  }
}));

jest.mock('@vue-storefront/core/data-resolver', () => ({
  NewsletterService: {
    isSubscribed: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn()
  }
}));

describe('Newsletter actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('status', () => {
    it('should set e-mail and update newsletter status if it is subscribed', async () => {
      const isSubscribed = true;
      const email = 'example@domain.com';
      const mockContext = {
        commit: jest.fn()
      };

      (NewsletterService.isSubscribed as any).mockImplementation(() => (new Promise(resolve => resolve(isSubscribed))));

      const status = await (newsletterStore.actions as any).status(mockContext, email);

      expect(NewsletterService.isSubscribed).toHaveBeenCalledWith(email);
      expect(mockContext.commit).toHaveBeenCalledTimes(2);
      expect(mockContext.commit).toHaveBeenNthCalledWith(1, types.SET_EMAIL, email);
      expect(mockContext.commit).toHaveBeenNthCalledWith(2, types.NEWSLETTER_SUBSCRIBE);
      expect(status).toBe(isSubscribed);
    });

    it('should not set e-mail but only update newsletter status if it is not subscribed', async () => {
      const isSubscribed = false;
      const email = 'example@domain.com';
      const mockContext = {
        commit: jest.fn()
      };

      (NewsletterService.isSubscribed as any).mockImplementation(() => (new Promise(resolve => resolve(isSubscribed))));

      const status = await (newsletterStore.actions as any).status(mockContext, email);

      expect(NewsletterService.isSubscribed).toHaveBeenCalledWith(email);
      expect(mockContext.commit).toHaveBeenCalledTimes(1);
      expect(mockContext.commit).toHaveBeenNthCalledWith(1, types.NEWSLETTER_UNSUBSCRIBE);
      expect(status).toBe(isSubscribed);
    });
  });

  describe('subscribe', () => {
    it('should not subscribe if it is already subscribed', async () => {
      const mockContext = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: {
          isSubscribed: true
        }
      };

      await (newsletterStore.actions as any).subscribe(mockContext);

      expect(NewsletterService.subscribe).not.toHaveBeenCalled();
      expect(mockContext.commit).not.toHaveBeenCalled();
      expect(mockContext.dispatch).not.toHaveBeenCalled();
    });

    it('should subscribe if it is not subscribed', async () => {
      const email = 'example@domain.com';
      const mockContext = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: {
          isSubscribed: false
        }
      };

      (NewsletterService.subscribe as any).mockImplementation(() => (new Promise(resolve => resolve(true))));

      const status = await (newsletterStore.actions as any).subscribe(mockContext, email);

      expect(NewsletterService.subscribe).toHaveBeenCalledWith(email);
      expect(mockContext.commit).toHaveBeenCalledTimes(2);
      expect(mockContext.commit).toHaveBeenNthCalledWith(1, types.NEWSLETTER_SUBSCRIBE);
      expect(mockContext.commit).toHaveBeenNthCalledWith(2, types.SET_EMAIL, email);
      expect(mockContext.dispatch).toHaveBeenCalledWith('storeToCache', { email });
      expect(status).toBe(true);
    });
  });

  describe('unsubscribe', () => {
    it('should not unsubscribe if it is already unsubscribed', async () => {
      const mockContext = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: {
          isSubscribed: false
        }
      };

      await (newsletterStore.actions as any).unsubscribe(mockContext);

      expect(NewsletterService.unsubscribe).not.toHaveBeenCalled();
      expect(mockContext.commit).not.toHaveBeenCalled();
      expect(mockContext.dispatch).not.toHaveBeenCalled();
    });

    it('should unsubscribe if it is subscribed', async () => {
      const email = 'example@domain.com';
      const mockContext = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: {
          isSubscribed: true
        }
      };

      (NewsletterService.unsubscribe as any).mockImplementation(() => (new Promise(resolve => resolve(true))));

      const status = await (newsletterStore.actions as any).unsubscribe(mockContext, email);

      expect(NewsletterService.unsubscribe).toHaveBeenCalledWith(email);
      expect(mockContext.commit).toHaveBeenCalledWith(types.NEWSLETTER_UNSUBSCRIBE);
      expect(status).toBe(true);
    });
  });

  describe('storeToCache', () => {
    it('should store email in cache', () => {
      const email = 'example@domain.com';
      const mockSetItem = jest.fn(() => (new Promise(resolve => resolve(true))));

      (StorageManager.get as jest.Mock).mockImplementation(() => ({
        setItem: mockSetItem
      }));

      (newsletterStore.actions as any).storeToCache(null, { email });

      expect(StorageManager.get).toHaveBeenCalledWith('newsletter');
      expect(mockSetItem).toHaveBeenCalledWith('email', email);
    });
  });
});

describe('Newsletter mutations', () => {
  it('NEWSLETTER_SUBSCRIBE should set subscription state', () => {
    const mockState = { isSubscribed: false };
    const expectedState = { isSubscribed: true };

    (newsletterStore.mutations as any)[types.NEWSLETTER_SUBSCRIBE](mockState);

    expect(mockState).toEqual(expectedState);
  });

  it('NEWSLETTER_UNSUBSCRIBE should set unsubscription state', () => {
    const mockState = { isSubscribed: true };
    const expectedState = { isSubscribed: false };

    (newsletterStore.mutations as any)[types.NEWSLETTER_UNSUBSCRIBE](mockState);

    expect(mockState).toEqual(expectedState);
  });

  it('SET_EMAIL should set email address', () => {
    const email = 'example@domain.com';
    const mockState = { email: '' };
    const expectedState = { email };

    (newsletterStore.mutations as any)[types.SET_EMAIL](mockState, email);

    expect(mockState).toEqual(expectedState);
  });
});

describe('Newsletter getters', () => {
  it('should return subscription status', () => {
    const isSubscribed = (newsletterStore.getters as any).isSubscribed({ isSubscribed: true });
    const isNotSubscribed = (newsletterStore.getters as any).isSubscribed({ isSubscribed: false });

    expect(isSubscribed).toBe(true);
    expect(isNotSubscribed).toBe(false);
  });

  it('should return email address', () => {
    const email = 'example@domain.com';
    const expectedEmail = (newsletterStore.getters as any).email({ email });

    expect(expectedEmail).toBe(email);
  });
});
