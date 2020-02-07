/* istanbul ignore file */

const getStorage = () => {
  // @ts-ignore
  if (typeof window !== 'undefined') {
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
    },
  }
}

export default getStorage
