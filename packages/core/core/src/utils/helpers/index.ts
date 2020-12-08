export const markDeprecated = (message: string, newOne: Function, oldOne?: Function) => {
  if (typeof oldOne === 'function') {
    console.warn(message);
    return oldOne;
  }

  return newOne;
};
