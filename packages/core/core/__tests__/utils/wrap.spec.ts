import { ref } from '@nuxtjs/composition-api';
import wrap from '../../src/utils/wrap';

describe('[CORE utils] wrap', () => {
  it('should return ref when passed ref', () => {
    const element = ref('test-value');
    const unwrappedValue = wrap(element);
    expect(unwrappedValue.value).toBe('test-value');
  });
  it('should return ref when passed value', () => {
    const element = 'test-value';
    const unwrappedValue = wrap(element);
    expect(unwrappedValue.value).toBe('test-value');
  });
});
