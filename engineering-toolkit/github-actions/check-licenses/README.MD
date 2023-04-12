# @vue-storefront/check-licenses

> This action analyses software licenses for used dependencies in the project


## Inputs

### `projectPath`

**Required** The path to the project root directory

## Example usage

```yaml
uses: vuestorefront/engineering-toolkit/github-actions/check-licenses@main
with:
  projectPath: ${{ github.workspace }}
```