---
"@vue-storefront/next": major
---

**[BREAKING CHANGE]**: Now the SDK is separately initialized on the server and client. We recommend splitting configuration files for SDK Options and Configuration to re-use them between instances. Introduce the `defineSdkConfig` helper function. Changed the `SdkProvider` interface, taking only type and no arguments. The SDK instance is passed to the Provider in the place where it's used.
