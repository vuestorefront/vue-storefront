import { Strategy } from 'passport';
import { BasicStrategy } from 'passport-http';
import { GenerateStrategy } from '../common';

export const generateStrategy: GenerateStrategy = (config): Strategy => new BasicStrategy((user, password, done) => {
  // TODO: Credentials
});
