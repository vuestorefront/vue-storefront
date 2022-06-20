# Vue Storefront Enterprise

Vue Storefront Enterprise is a commercial offering from the Vue Storefront team that gives you all the tools you need to launch your shop and provides you with ready-to-use integrations that will reduce your project's development time and cost.

## Enterprise license

The Enterprise license offers everything available in our open-source version, plus:

- [**Vue Storefront Cloud**](https://www.vuestorefront.io/cloud) infrastructure optimized for performance and safety, which includes CDN, DDoS protection, and high SLA.
- Additional [**Integrations**](/integrations/) with e-commerce and other third-party services.
- **Technical Support**.

To get access to Vue Storefront Enterprise, [contact our Sales team](https://www.vuestorefront.io/contact/sales).

## How to use enterprise packages

Once you have access to our enterprise license, you can connect to our private repository that hosts the `@vsf-enterprise` packages.

To use them, create the `.npmrc` file with the following content at the root of your project:

```bash
@vsf-enterprise:registry=https://registrynpm.storefrontcloud.io
```

Then run the following command and enter your Vue Storefront Enterprise account credentials:

```bash
npm adduser --registry https://registrynpm.storefrontcloud.io
```
