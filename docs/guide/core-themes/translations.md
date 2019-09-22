# Internationalization (i18n) of Vue Storefront

Vue Storefront allows you to translate the whole UI using the powerful [vue-i18n](http://kazupon.github.io/vue-i18n/) library.

Please be aware of i18n issues while writing your own themes/extensions and keep the i18n support in mind, especially when creating Pull Requests to the core.

## Using i18n in code

When you're working with a plain JS module, you can simply use the translation helper:

```js
import i18n from '@vue-storefront/i18n';
EventBus.$emit('notification', {
  type: 'success',
  message: i18n.t('Product has been added to the cart!'),
  action1: { label: i18n.t('OK'), action: 'close' },
});
```

If you're working with `.vue` components the matter is even simpler with Vue directive `$t`:

```html
    <span>
        {{ $t('Size guide') }}
    </span>
```

For all helper methods and directives, along with available parameters, please do check the [vue-i18n documentation](http://kazupon.github.io/vue-i18n/introduction.html).

## Working with translations

Translations are provided in `core/i18n/resource/i18n/en-US.csv` file and can be extended / overridden in `src/themes/{themename}/resource/i18n/en-US.csv` accordingly.

Here's an example of `en-US.csv` for `en-US` locale:

```csv
"customMessage","You can define or override translation messages here."
"welcomeMessage", "Welcome to Vue Storefront theme starter!",
"In case of any problems please take a look at the docs. If you haven't found what you were looking for in docs feel free to ask your question on our Slack", "In case of any problems please take a look at the docs. If you haven't found what you were looking for in docs feel free to ask your question on our Slack",
"Here are some links that can help you with developing your own theme", "Here are some links that can help you with developing your own theme",
"Project structure", "Project structure",
"Working with themes", "Working with themes",
"Working with components", "Working with components",
"Working with data", "Working with data",
"Vue Storefront Logo", "Vue Storefront Logo"
```

When you create the `en-US.csv` file within your `src/themes/{themename}/resource/i18n/` folder and override some messages like:

```csv
"customMessage","You can define or override translation messages here."
```

... you may expect that `$t('customMessage)` will return `You can define or override translation messages here.` instead of `Here is the core message. that can be overwritten in the theme`. As simple as that! :)
