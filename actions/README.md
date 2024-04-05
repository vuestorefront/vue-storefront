This folder contains GitHub Actions commonly used in some of our repositories.

You can use them in your workflows as such:

```yaml
- name: Check licenses 🧪
  uses: vuestorefront/vue-storefront/actions/check-licenses@main
  with:
  projectPath: ${{ github.workspace }}
```

If you're looking for Alokai code meant for users (you), see the `packages/*` folder
