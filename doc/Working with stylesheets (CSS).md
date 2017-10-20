# Introduction

Vue Storefront core CSS is designed to be easly maintanable which implies smallest possible files footprint. We are using flexbox and reusable atomic classes to prevent CSS files rapid growth. We're trying to avoid nesting CSS classes (maximum nesting level is 1) to make them easier to understand and debug.

All (S)CSS files should be placed in `src/themes/{theme_name}/css` folder.

All atomic classes should be created on demand (e.g. We're creating `pt-20` class for `padding-top: 20px` only when we need to use it). Following that rule will help you avoid unused CSS.

In your own themes other than `default` you don't need to follow our technology stack and conventions. All we require is correct path to CSS folder (`{theme_name}/css`)

# Technology stack

1. We are using [SASS](http://sass-lang.com/) as CSS preprocessors.
2. [Flexbox Grid](http://flexboxgrid.com/) for layout.
3. Atomic CSS convention for all repeatable CSS properties - margins, paddings, colors, text properties and borders. ([see some nice introduction to Atomic CSS](https://www.lucidchart.com/techblog/2014/01/31/atomic-css-tool-set/)).

# How to style UI elements in Vue Storefront

Let's say we have a small piece of UI and we want to style it according to mocks provided by our graphic designer.
```html
<div>Hello Vuers!</div>
```

According to mocks the above `<div>` should have 20px padding top and bottom (y-axis), 10px padding left and right (x-axis), black background, white text color and display inline-flex.

Let's check the [CSS folder](https://github.com/DivanteLtd/vue-storefront/tree/master/src/themes/default/css) and find required classes.

For padding top/bottom there is `py-x` class where `py` means 'padding y-axis' and `x` is a size in px. We will use `py-20` in this case. Same with x-axis - we will use `px-10`.

For colors we will use `c-white` for `color: white` property and `bg-black` for `background-color: black`.

Now our `<div>` should look like this:
```html
<div class="py-20 px-10 c-white bg-black">Hello Vuers!</div>
```

The `display` properties aren't commonly used across the project therefore they are not handled by atomic classes. We can add properties like this in a "normal" way - via class in component's `<style>` section.

Now our finished piece of UI should look like this:
```html
<div class="cool-item py-20 px-10 c-white bg-black">Hello Vuers!</div>
```
```html
<style scoped>
.cool-item {
  display: inline-flex;
}
</style>
```






