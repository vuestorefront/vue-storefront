/* istanbul ignore file */

const getStorage = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return window.localStorage;
  }

  const storage = {};

  return {
    setItem: (key: string, value: any) => {
      storage[key] = value;
    },
    getItem: (key: string): any => {
      return storage[key];
    },
    removeItem: (key: string): any => {
      delete storage[key];
    }
  };
};

export default getStorage;
