/* eslint-disable */
const module1 = {
  connector: {
    m1_method1: () => ({ result: 'John Doe' }),
    m1_method2: (name: string) => `Hello ${name}`,
  },
  utils: {
    math: {
      nestedAdd: (a: number, b: number) => a + b,
    },
    add: (a: number, b: number) => a + b,
  },
  extend: {},
  beforeInterceptors: {},
  context: {}
};

export type Module1 = typeof module1;

export default jest.fn((options) => module1);
