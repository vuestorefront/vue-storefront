import passport from 'passport';
import { GenerateStrategy, UnsupportedAuthenticationMethodError } from './common';

export default (app, moduleConfig) => {
  import(`./strategies/${moduleConfig.authMethod}.strategy.ts`)
    .then((strategy: GenerateStrategy) => {
      passport.use(strategy(moduleConfig));
      app.use(passport.initialize());
    })
    .catch(() => {
      throw new UnsupportedAuthenticationMethodError(moduleConfig.authMethod);
    });
}
