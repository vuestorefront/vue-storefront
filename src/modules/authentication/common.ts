import { Strategy } from 'passport';

export type GenerateStrategy = (config) => Strategy;

export class UnsupportedAuthenticationMethodError extends Error {
  public constructor (method: string) {
    super(`Unsupported authentication strategy: "${method}"`);
  }
}
