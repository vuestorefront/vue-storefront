# Installation

## Prerequisites

Before proceeding, make sure you have [Node 10+](https://nodejs.org/en/) and [Yarn 1](https://classic.yarnpkg.com/lang/en/) installed.

## Using Vue Storefront CLI

The easiest way to get started with Vue Storefront is to set up your project using our CLI. You can run it using the `npx` command:

```bash
# Run Vue Storefront CLI
npx @vue-storefront/cli init
```
Enter the name of the project and select the backend platform you wish to use.

Once selected, the CLI creates the project files in the directory matching your project name. The only thing left is to go to this directory in the terminal and install the dependencies:

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

## Recommended tools

### Vue.js Devtools

We strongly recommend installing [Vue.js Devtools](https://github.com/vuejs/vue-devtools#installation) in your browser. It's an excellent tool for viewing component structure and their current state, inspecting events and routes, and much more.

<center>
    <img src="../images/general/vue-js-devtools-install.gif" alt="Process of installing Vue.js Devtools plugin in Chrome browser"/>
</center>

*(Vue.js Devtools installation in Chrome browser)*

<center>
    <img src="../images/general/vue-js-devtools.gif" alt="Usage of Vue.js Devtools with Vue Storefront application"/>
</center>

*(Vue.js Devtools usage example)*

### Vetur for VS Code
For those using Visual Studio Code as their main code editor, we also recommend using [Vetur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur).
It speeds up the development of Vue.js-based applications by providing, amongst many others, features like Vue.js code autocompletion and syntax highlighting.

To install Vetur extension:
1. Open VS Code
2. Open `Extensions`
3. Search for `Vetur`
4. Click `Install`

<center>
    <img src="../images/general/vs-code-vetur-install.gif" alt="Process of installing of Vetur plugin in Visual Studio Code" />
</center>

*(Vetur installation in Visual Studio Code marketplace)*

<center>
    <img src="../images/general/vs-code-vetur.gif" alt="Example of autocompletion provided by Vetur" />
</center>

*(Example of code autocompletion provided by Vetur)*

## What's next?

- Learn about [key concepts in Vue Storefront](./key-concepts.html) to confidently work with your newly created Vue Storefront project.
- Check out the platform-specific docs in the `eCommerce platforms` category to learn more about your integration.
