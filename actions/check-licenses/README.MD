# @vue-storefront/check-licenses

> This action analyses software licenses for used dependencies in the project


## Inputs

### `projectPath`

**Required** The path to the project root directory

## Example usage

```yaml
uses: vuestorefront/vue-storefront/actions/check-licenses@main
with:
  projectPath: ${{ github.workspace }}
```

### Deployment

1. Run `build` command to create GitHub actions distribution
2. Update `package.json` version property
3. Commit `dist` directory
4. Create Git tag and push changes
