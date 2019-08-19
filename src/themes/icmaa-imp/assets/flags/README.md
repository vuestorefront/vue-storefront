# Flag icons

There is a component called `FlagIcon.vue` to include flags into out theme.

We are using the library [flag-icon-css](https://github.com/lipis/flag-icon-css).  
But to prevent overhead during the build we include only the flags we need as static assets.
## Component

The component has two options:

* **iso** - for the specific country
* **format** - for the desrired format, options: `1x1` (Default), `4x3`

## Sprites

It's possible to use a SVG sprite map to save some requests on page load.

Because it seemed pretty complicated to implement [`svg-sprite-loader`](https://github.com/kisenka/svg-sprite-loader) into our webpack config, I decided to just use [`svg-sprite`](https://github.com/jkphl/svg-sprite) with a custom script to generate our language sprites.

To enable sprites you need to set the `config.icmaa.useCountryFlagSprites` value in your configs to `true`. By default it is using the single file SVG language icons.

### Build sprites

The `sprite-generator.js` will create two SVG files in the `/assets/flags` folder for each size containing the SVG's symbols.

Run the following command inside `/assets/flags` to build new sprites files:
```bash
node sprite-generator.js
```

**THIS SHOULD BE AUTOMATED VIA WEBPACK SOME DAY WHEN I FIGURE OUT HOW WEBPACK WORKS WITH THIS IN DETAIL**

