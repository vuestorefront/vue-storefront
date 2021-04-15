# Vue Storefront CLI
## Commands
### Init new project
```
yarn cli init
yarn cli init <projectName>
```

## Create new commands
To create a new command you have to create Typescript file in `src/commands` e.g. `src/commands/my-command.ts`. Then inside you should export the default function that takes one argument - an array of strings. Check `src/commands/init.ts` if you need a working example. Signature:
```ts
(args: string[]): void
```

`args` is an array of arguments that begins from the first argument after the command. E.g. for `yarn cli my-command a b c` it would be `['a', 'b', 'c']`.   
`src/index.ts` always tries to call exported function from `src/commands/<used_command>.ts`.

## Module installed globally via yarn does not work
If you have used `yarn global add @vue-storefront/cli@next` and everything went well. Then while using `vsf` command you are getting `Command 'vsf' not found, did you mean:` - below I will show you solution for this problem.

It means you do not have path to yarn global binaries in your `$PATH` system variable. You can check that with this command:
```sh
echo $PATH | grep $(yarn global bin);
```

If there is no output - it means that you have to add output of `yarn global bin` command to your `$PATH` variable.

If you want to make it work only in current terminal session - use:
```sh
export PATH="$(yarn global bin):$PATH";
```

If you want to make it work permanently, you have to add it to your `~/.profile` or `~/.bashrc` file. More information click [here](https://stackoverflow.com/questions/14637979/how-to-permanently-set-path-on-linux-unix)

## How to generate and publish your template of integration?

If you want to generate a template of your integration for VSF Next, you need to follow those steps:
1. Install VSF cli globally (`yarn global add @vue-storefront/cli`) or use npx (`npx @vue-storefront/cli <command>`).
2. In your terminal open the folder with your integration theme(e.g [commercetools](https://github.com/vuestorefront/vue-storefront/tree/next/packages/commercetools/theme)).
3. Install `@vue-storefront/nuxt-theme/` as a dev dependency.   
4. Execute command `vsf generate-template <your-template-name> <path-to-your-theme-folder>` (e.g.: `vsf generate-template commercetools`) - last argument(`<path-to-your-theme-folder>`) by default points to current directory.
5. The script should generate a folder with the name which you provide in the previous step and contain your template integration files.
6. Create a new Github repository for your generated template.
7. Push your generated files into this repository.



   
