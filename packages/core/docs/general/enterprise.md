# What is Vue Storefront Enterprise

> Vue Storefront Enterprise is currently available only for Commercetools

Vue Storefront Enterprise is a commercial offering from Vue Storefront core team built on top of the Open Source product. Our goal is to give you all the tools that you could need to launch your Vue Storefront shop and provide you with ready-to-use integrations that will reduce the development time and cost of your project.

## What are the differences between Open Source and Enterprise version?

In Enterprise Edition you're getting everything that is in Open Source plus:
- Vue Storefront Cloud 
- Additional integrations with third-party services.
- Extended integration with eCommerce platform with advanced features.

Everything with <Badge text="Enterprise" type="info" /> badge in the docs is only available in Vue Storefront Enterprise edition.

You can learn more about our commercial offering [here](https://www.vuestorefront.io/enterprise).

# How to use Vue Storefront Enterprise

Enterprise packages within `@vsf-enterprise` scope are part of our private registry.

To make use of it create a `.npmrc` file in the root of your project with the following content:

```
@vsf-enterprise:registry=https://registrynpm.storefrontcloud.io
```

Then log into your account with your Vue Storefront Enterprise credentials:

```bash
npm adduser --registry https://registrynpm.storefrontcloud.io
```

From there you will use Vue Storefront registry for all packages within `@vsf-enterprise`  scope. Other ones will be proxied to NPM.



