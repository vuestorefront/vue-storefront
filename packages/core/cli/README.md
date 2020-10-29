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