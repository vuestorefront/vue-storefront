# Alokai CLI

## Usage

To create a new Alokai project, use the following command:

```bash
npx @vue-storefront/cli generate store
```

To generate a new template project from the integration source code, use the following command:

```bash
npx @vue-storefront/cli generate template
```

## Commands

<!-- commands -->
* [`@vue-storefront/cli generate store`](#vue-storefrontcli-generate-store)
* [`@vue-storefront/cli generate template`](#vue-storefrontcli-generate-template)
* [`@vue-storefront/cli help [COMMAND]`](#vue-storefrontcli-help-command)
* [`@vue-storefront/cli init`](#vue-storefrontcli-init)
* [`@vue-storefront/cli plugins`](#vue-storefrontcli-plugins)
* [`@vue-storefront/cli plugins:install PLUGIN...`](#vue-storefrontcli-pluginsinstall-plugin)
* [`@vue-storefront/cli plugins:inspect PLUGIN...`](#vue-storefrontcli-pluginsinspect-plugin)
* [`@vue-storefront/cli plugins:install PLUGIN...`](#vue-storefrontcli-pluginsinstall-plugin-1)
* [`@vue-storefront/cli plugins:link PLUGIN`](#vue-storefrontcli-pluginslink-plugin)
* [`@vue-storefront/cli plugins:uninstall PLUGIN...`](#vue-storefrontcli-pluginsuninstall-plugin)
* [`@vue-storefront/cli plugins:uninstall PLUGIN...`](#vue-storefrontcli-pluginsuninstall-plugin-1)
* [`@vue-storefront/cli plugins:uninstall PLUGIN...`](#vue-storefrontcli-pluginsuninstall-plugin-2)
* [`@vue-storefront/cli plugins update`](#vue-storefrontcli-plugins-update)
* [`@vue-storefront/cli update [CHANNEL]`](#vue-storefrontcli-update-channel)

## `@vue-storefront/cli generate store`

```
USAGE
  $ @vue-storefront/cli generate store

EXAMPLES
  $ @vue-storefront/cli generate store
```

## `@vue-storefront/cli generate template`

```
USAGE
  $ @vue-storefront/cli generate template [--output <value>]

FLAGS
  --output=<value>  [default: .]

EXAMPLES
  $ @vue-storefront/cli generate template
```

## `@vue-storefront/cli help [COMMAND]`

Display help for @vue-storefront/cli.

```
USAGE
  $ @vue-storefront/cli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for @vue-storefront/cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.16/src/commands/help.ts)_

## `@vue-storefront/cli init`

```
USAGE
  $ @vue-storefront/cli init

EXAMPLES
  $ @vue-storefront/cli init
```

_See code: [dist/commands/init.ts](https://github.com/vuestorefront/vue-storefront/blob/v3.0.0/dist/commands/init.ts)_

## `@vue-storefront/cli plugins`

List installed plugins.

```
USAGE
  $ @vue-storefront/cli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ @vue-storefront/cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.5/src/commands/plugins/index.ts)_

## `@vue-storefront/cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ @vue-storefront/cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ @vue-storefront/cli plugins add

EXAMPLES
  $ @vue-storefront/cli plugins:install myplugin 

  $ @vue-storefront/cli plugins:install https://github.com/someuser/someplugin

  $ @vue-storefront/cli plugins:install someuser/someplugin
```

## `@vue-storefront/cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ @vue-storefront/cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ @vue-storefront/cli plugins:inspect myplugin
```

## `@vue-storefront/cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ @vue-storefront/cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ @vue-storefront/cli plugins add

EXAMPLES
  $ @vue-storefront/cli plugins:install myplugin 

  $ @vue-storefront/cli plugins:install https://github.com/someuser/someplugin

  $ @vue-storefront/cli plugins:install someuser/someplugin
```

## `@vue-storefront/cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ @vue-storefront/cli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ @vue-storefront/cli plugins:link myplugin
```

## `@vue-storefront/cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ @vue-storefront/cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ @vue-storefront/cli plugins unlink
  $ @vue-storefront/cli plugins remove
```

## `@vue-storefront/cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ @vue-storefront/cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ @vue-storefront/cli plugins unlink
  $ @vue-storefront/cli plugins remove
```

## `@vue-storefront/cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ @vue-storefront/cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ @vue-storefront/cli plugins unlink
  $ @vue-storefront/cli plugins remove
```

## `@vue-storefront/cli plugins update`

Update installed plugins.

```
USAGE
  $ @vue-storefront/cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `@vue-storefront/cli update [CHANNEL]`

update the @vue-storefront/cli CLI

```
USAGE
  $ @vue-storefront/cli update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
  --force                Force a re-download of the requested version.

DESCRIPTION
  update the @vue-storefront/cli CLI

EXAMPLES
  Update to the stable channel:

    $ @vue-storefront/cli update stable

  Update to a specific version:

    $ @vue-storefront/cli update --version 1.0.0

  Interactively select version:

    $ @vue-storefront/cli update --interactive

  See available versions:

    $ @vue-storefront/cli update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.0.4/src/commands/update.ts)_
<!-- commandsstop -->
