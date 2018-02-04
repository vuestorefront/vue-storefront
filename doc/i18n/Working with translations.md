# Internationalization (i18n) of Vue Storefront

Vue Storefront allows you to translate the whole UI using powerfull [vue-i18n](http://kazupon.github.io/vue-i18n/en/api.html#methods) library.

Please be aware of i18n issues while writing your own themes/extensions and keep the i18n support in mind, especially when creating Pull Requests to the core

## Using i18n in code

When you're working with plain JS module you can simply use the translation helper:

```js
    import i18n from 'lib/i18n'
    EventBus.$emit('notification', {
        type: 'success',
        message: i18n.t('Product has been added to the cart!'),
        action1: { label: 'OK', action: 'close' }
    })
```

If you're working with *.vue components the matter is even simpler with Vue directive `$t`:

```html
    <span>
        {{ $t('Size guide') }}
    </span>
```

For all helper methods and directives along with available parameters please do check the [vue-i18n documentation](http://kazupon.github.io/vue-i18n/en/api.html#methods).

## Working with translations

Translations are provided in `resource/i18n.json` file and can be extended / overriden in `theme/resource/i18n.json` accordingly.

Here's an example of `i18n.json` for `en-US` locale:

```json
{
  "en-US": {
      "coreMessage": "Here is the core message",
      "customMessage": "Here is the core message. that can be overwritten in the theme",
      "Registering the account ...": "Registering the account ...",
      "No products synchronized for this category. Please come back while online!": "No products synchronized for this category. Please come back while online!",
      "Shopping cart is empty. Please add some products before entering Checkout": "Shopping cart is empty. Please add some products before entering Checkout",
      "Out of stock!": "Out of stock!",
  }
}
```
when you create the `i18n.json` file within your `theme/resource` folder and override some messages like:

```json
{
    "en-US": {
      "customMessage": "You can define or override translation messages here."
    }
}  
```

... you may expect that `$t('customMessage)` will return `You can define or override translation messages here.` instead of `Here is the core message. that can be overwritten in the theme`. As simple as that! :)

