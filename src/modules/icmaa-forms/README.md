# `icmaa-forms` module

Load and show forms from cms by serving them using an universal component.

## Example implementation

You can simply use the `icmaa-forms/components/Form` component and pass a `form-identifier` of the identifier in the CMS to show your desired form.

Use the `submit` method to do your desired actions after validation. The form data is in the passed model `formData` (in this example).

You can pass all attributes which you can pass to the `theme/components/core/blocks/Form/Form` as well to customize your form.

```vue
<template>
  <div>
    <form-component form-identifier="service-contact" v-model="formData" @submit="submit" />
  </div>
</template>

<script>
import FormComponent from 'icmaa-forms/components/Form'

export default {
  name: 'Service',
  components: {
    FormComponent
  },
  data () {
    return {
      formData: { }
    }
  },
  methods: {
    submit () {
      console.log('Do your form magic ...')
    }
  }
}
</script>
```

## Configs

...

## Todo

[ ] Add a API endpoint to do several actions like sending an email or put it into an GoogleSheet like in the `icmaa-competitions` module
