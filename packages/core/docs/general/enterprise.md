# What is Vue Storefront Enterprise

Vue Storefront Enterprise is a commercial offering from Vue Storefront core team built on top of the Open Source product. Our goal is to give you all the tools that you could need to launch your Vue Storefront shop and provide you with ready-to-use integrations that will drastically speed up your development process.

- Vue Storefront Cloud
- Integrations with third-parties
- Extended integration with Commercetools

You can learn more about our commercial offering [here](https://www.vuestorefront.io/cloud).

This document will walk you through the installation and usage of the latter part.

# How to use Vue Storefront Enterprise

Vue Storefront Enterprise packages are part of our private npm registry.

To make use of it create a `.npmrc` file in the root of your project with the following content:

```
@vsf-enterprise:registry=https://registrynpm.storefrontcloud.io
```

Then log into your account on Vue Storefront registry:
```bash
npm adduser --registry https://registrynpm.storefrontcloud.io
```

From there you will use Vue Storefront registry for all packages within `@vsf-enterprise`  scope. Other ones will be proxied to NPM.


