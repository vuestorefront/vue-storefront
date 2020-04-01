# Merging core packages

## Motivation

Currently there are 6 core packages:
- `docs`
- `factories`
- `interfaces`
- `nuxt-module`
- `theme-module`
- `utils`

While this division was making sense long time ago at the beginning of creating this repo now after many changes and shifts it doesn't work so well. We shifted from interface-only core to factories and utility functions. Because some of these packages depends on each other and they will be used together anyway in the integration it makes sense to merge them to avoid desynchronization and complexity.

Specifically I suggest merging: `factories`, `interfaces` and `utils` into single `core` and rename the `core` folder into `shared` as it's basically containing shared resources ;)

## Migration process

Prety straightforward, only replacing pathes .