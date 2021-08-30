# What is Vue Storefront Enterprise

> Vue Storefront Enterprise is currently available only for commercetools

Vue Storefront Enterprise is a commercial offering from the Vue Storefront core team built on top of the open-source product. Its goal is to give you all the tools you need to launch your shop and provide you with ready-to-use integrations that will reduce your project's development time and cost.

## Differences between Open Source and Enterprise versions

In Enterprise Edition you're getting everything that's in our open-source version. On top of that, we also provide:

- access to [Vue Storefront Cloud](https://www.vuestorefront.io/cloud);
- additional [integrations](./integrations/) with third-party services;
- extended integration with eCommerce platform with advanced features.

Everything with <Badge text="Enterprise" type="info" /> badge in the documentation is only available for our Enterprise customers.

You can learn more about our commercial offering on the [Enterprise](https://www.vuestorefront.io/enterprise) page.

## How to get access to Vue Storefront Enterprise

If you'd like to use Vue Storefront Enterprise in your project, please [contact our Sales team](https://www.vuestorefront.io/contact/sales).

## How to use Vue Storefront Enterprise

Enterprise packages within `@vsf-enterprise` scope are part of our private registry. To make use of them, create a `.npmrc` file in the root of your project with the following content:

```
@vsf-enterprise:registry=https://registrynpm.storefrontcloud.io
```

Then log into your account with your Vue Storefront Enterprise credentials:

```bash
npm adduser --registry https://registrynpm.storefrontcloud.io
```
