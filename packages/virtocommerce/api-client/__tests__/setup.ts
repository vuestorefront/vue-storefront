import { setup } from '../src';

jest.mock('./../src/helpers/create-virtocommerce-link');
jest.mock('apollo-client');

setup({
  api: {} as any
});
