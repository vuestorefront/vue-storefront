/* eslint-disable */
type Method1 = (test: string) => { result: string };

export const extension2Mock = {
  beforeInterceptors: {
    m1_method1: [
      (...args: Parameters<Method1>): Parameters<Method1> => {
        console.log('>>> first before interceptor m1_method1');

        return args;
      },
    ],
  },
  interceptors: [
    {
      before: {
        m1_method1: [
          (result: ReturnType<Method1>): ReturnType<Method1> => {
            console.log('<<< first before interceptor m1_method1 ');

            return result;
          },
          (result: ReturnType<Method1>): ReturnType<Method1> => {
            console.log('<<< second before interceptor m1_method1 ');

            return result;
          },
        ],
      },
    },
  ],
  utils: {
    math: { test: () => false },
  },
  override: {
    m2_method1: (names: string[]): string => {
      return 'override'
    },
  },
  extend: {
    m1_method_extend: (name: string) => {
      return `Hello ${name}! I am so extended!`;
    },
  },
  subscribers: {
    '*_before': [
      (args: any) => {
        console.log('event "*_before" callback executed', args);
      },
    ],
    module1_m1_method1_before: (args: any) => {
      console.log('event "m1_method1_before" callback executed');
    },
  },
};
