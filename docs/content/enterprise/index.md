---
layout: default
navigation: false
---

# Vue Storefront Enterprise

**Vue Storefront Enterprise is a commercial offering from the Vue Storefront team that gives you all the tools you need to launch your shop and provides you with ready-to-use integrations that will reduce your project's development time and cost.**

The Enterprise license offers everything available in our open-source projects, plus:

::list{type="success"}
- [**Vue Storefront Cloud**](/cloud) infrastructure optimized for performance and safety, which includes CDN, DDoS protection, and high SLA
- Additional [**Integrations**](/integrations) with Enterprise-grade eCommerce platforms and third-party services
- **Technical Support and SLA** to ensure you're set for success
- and more...
::

:card{to="https://vuestorefront.io/pricing" title="Open Source vs Enterprise" description="Learn the difference between Open Source and Enterprise offerings or talk to sales" icon="pepicons-pencil:internet"}
## How to use Enterprise Packages

Once you have access to our enterprise license, you can connect to our private repository that hosts the `@vsf-enterprise` packages.

To use them, create the `.npmrc` file with the following content at the root of your project:

```bash
@vsf-enterprise:registry=https://registrynpm.storefrontcloud.io
```

Then run the following command and enter your Vue Storefront Enterprise account credentials:

```bash
npm login --registry https://registrynpm.storefrontcloud.io
```
