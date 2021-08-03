# Using the integration boilerplate
To start your integration, you can use our [integration boilerplate](https://github.com/vuestorefront/ecommerce-integration-boilerplate) as a starting point.

It's quite simple and easy to work with the boilerplate. Almost everything is automatically configured, or you can configure it 
via terminal commands.

So let's begin.

## Cloning and renaming

First of all you will need to clone the [integration boilerplate](https://github.com/vuestorefront/ecommerce-integration-boilerplate) into a folder on your machine, or using the template to create a new repository in GitHub.

It's simple as:

```sh
git clone https://github.com/vuestorefront/ecommerce-integration-boilerplate.git
```

Or clicking the `Use this template` button on GitHub

After that, you will need to rename the integrations file to the corresponding name of your integration. 
There are two ways of doing this:
1. You can use this terminal command to rename it automatically. By changing the `{YOUR INTEGRATION NAME}`  to the name of the integration you are developing. The name must be in lowercase and without any special characters.

```sh
grep -rl '<% INTEGRATION %>' ./ | xargs sed -i '' 's/<% INTEGRATION %>/{YOUR INTEGRATION NAME}/g'
```

2. You can do a `Search All & Replace` on  your Editor or IDE, for the string `<% INTEGRATION %>` and change it to the name of the integration you are developing. The name must be in lowercase and without any special characters.

::: tip Test with the default theme
The default theme is working out of the box with mocked data from boilerplate so it's a perfect test environment for your integration. Be sure to test it every time you make some changes
:::

## First run

After renaming your boilerplate, you will need to prepare your integration for the first run.

1. Run the `yarn` command on the root folder to install all the dependencies.
2. To develop your integration with **HMR** you will need to execute in two different terminals, these commands (Make sure the first one is ready to execute the second):
    - `yarn dev:api-client`
    - `yarn dev:composables`
3. Execute the `yarn dev:theme` to start the nuxt process on another terminal.

If you just want to develop the theme, you can execute the following commands:
- `yarn buil:api-client`
- `yarn buil:composables`
