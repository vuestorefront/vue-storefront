import { module } from '../../../store/index'

jest.mock('../../../store/actions', () => ({}));
jest.mock('../../../store/getters', () => ({}));
jest.mock('../../../store/mutations', () => ({}));

describe('Cart Module', () => {
  it('can be loaded', () => {
    expect(module).toBeTruthy()
  })
});