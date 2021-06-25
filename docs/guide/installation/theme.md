# Installing theme

The easiest way to create your own theme is to create a copy from one of our official themes. First of all you need to install official theme.

## Install official theme

### Use vsf-cli

If you have already setup VSF and you just want to install the theme, then you can use [vsf-cli](https://www.npmjs.com/package/%40vue-storefront/cli). First install vsf-cli:

```sh
// You have to us 0.2.1 version of VSF CLI for VSF1
$ npm i -g @vue-storefront/cli@0.2.1
// or via yarn
$ yarn global add @vue-storefront/cli@0.2.1
```

Then run command in your project directory:
```sh
$ vsf init:theme
```

Select theme:
```sh
$ ? Select theme for Vue Storefront (Use arrow keys)
$ ❯ Capybara - based on Storefront UI 
    Default 
```

Select theme version:
```sh
$ ? Select theme version (Use arrow keys)
$ ❯ Stable version (recommended for production) 
    In development branch (could be unstable!) 
```

After that you should have theme in `src/themes/{themeName}`. Now what you need to do is [Create your theme](#create-your-theme).

### Manual installation

Each theme has its own Readme file on github repository. What you need to do is to follow installation steps described in Readme and then move to [Create your theme](#create-your-theme).

## Create your theme

After official theme installation, you need to copy it and place it in `src/themes/{themeName}`. Then you need to change its name in its `package.json` file, change the active theme in `config/local.json`:

```json
  "theme": "@vue-storefront/theme-myThemeName",
```

and run `yarn` to make [Lerna](https://github.com/lerna/lerna) linking (which we use for monorepos).

## Our official themes:
- [Capybara](https://github.com/vuestorefront/vsf-capybara)
- [Default](https://github.com/vuestorefront/vsf-default)
