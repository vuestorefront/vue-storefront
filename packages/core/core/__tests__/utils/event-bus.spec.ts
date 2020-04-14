import { emit, on } from '../../src/utils/ssr/default/eventBus';

jest.mock('@vue/composition-api');

describe('[CORE - utils] event bus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles an event', () => {
    const testHandler1 = jest.fn();
    const testHandler2 = jest.fn();

    emit('some-event1', 'test-value1');
    on('some-event1', testHandler1);

    on('some-event2', testHandler2);
    emit('some-event2', 'test-value2');

    expect(testHandler1).toBeCalled();
    expect(testHandler2).toBeCalled();
  });

  it('does not call handler if it is not related', () => {
    const testHandler1 = jest.fn();
    const testHandler2 = jest.fn();
    emit('some-event', 'test-value1');
    on('some-event-x', testHandler1);

    on('some-event-x', testHandler2);
    emit('some-event', 'test-value2');

    expect(testHandler1).not.toBeCalled();
    expect(testHandler2).not.toBeCalled();
  });
});
