# Configuration

Whenever starting a new project or jumping into an existing one, you should look into the configuration files first. They control almost every aspect of the application, including installed integrations.

## Mandatory configuration files

Every Vue Storefront project must contain two configuration files described below. They control both client and server parts of the application.

### `nuxt.config.js`

**The `nuxt.config.js` file is the starting point of every project.** It contains general configuration, including routes, global middlewares, internationalization, or build information. This file also registers modules and plugins to add or extend framework features. Because almost every Vue Storefront integration has a module or plugin, you can identify which integrations are used by looking at this file.

You can learn more about this file and available configuration options on the [Nuxt configuration file](https://nuxtjs.org/docs/directory-structure/nuxt-config/) page.

### `middleware.config.js`

The `middleware.config.js` file is as essential as `nuxt.config.js`, but much simpler and likely smaller. It configures the Server Middleware used for communication with e-commerce platforms and contains sensitive credentials, custom endpoints, queries, etc.

## Optional configuration files

Depending on the integrations used, your project might include some additional configuration files not described above. Let's walk through the most common ones.

- [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) configures compiler used to strongly type the project using TypeScript language. It defines a list of files and directories to be included and excluded from analysis and compiling.

- [`.babelrc`](https://babeljs.io/docs/en/config-files) configures Babel compiler used to make the code backward compatible with older browsers and environments.

- [`jest.config.js`](https://jestjs.io/docs/configuration) configures Jest testing framework, used for writing and running unit tests.

- [`.eslintrc.js`](https://eslint.org/docs/user-guide/configuring/) configures ESLint static code analyzer. It enforces code style by identifying and reporting patterns that make code inconsistent or prone to bugs.

- [`.lintstagedrc`](https://github.com/okonet/lint-staged#configuration) configures lint runner that enforces code style before every Git commit. By default, it runs ESLint described above.

## What's next

As the next step, we will learn about [Layouts and Routing](./layouts-and-routing.html) and show what routes come predefined in every Vue Storefront project and how to register custom ones.
