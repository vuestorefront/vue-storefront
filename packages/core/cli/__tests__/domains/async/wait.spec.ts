import { wait } from '../../../src/domains/async';
import { performance } from 'perf_hooks';

describe('wait | unit tests', () => {
  it('waits received amount of time', async () => {
    const before = performance.now();

    await wait(100);

    const after = performance.now();

    expect(after - before).toBeGreaterThanOrEqual(100);
  });
});
