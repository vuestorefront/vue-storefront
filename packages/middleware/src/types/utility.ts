// Type helpers

export type OmitFirstArg<F> = F extends (arg1: any, ...args: infer A) => infer R
  ? (...args: A) => R
  : never;

export type RemoveContextFromAPI<APIType> = {
  [K in keyof APIType]: OmitFirstArg<APIType[K]>;
};
