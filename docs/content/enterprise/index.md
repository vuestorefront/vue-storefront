---
layout: default
navigation: false
---

# Alokai Enterprise

**Alokai Enterprise is a commercial offering from the Alokai team that gives you all the tools you need to launch your shop and provides you with ready-to-use integrations that will reduce your project's development time and cost.**

The Enterprise license offers everything available in our open-source projects, plus:

::list{type="success"}
- [**Alokai Cloud**](/cloud) infrastructure optimized for performance and safety, which includes CDN, DDoS protection, and high SLA
- [**Alokai Console**](/console) to manage your Alokai Cloud projects
- Additional [**Integrations**](/integrations) with Enterprise-grade eCommerce platforms and third-party services
- **Technical Support and SLA** to ensure you're set for success
- and more...
::

:card{to="https://alokai.com/pricing" title="Open Source vs Enterprise" description="Learn the difference between Open Source and Enterprise offerings or talk to sales" icon="pepicons-pencil:internet"}
## How to use Enterprise Packages

Once you have access to our enterprise license, you can connect to our private repository that hosts the `@vsf-enterprise` packages.

To use them, create the `.npmrc` file with the following content at the root of your project:

```bash
@vsf-enterprise:registry=https://registrynpm.storefrontcloud.io
```

Then run the following command and enter your Alokai Enterprise account credentials:

```bash
npm login --registry https://registrynpm.storefrontcloud.io
```
