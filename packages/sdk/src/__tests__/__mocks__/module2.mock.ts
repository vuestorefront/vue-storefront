/* eslint-disable */
const module2 = {
  connector: {
    m2_method1: (names: string[]): string => {
      return names.join(',');
    },
  },
  utils: {
    helpers: {
      formatCurrency(price: string, currency: string) {
        return `${currency} ${price}`;
      },
    },
  },
  extend: {},
};

export default function (options: any) {
  return module2;
}

export const stringDecoratorInterceptor = (result: string): string => {
  return `((((${result}))))`;
};

export type Module2 = typeof module2;
