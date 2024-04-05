# Alokai CLI Starter Project

This is a starter project for creating a new CLI command using the Alokai CLI framework.

## Getting Started

To get started, you can clone this repository and then install the dependencies.

```bash
git clone
cd alokai-cli-starter
pnpm install
```

## Creating a New Command

To create a new command, you can create a new file inside the `src/commands` directory. The file should export a constant that is an instance of the `Command`.

```typescript
import { Command } from "commander";

export const command = new Command()
  .name("Alokai CLI New Command Template")
  .description("Alokai CLI New Command Template is a template for creating new commands for the Alokai CLI")
  .version("0.0.1", "-v, --version", "display the version number")
  .action(() => {
    console.log("Hello, world!");
  })
```

## Building the Project

To build the project, you can run the following command:

```bash
pnpm build
```

## Running the Project

To run the project, you can run the following command:

```bash
pnpm start
```

In development mode, you can run the following command:

```bash
pnpm start:dev
```

## Testing the Project

To test the project, you need to link it with the `vue-storefront/packages/alokai-cli` package. For this, I'm using [yalc](https://github.com/wclr/yalc) - a local NPM registry for your Yarn and pnpm projects.

First, you need to install `yalc` globally:

```bash
pnpm add -g yalc
```

Then, you need to publish the package to the local registry:

```bash
pnpm build
yalc publish # this will publish alokai-[your-package-name] to the local registry
```

After that, you can link the package to the `vue-storefront/packages/alokai-cli` package:

```bash
cd vue-storefront/packages/alokai-cli
yalc add alokai-[your-package-name]
```

Finally, you can run the command:
  
```bash
  # in the vue-storefront/packages/alokai-cli directory

  ./dist/index.js [your-command-name]
```


