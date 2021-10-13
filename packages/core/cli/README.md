@vue-storefront/cli
===================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@vue-storefront/cli.svg)](https://npmjs.org/package/@vue-storefront/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@vue-storefront/cli.svg)](https://npmjs.org/package/@vue-storefront/cli)
[![License](https://img.shields.io/npm/l/@vue-storefront/cli.svg)](https://github.com/vuestorefront/vue-storefront/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @vue-storefront/cli
$ init COMMAND
running command...
$ init (-v|--version|version)
@vue-storefront/cli/2.4.1 darwin-x64 node-v14.17.3
$ init --help [COMMAND]
USAGE
  $ init COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`init hello [FILE]`](#init-hello-file)
* [`init help [COMMAND]`](#init-help-command)

## `init hello [FILE]`

describe the command here

```
USAGE
  $ init hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ init hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/vuestorefront/vue-storefront/blob/v2.4.1/src/commands/hello.ts)_

## `init help [COMMAND]`

display help for init

```
USAGE
  $ init help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
