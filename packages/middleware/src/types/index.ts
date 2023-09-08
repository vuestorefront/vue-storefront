export type TODO = any;

/* Global Records */
export type ObjectRecord<O> = { [K in keyof O]: O[K] };
export type ObjectItemRecord<V = string, K = string> = {
  [keyof in K as string]: V;
};
export type PartialRecord<O> = { [K in keyof O]?: O[K] };
export type NullableRecord<V> = V | null;

export type GetConstructorArgs<T> = T extends new (...args: infer U) => any
  ? U
  : never;

export type RecordOverloadedReturnType<T> = T extends {
  (...args: any[]): infer R;
  (...args: any[]): infer R;
  (...args: any[]): infer R;
  (...args: any[]): infer R;
}
  ? R
  : T extends {
      (...args: any[]): infer R;
      (...args: any[]): infer R;
      (...args: any[]): infer R;
    }
  ? R
  : T extends { (...args: any[]): infer R; (...args: any[]): infer R }
  ? R
  : T extends (...args: any[]) => infer R
  ? R
  : any;

export type AnyFunction = (...args: any) => any;

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export * from "./base";
export * from "./common";
export * from "./server";
export * from "./config";
