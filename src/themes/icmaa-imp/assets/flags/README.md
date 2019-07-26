# Flag icons

There is a component called `FlagIcon.vue` to include flags into out theme.

We are using the library [flag-icon-css
](https://github.com/lipis/flag-icon-css).  
But to prevent overhead during the build we include only the flags we need as static assets.

## Component

The component has two options:

* **iso** - for the specific country
* **format** - for the desrired format, options: `1x1` (Default), `4x3`
