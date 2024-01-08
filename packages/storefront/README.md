# Storefront

This package contains the Storefront packages. Temporarly it is not included in the monorepo, because it requires Node.js 18, and the other packages in monorepo still needs Node.js 16. As a consequence:

- packages contain custom CI workflow (`.github/workflows/continuous-integration-storefront.yml`)
- packages contain custom CD workflow (`.github/workflows/continuous-delivery-storefront.yml`)
- in `package.json` a custom Yarn Workspace is configured
- the release isn't handled by the `changeset` (it looks only for the packages included in the root Yarn Workspace)
  
## Release

To release a new version of the Storefront packages, you need to:

1. Manually bump version of the packages.
2. Manually create the changelog.
3. Manually trigger the CD workflow (`.github/workflows/continuous-delivery-storefront.yml`).
4. Manually create a new release in GitHub.