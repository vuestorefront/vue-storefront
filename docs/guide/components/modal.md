# Modal component

Simple modal component. Visibility of modal container is based on internal state `isVisible`. We can set this state with the `$emit` event on the global `$bus` event.

## Basic usage

### Component markup

```html
<modal name="modal-example">
  <div> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
</modal>
```

### Available events:

```html
<button @click="$bus.$emit('modal-toggle', 'modal-example')">Example</button>
<button @click="$bus.$emit('modal-show', 'modal-example')">Example</button>
<button @click="$bus.$emit('modal-hide', 'modal-example')">Example</button>
```

### Available props

| Prop           | Type   | Required | Default        | Description                                |
| -------------- | ------ | -------- | -------------- | ------------------------------------------ |
| name           | String | true     |                | Unique name of modal                       |
| delay          | Number | false    | 300            | Timeout to show modal                      |
| width          | Number | false    | 0              | Optional fixed width of content, in pixels |
| transitionName | String | false    | 'fade-in-down' | Content transition style                   |

### Available Methods

| Method | Argument       | Description                                                |
| ------ | -------------- | ---------------------------------------------------------- |
| toggle | state: Boolean | Manually toggles a modal                                   |
| close  |                | Alias for manually hides a modal. Helpful for Close button |

### Styles

Core component doesn't have CSS styles. If you want to see an example of our implementation please look [here](https://github.com/DivanteLtd/vue-storefront/blob/master/src/themes/default/components/core/Modal.vue)

### Transitions

The default theme defines one transition, `fade-in-down`, which can be seen [here](https://github.com/DivanteLtd/vue-storefront/blob/master/src/themes/default/css/animations/_transitions.scss). This is the default value for the `transitionName` prop. Further transitions can be defined in a custom theme by following this example. Vue transitions are explained [here](https://vuejs.org/v2/guide/transitions.html).

To have modal content display immediately, without any transition, just supply an empty string for the `transitionName` prop. For example:

```html
<modal name="modal-example" transition-name="" :delay="0" :width="600">
  <!-- modal content goes here -->
</modal>
```
