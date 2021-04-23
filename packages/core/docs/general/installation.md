# Installation

## Using Vue Storefront CLI

If you want to get started with Vue Storefront, the easiest way is to set up your project using our CLI. You can install it globally using `yarn` or `npm`:

<code-group>
<code-block title="YARN">
```bash
# Install Vue Storefront CLI
yarn global add @vue-storefront/cli
```
</code-block>

<code-block title="NPM">
```bash
# Install Vue Storefront CLI
npm i -g @vue-storefront/cli
```
</code-block>
</code-group>

Once installed, you can set up a project using `vsf init` command:

```bash
# Create a new Vue Storefront project
vsf init <project_name>
```

The next step is to select the backend platform you wish to use.

<center>
  <img src="../images/cli.png" alt="vue storefront cli" />
</center>

Once selected, the CLI creates the project files in the `<project_name>` directory. The only thing left is to go to this directory in the terminal and install the dependencies:

```bash
# Go to project folder
cd <project_name>

# Install required dependencies
yarn install
```

Now the project is ready. To start the application in development mode, use the `yarn dev` command:

```bash
# Start the project in development mode
yarn dev
```

You can read more about available commands and environments on [commands](https://nuxtjs.org/docs/2.x/get-started/commands/) page in Nuxt.js documentation.

## What's next?

- Learn about [key concepts in Vue Storefront](./key-concepts.html) to confidently work with your newly created Vue Storefront project.
- Check out the platform-specific docs in the `eCommerce platforms` category to learn more about your integration.
