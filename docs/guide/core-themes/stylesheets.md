# Working with stylesheets in the 'default' theme

The default theme’s CSS is designed to be easily maintainable, which implies the smallest possible files footprint. We are using flexbox and reusable atomic classes to prevent CSS files’ rapid growth. We're trying to avoid nesting CSS classes (maximum nesting level is 1) to make them easier to understand and debug.

All (S)CSS files should be placed in the `src/themes/{theme_name}/css` folder.

All atomic classes should be created on demand (e.g. we're creating `pt-20` class for `padding-top: 20px` only when we need to use it). Following that rule will help you avoid unused CSS.

In your own themes other than `default` you don't need to follow our technology stack and conventions. All we require is the correct path to the CSS folder (`{theme_name}/css`)

## Technology Stack

1. We are using [SASS](http://sass-lang.com/) as CSS preprocessors.
2. [Flexbox Grid](http://flexboxgrid.com/) for layout.
3. Atomic CSS convention for all repeatable CSS properties - margins, paddings, colors, text properties and borders. ([see some nice introduction to Atomic CSS](https://www.lucidchart.com/techblog/2014/01/31/atomic-css-tool-set/)).

## How to style UI elements in Vue Storefront

Let's say we have a small piece of UI and want to style it according to mocks provided by our graphic designer.

```html
<div>Hello Vuers!</div>
```

According to mocks the above `<div>`should have 20px padding top and bottom (y-axis), 10px padding left and right (x-axis), a black background, white text color, and display inline-flex.

Let's check the [CSS folder](https://github.com/vuestorefront/vue-storefront/tree/master/src/themes/default/css) and find the required classes.

For padding top/bottom there is `py-x` class where `py` means 'padding y-axis' and `x` is a size in px. We will use `py-20` in this case. Same with x-axis - we will use `px-10`.

For colors, we will use `c-white` for `color: white` property and `bg-black` for `background-color: black`.

Now our `<div>` should look like this:

```html
<div class="py-20 px-10 c-white bg-black">Hello Vuers!</div>
```

The `display` properties aren't commonly used across the project, therefore, they are not handled by atomic classes. We can add properties like this in a "normal" way, via a class in the component's `<style>` section.

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

## Extending (S)CSS files

If you can't find a CSS rule that you need, please read the rules below before extending current stylesheets:

1. Don't create new files in `default/css/` folder. If you think something is missing, please contact us on [slack](http://vuestorefront.slack.com) before creating a new file.
2. Follow the conventions! Usually, you can find arrays in the top of each SCSS file with sizes or colors and loops below them that iterates through these arrays to generate CSS classes. Please see the [margin.scss](https://github.com/vuestorefront/vue-storefront/blob/master/src/themes/default/css/margin.scss) file.

On the top you can find arrays of sizes (in px and %):

```SCSS

  // Pixels

  $margin-px: 0 5 10;
  $margin-x-px: 10;
  $margin-y-px: 0 5 10;
  $margin-top-px: 0 6 10 15 25 50;
  $margin-bottom-px: 0 5 10 15 20 25 30 35;
  $margin-left-px: 10 15 30;
  $margin-right-px: 0 5 10 15;

  // Percents

  $margin-p: 5;
  $margin-x-p: 5;
  $margin-y-p: 5;
  $margin-top-p: 5;
  $margin-bottom-p: 5;
  $margin-left-p: 5;
  $margin-right-p: 5;
```

Below you can see how they are used to generate Atomic CSS classes:

```SCSS
  // Generators

  @mixin margin {
    @each $i in $margin-px {
      .m#{$i} {
        margin: #{$i}px;
      }
    }
    @each $i in $margin-p {
      .m#{$i}p {
        margin: percentage($i/100);
      }
    }

    @each $i in $margin-x-px {
      .mx#{$i} {
        margin-left: #{$i}px;
        margin-right: #{$i}px;
      }
    }
    @each $i in $margin-x-p {
      .mx#{$i}p {
        margin-left: percentage($i/100);
        margin-right: percentage($i/100);
      }
    }

    @each $i in $margin-y-px {
      .my#{$i} {
        margin-top: #{$i}px;
        margin-bottom: #{$i}px;
      }
    }
    @each $i in $margin-y-p {
      .my#{$i}p {
        margin-top: percentage($i/100);
        margin-bottom: percentage($i/100);
      }
    }

    @each $i in $margin-top-px {
      .mt#{$i} {
        margin-top: #{$i}px;
      }
    }
    @each $i in $margin-top-p {
      .mt#{$i}p {
        margin-top: percentage($i/100);
      }
    }

    @each $i in $margin-bottom-px {
      .mb#{$i} {
        margin-bottom: #{$i}px;
      }
    }
    @each $i in $margin-bottom-p {
      .mb#{$i}p {
        margin-bottom: percentage($i/100);
      }
    }

    @each $i in $margin-left-px {
      .ml#{$i} {
        margin-left: #{$i}px;
      }
    }
    @each $i in $margin-left-p {
      .ml#{$i}p {
        margin-left: percentage($i/100);
      }
    }

    @each $i in $margin-right-px {
      .mr#{$i} {
        margin-right: #{$i}px;
      }
    }
    @each $i in $margin-right-p {
      .mr#{$i}p {
        margin-right: percentage($i/100);
      }
    }
  }
```

Let's say you need a class for 55px top margin that isn't available now. In this case, you just need to add a `55` value to `$margin-top-px` array.

```SCSS
$margin-top-px: 0 6 10 15 25 50;
```

After your changes it should look like this:

```SCSS
$margin-top-px: 0 6 10 15 25 50 55;
```
