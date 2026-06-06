import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';

import { actions } from '../../store/actions';
import { REPORT_TRAFFIC_ATTRIBUTION, SYNCHRONIZE } from '../../types/actions';
import { GET_FIRST_TOUCH, GET_LAST_TOUCH } from '../../types/getters';
import {
  MARK_FIRST_TOUCH_SENT,
  MARK_LAST_TOUCH_SENT,
  SET_FIRST_TOUCH,
  SET_LAST_TOUCH,
  CLEAR_FIRST_TOUCH,
  CLEAR_LAST_TOUCH
} from '../../types/mutations';
import { TouchData, TrafficAttributionData } from '../../types/traffic-attribution.interface';
import { FIRST_TOUCH, LAST_TOUCH } from '../../types/local-storage-key';

jest.mock('config', () => ({
  budsies: {
    endpoint: 'https://api.example.com/api/ext/budsies'
  },
  trafficAttribution: {
    firstTouchExpirationDays: 90,
    lastTouchExpirationDays: 30,
    acquisitionClickIdKeys: ['gclid'],
    ignoredReferrerHosts: []
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

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn()
  }
}));

jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    error: jest.fn(() => jest.fn())
  }
}));

function setReferrer (referrer: string) {
  Object.defineProperty(document, 'referrer', {
    configurable: true,
    value: referrer
  });
}

function createAttribution (queryParams: Record<string, string> = {}): TrafficAttributionData {
  return {
    landing_page_url: 'http://localhost/landing',
    query_params: queryParams,
    detected_at: '2026-06-06T00:00:00.000Z'
  };
}

function createTouch (attribution: TrafficAttributionData, isSent = false): TouchData {
  return {
    attribution,
    isSent,
    createdAt: Date.now(),
    expiresAt: Date.now() + 100000
  };
}

function createDeferredTask () {
  let resolve: (value: { resultCode: number }) => void = jest.fn();

  const promise = new Promise<{ resultCode: number }>((promiseResolve) => {
    resolve = promiseResolve;
  });

  return { promise, resolve };
}

function createContext (firstTouch: TouchData | null, lastTouch: TouchData | null) {
  const commits: { type: string, payload?: any }[] = [];
  const getters: Record<string, TouchData | null> = {
    [GET_FIRST_TOUCH]: firstTouch,
    [GET_LAST_TOUCH]: lastTouch
  };

  return {
    context: {
      commit: jest.fn((type: string, payload?: any) => {
        commits.push({ type, payload });
        if (type === SET_FIRST_TOUCH) {
          getters[GET_FIRST_TOUCH] = payload;
        }
        if (type === SET_LAST_TOUCH) {
          getters[GET_LAST_TOUCH] = payload;
        }
        if (type === CLEAR_FIRST_TOUCH) {
          getters[GET_FIRST_TOUCH] = null;
        }
        if (type === CLEAR_LAST_TOUCH) {
          getters[GET_LAST_TOUCH] = null;
        }
      }),
      getters
    } as any,
    commits,
    getters
  };
}

describe('traffic attribution actions', () => {
  beforeEach(() => {
    (processURLAddress as jest.Mock).mockClear();
    (TaskQueue.execute as jest.Mock).mockReset();
    (StorageManager.get as jest.Mock).mockReturnValue({
      getItem: jest.fn().mockResolvedValue(null)
    });
    window.history.pushState({}, '', '/landing');
    setReferrer('');
    jest.spyOn(Date, 'now').mockReturnValue(1000);
  });

  afterEach(() => {
    (Date.now as any).mockRestore();
  });

  it('initializes first and last touch from the same raw payload when no first touch exists', async () => {
    window.history.pushState({}, '', '/landing?utm_source=google');
    const { context, commits } = createContext(null, null);

    await (actions as any)[SYNCHRONIZE](context, {
      currentRoute: {
        query: { utm_source: 'google' }
      }
    });

    expect(commits.map((commit) => commit.type)).toEqual([SET_FIRST_TOUCH, SET_LAST_TOUCH]);
    expect(commits[0].payload.attribution).toEqual(commits[1].payload.attribution);
    expect(commits[0].payload.isSent).toBe(false);
    expect(commits[0].payload.createdAt).toBe(1000);
  });

  it('preserves an existing first touch and skips direct last-touch updates', async () => {
    const firstTouch = createTouch(createAttribution({ utm_source: 'first' }));
    const lastTouch = createTouch(createAttribution({ utm_source: 'last' }));
    const { context, commits } = createContext(firstTouch, lastTouch);

    await (actions as any)[SYNCHRONIZE](context, {
      currentRoute: {
        query: {}
      }
    });

    expect(commits).toEqual([]);
  });

  it('updates last touch when existing first touch receives a different acquisition landing', async () => {
    const firstTouch = createTouch(createAttribution({ utm_source: 'first' }));
    const lastTouch = createTouch(createAttribution({ utm_source: 'old' }));
    const { context, commits } = createContext(firstTouch, lastTouch);

    await (actions as any)[SYNCHRONIZE](context, {
      currentRoute: {
        query: { gclid: 'new-click' }
      }
    });

    expect(commits).toHaveLength(1);
    expect(commits[0].type).toBe(SET_LAST_TOUCH);
    expect(commits[0].payload.attribution.query_params).toEqual({ gclid: 'new-click' });
  });

  it('loads unexpired stored touches during synchronization', async () => {
    const firstTouch = createTouch(createAttribution({ utm_source: 'stored-first' }));
    const lastTouch = createTouch(createAttribution({ gclid: 'stored-last' }));
    const getItem = jest.fn((key: string) => Promise.resolve(
      key === FIRST_TOUCH ? firstTouch : lastTouch
    ));
    (StorageManager.get as jest.Mock).mockReturnValue({ getItem });
    const { context, commits } = createContext(null, null);

    await (actions as any)[SYNCHRONIZE](context, {
      currentRoute: {
        query: {}
      }
    });

    expect(getItem).toHaveBeenCalledWith(FIRST_TOUCH);
    expect(getItem).toHaveBeenCalledWith(LAST_TOUCH);
    expect(commits).toEqual([
      { type: SET_FIRST_TOUCH, payload: firstTouch },
      { type: SET_LAST_TOUCH, payload: lastTouch }
    ]);
  });

  it('clears expired stored touches during synchronization', async () => {
    const expiredFirstTouch = {
      ...createTouch(createAttribution({ utm_source: 'expired-first' })),
      expiresAt: 1000
    };
    const expiredLastTouch = {
      ...createTouch(createAttribution({ gclid: 'expired-last' })),
      expiresAt: 1000
    };
    (StorageManager.get as jest.Mock).mockReturnValue({
      getItem: jest.fn((key: string) => Promise.resolve(
        key === FIRST_TOUCH ? expiredFirstTouch : expiredLastTouch
      ))
    });
    jest.spyOn(Date, 'now').mockReturnValue(2000);
    const { context, commits } = createContext(null, null);

    await (actions as any)[SYNCHRONIZE](context, {
      currentRoute: {
        query: {}
      }
    });

    expect(commits[0]).toEqual({ type: CLEAR_FIRST_TOUCH, payload: undefined });
    expect(commits[1]).toEqual({ type: CLEAR_LAST_TOUCH, payload: undefined });
  });

  it('reuses the in-flight report execution for duplicate report dispatches', async () => {
    const firstTouch = createTouch(createAttribution({ utm_source: 'first' }));
    const { context } = createContext(firstTouch, null);
    const deferredTask = createDeferredTask();
    (TaskQueue.execute as jest.Mock).mockReturnValue(deferredTask.promise);

    const firstReport = (actions as any)[REPORT_TRAFFIC_ATTRIBUTION](context);
    const secondReport = (actions as any)[REPORT_TRAFFIC_ATTRIBUTION](context);

    expect(TaskQueue.execute as jest.Mock).toHaveBeenCalledTimes(1);

    deferredTask.resolve({ resultCode: 200 });
    await Promise.all([firstReport, secondReport]);

    expect(context.commit).toHaveBeenCalledTimes(1);
    expect(context.commit).toHaveBeenCalledWith(MARK_FIRST_TOUCH_SENT);
  });

  it('reports first then different last touch and marks sent only after success', async () => {
    const firstTouch = createTouch(createAttribution({ utm_source: 'first' }));
    const lastTouch = createTouch(createAttribution({ gclid: 'last' }));
    const { context } = createContext(firstTouch, lastTouch);
    (TaskQueue.execute as jest.Mock).mockResolvedValue({ resultCode: 200 });

    await (actions as any)[REPORT_TRAFFIC_ATTRIBUTION](context);

    expect(TaskQueue.execute as jest.Mock).toHaveBeenCalledTimes(2);
    expect(JSON.parse((TaskQueue.execute as jest.Mock).mock.calls[0][0].payload.body)).toEqual({ request: firstTouch.attribution });
    expect(JSON.parse((TaskQueue.execute as jest.Mock).mock.calls[1][0].payload.body)).toEqual({ request: lastTouch.attribution });
    expect(context.commit).toHaveBeenCalledWith(MARK_FIRST_TOUCH_SENT);
    expect(context.commit).toHaveBeenCalledWith(MARK_LAST_TOUCH_SENT);
  });

  it('suppresses duplicate last-touch reporting when raw payloads match', async () => {
    const firstTouch = createTouch(createAttribution({ gclid: 'same' }));
    const lastTouch = createTouch({
      detected_at: firstTouch.attribution.detected_at,
      query_params: { gclid: 'same' },
      landing_page_url: firstTouch.attribution.landing_page_url
    });
    const { context } = createContext(firstTouch, lastTouch);
    (TaskQueue.execute as jest.Mock).mockResolvedValue({ resultCode: 200 });

    await (actions as any)[REPORT_TRAFFIC_ATTRIBUTION](context);

    expect(TaskQueue.execute as jest.Mock).toHaveBeenCalledTimes(1);
    expect(context.commit).toHaveBeenCalledWith(MARK_FIRST_TOUCH_SENT);
    expect(context.commit).not.toHaveBeenCalledWith(MARK_LAST_TOUCH_SENT);
  });
});
