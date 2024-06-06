---
"@vue-storefront/middleware": major
---

[CHANGED] Extension hooks are now asynchronous. Example:
hooks: () => ({
beforeCreate: async ({ configuration }) => {
configuration.testParams.beforeCreate = true;
return configuration;
},
afterCreate: async ({ configuration }) => {
configuration.testParams.afterCreate = true;
return configuration;
},
beforeCall: async ({ configuration, args }) => {
configuration.testParams.beforeCall = true;
return args;
},
afterCall: async ({ configuration, args, response }) => {
configuration.testParams.afterCall = true;
return {
...response,
...configuration.testParams,
...args[0],
};
},
})
