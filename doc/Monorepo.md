# Adding dependecies to packages
```
yarn lerna add [package_name] --scope [module_name]
```
For example if you want to add [susy](https://github.com/oddbird/susy) package to `@vue-storefront/theme-default`
```
yarn lerna add susy --scope @vue-storefront/theme-default
```
To add `devDependency` use `--dev` flag

# Adding new packages
* If necessary, define new workspace inside root `package.json`. [Workspaces documentation](https://yarnpkg.com/lang/en/docs/workspaces/)
* Every package needs `package.json` with:
   * `name` - starting with `@vue-storefront/`
   * `version` - follow semantic versioning rules
   * `"publishConfig": { "access": "public" }`

If your package is not designed to be published, add `"private": true` and remove `publishConfig`

# Publishing packages on npm registry
* You need to have an account on [npmjs.com](https://www.npmjs.com/) and privileges to publish packages on [vue-storefront](https://www.npmjs.com/org/vue-storefront)
* Open console and login to your account via `npm login`. Check if you have tokens `npm token`, if not, create one using `npm token create`
* Login also on Yarn using `yarn login`
* You should be on a `master` branch or if you are relasing RC versions on `develop`
* Run `yarn lerna publish` and follow on screen questions to bump packages versions, according to semantic versioning rules
* Push commit and tags to repository
