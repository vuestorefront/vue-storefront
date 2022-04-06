# Handling cookies

Thanks to the preinstalled [cookie-universal-nuxt](https://www.npmjs.com/package/cookie-universal-nuxt) package, we can easily handle cookies from both components and middlewares.

Handling cookies in components:

```vue
<script>
import { useContext } from '@nuxtjs/composition-api';

export default {
  setup () {
    const { $cookies } = useContext();

    // `$cookies.get()` or `$cookies.set()`
  }
};
</script>
```

Handling cookies in middlewares:

```javascript
export default ({ $cookies }) => {
  // `$cookies.get()` or `$cookies.set()`
};
```
