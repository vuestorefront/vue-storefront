# @vue-storefront/circular-dependencies

> This action detects circular dependencies in the project

## Inputs

### `filesPath`

**Required** The path to project files that will be used during analysis

## Example usage

```yaml
uses: vuestorefront/vue-storefront/actions/circular-dependencies@main
with:
  filesPath: 'packages/**/*.{ts,vue}'
```

### Deployment

1. Run `build` command to create GitHub actions distribution
2. Update `package.json` version property
3. Commit `dist` directory
4. Create Git tag and push changes
