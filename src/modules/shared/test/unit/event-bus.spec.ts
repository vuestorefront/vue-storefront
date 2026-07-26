import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';

describe('EventBus compatibility', () => {
  beforeEach(() => {
    EventBus.$off();
    EventBus.$dataFilters = [];
  });

  afterEach(() => {
    EventBus.$off();
    EventBus.$dataFilters = [];
  });

  it('preserves listener order, argument forwarding, and chainable returns', () => {
    const calls: [string, string, number][] = [];
    const firstListener = (value: string, count: number) => {
      calls.push(['first', value, count]);
    };
    const secondListener = (value: string, count: number) => {
      calls.push(['second', value, count]);
    };

    expect(EventBus.$on('ordered-event', firstListener)).toBe(EventBus);
    expect(EventBus.$on('ordered-event', secondListener)).toBe(EventBus);
    expect(EventBus.$emit('ordered-event', 'payload', 2)).toBe(EventBus);

    expect(calls).toEqual([
      ['first', 'payload', 2],
      ['second', 'payload', 2]
    ]);
  });

  it('removes one listener without changing the remaining listeners', () => {
    const firstListener = jest.fn();
    const secondListener = jest.fn();
    EventBus.$on('specific-listener', firstListener);
    EventBus.$on('specific-listener', secondListener);

    expect(EventBus.$off('specific-listener', firstListener)).toBe(EventBus);
    EventBus.$emit('specific-listener', 'payload');

    expect(firstListener).not.toHaveBeenCalled();
    expect(secondListener).toHaveBeenCalledWith('payload');
  });

  it('removes all listeners for one event or the complete bus', () => {
    const firstEventListener = jest.fn();
    const secondEventListener = jest.fn();
    EventBus.$on('first-event', firstEventListener);
    EventBus.$on('second-event', secondEventListener);

    expect(EventBus.$off('first-event')).toBe(EventBus);
    EventBus.$emit('first-event');
    EventBus.$emit('second-event');

    expect(firstEventListener).not.toHaveBeenCalled();
    expect(secondEventListener).toHaveBeenCalledTimes(1);

    expect(EventBus.$off()).toBe(EventBus);
    EventBus.$emit('second-event');
    expect(secondEventListener).toHaveBeenCalledTimes(1);
  });

  it('runs a once listener once and removes it through its original callback', () => {
    const onceListener = jest.fn();
    expect(EventBus.$once('once-event', onceListener)).toBe(EventBus);

    EventBus.$emit('once-event', 'first');
    EventBus.$emit('once-event', 'second');
    expect(onceListener).toHaveBeenCalledTimes(1);
    expect(onceListener).toHaveBeenCalledWith('first');

    const removedOnceListener = jest.fn();
    EventBus.$once('removed-once-event', removedOnceListener);
    EventBus.$off('removed-once-event', removedOnceListener);
    EventBus.$emit('removed-once-event');
    expect(removedOnceListener).not.toHaveBeenCalled();
  });

  it('emits the ordinary event and passes a scalar to every filter', async () => {
    const ordinaryListener = jest.fn();
    const firstFilter = jest.fn((value: string) => Promise.resolve(`${value}:first`));
    const secondFilter = jest.fn((value: string) => `${value}:second`);
    EventBus.$on('scalar-filter', ordinaryListener);

    expect(EventBus.$filter('scalar-filter', firstFilter)).toBeUndefined();
    expect(EventBus.$filter('scalar-filter', secondFilter)).toBeUndefined();

    await expect(EventBus.$emitFilter('scalar-filter', 'value')).resolves.toEqual([
      'value:first',
      'value:second'
    ]);
    expect(ordinaryListener).toHaveBeenCalledWith('value');
    expect(firstFilter).toHaveBeenCalledWith('value');
    expect(secondFilter).toHaveBeenCalledWith('value');
  });

  it('passes multiple arguments as one array and preserves filter result order', async () => {
    const calls: string[] = [];
    const ordinaryListener = jest.fn();
    EventBus.$on('array-filter', ordinaryListener);
    EventBus.$filter('array-filter', async (values: [string, number]) => {
      await Promise.resolve();
      calls.push('first');
      return values[0];
    });
    EventBus.$filter('array-filter', async (values: [string, number]) => {
      calls.push('second');
      return values[1];
    });

    await expect(EventBus.$emitFilter('array-filter', 'value', 2)).resolves.toEqual([
      'value',
      2
    ]);
    expect(ordinaryListener).toHaveBeenCalledWith(['value', 2]);
    expect(calls).toEqual(['second', 'first']);
  });

  it('invokes all filters and rejects when one asynchronous filter rejects', async () => {
    const rejection = new Error('filter failed');
    const firstFilter = jest.fn(() => Promise.resolve('first'));
    const rejectingFilter = jest.fn(() => Promise.reject(rejection));
    const lastFilter = jest.fn(() => Promise.resolve('last'));
    EventBus.$filter('rejecting-filter', firstFilter);
    EventBus.$filter('rejecting-filter', rejectingFilter);
    EventBus.$filter('rejecting-filter', lastFilter);

    await expect(EventBus.$emitFilter('rejecting-filter', 'value')).rejects.toBe(rejection);
    expect(firstFilter).toHaveBeenCalledWith('value');
    expect(rejectingFilter).toHaveBeenCalledWith('value');
    expect(lastFilter).toHaveBeenCalledWith('value');
  });
});
