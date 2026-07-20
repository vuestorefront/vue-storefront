# Custom search adapters

Project-specific search adapters can override the core adapters by adding an
implementation at:

```text
src/search/adapter/<adapter-name>/searchAdapter.ts
```

When no project-specific implementation exists, the search adapter factory
falls back to the corresponding adapter in `core/lib/search/adapter`.

This directory is kept in the repository so Webpack can resolve the optional
custom-adapter context without reporting a missing-module warning.
