# VirtoCommerce integration

All integration functionality in this folder

## How to build
> For correct build you SHOULD use Mac/Linux or WSL on Windows  

```bash
# install packages
$ yarn install

# build integration packages (you should rebuild it on every change)
$ yarn build:vc:tools

# serve solution
$ yarn dev:vc
```

## How to work
* Update VirtoCommerce GraphQL uri in configuration file `theme\nuxt.config.js`
```javascript
api: {
  uri: 'https://dev-xapi-admin.azurewebsites.net/graphql'
}
```
* CORS on VirtoCommerce admin side should allow external connections   
