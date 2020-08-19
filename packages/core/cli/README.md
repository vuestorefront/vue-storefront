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