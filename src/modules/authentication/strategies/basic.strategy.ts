import { Strategy } from 'passport';
import { BasicStrategy } from 'passport-http';

export default (config): Strategy => new BasicStrategy((user, password, done) => {
  // TODO: Credentials
});
