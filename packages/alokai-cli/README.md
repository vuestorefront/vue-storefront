Alokai CLI

## Usage 

### Adding new packages

To add a new package to the Alokai CLI, you can run the following command:

```bash
pnpm add alokai-[your-package-name]
```

In order to use the package, you need to import it in the `index.ts` file:

```typescript
import alokaiCli[YourPackageName] from 'alokai-[your-package-name]';
```

Then, you can use the package in the `index.ts` file:

```typescript
alokaiCli[YourPackageName].forEach((command) => {
    program.addCommand(command);
  });
```

This will add the command to the core CLI application and will be available to use once the project is published.

### Creating a new package

To create a new package, you can use [Alokai CLI Starter](https://github.com/vuestorefront/alokai-cli-starter) to generate a new package template.

### Publishing a package

To publish a package, you can run the following command:

```bash
pnpm pub:release
```

This will publish the package to the NPM registry and make it available for use in other projects.
