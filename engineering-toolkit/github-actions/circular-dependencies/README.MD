# @vue-storefront/circular-dependencies

> This action detects circular dependencies in the project

## Inputs

### `filesPath`

**Required** The path to project files that will be used during analysis

## Example usage

```yaml
uses: vuestorefront/engineering-toolkit/github-actions/circular-dependencies@main
with:
  filesPath: 'packages/**/*.{ts,vue}'
```