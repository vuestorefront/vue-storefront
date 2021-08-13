 # Integration checklist
 
When developing an integration, a good way to find if you have a complete integration, is by checking this checklist if is missing any implementation. 

Fell free to copy this checklist and past it on your repository as a current issue, so you can have a track of what is needed to be done.

## Developing an integration checklist

### Repository
```md
- [ ] I've added `ISSUE_TEMPLATES` to my repository 
- [ ] I've added workflows for Auto-Publishing on my repository
- [ ] I've added the `CONTRIBUTING.md` file to my repository
- [ ] I've added the `CODE_OF_CONDUCT.md` file to my repository
- [ ] I've added instructions on how to start the project for new contributors on the `README.md` file
- [ ] I've added the `eslint` rules to my repository
```

### Docs
```md
- [ ] I've created the initial documentation of my integration
- [ ] I've added information on how to contribute on the integration
- [ ] I've added information on how to contribute on the documentation
- [ ] I've added information on how to use the integration in a new project in my documentation
- [ ] I've created the documentation for the `api-client` methods
- [ ] I've created the documentation for the `composables` composable
- [ ] I've created the documentation for the `composables` getters
- [ ] I've created the documentation for the `composables` nuxt module options
- [ ] I've created the documentation for the `theme`
```
### API-Client
```md
- [ ] I've created a `index.server.ts` that exposes the required methods
- [ ] I've created the `index.ts` that exposes the methods, types and interfaces of the `api-client`
- [ ] I've implemented the required methods for the user to be able to use the integration
- [ ] I've implemented the required typings for all the **API** methods that are being exposed
- [ ] My implementation follows the process of GDPR or similar laws
- [ ] My implementation is not exporting to the frontend packages and services required only by the backend
- [ ] I've configured the `rollup.config.js` to match the correct configuration for the `index.server.ts` and `index.ts`
- [ ] I've created unit testing for the `api-client` methods
- [ ] I've created integration tests for the `api-client` methods
```

### Composables
```md
- [ ] I've created the basic composable for the integration
- [ ] I've created the basic getters for the integration
- [ ] I've created the **Nuxt** module for the integration
- [ ] I've created unit testing for the `composables` methods
- [ ] I've created unit testing for the `composables` getters
- [ ] I've created integration tests for the `composables` methods
```
### Theme
```md
- [ ] I've added the information on how to start using the integration on the `README.md` file
- [ ] My theme follows the principles of Storefront UI
- [ ] I've created E2E tests for the implementation
- [ ] I've created unit testing for the `theme` components
- [ ] I've created integration tests for the `theme` components
```

## Publishing an integration checklist

### Repository
```md
- [ ] The packages dependencies and devDependencies are updated
```
### Docs
```md
- [ ] The docs have been updated with the latest changes
```
### API-Client
```md
- [ ] The packages dependencies and devDependencies are updated
- [ ] The version of `api-client` follows the SemVer model, and has been bumped
```
### Composables
```md
- [ ] The packages dependencies and devDependencies are updated
- [ ] The version of `composables` follows the SemVer model, and has been bumped
```
### Theme
```md
- [ ] The packages dependencies and devDependencies are updated
- [ ] The version of `theme` follows the SemVer model, and has been bumped
```
