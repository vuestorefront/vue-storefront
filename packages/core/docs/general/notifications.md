# In-app Notifications

In Vue Storefront we're providing Notifications system based on composable `useUiNotification`. 

Shows notifications after some actions being performed in the shop. There are three types of notifications: danger, success and info.

There is a dedicated interface for `useUiNotification`:

```ts
interface UseUiNotification {
  message: string;
  type: 'danger' | 'success' | 'info';
  action?: { text: string; onClick: Function };
  icon?: string;
  persist?: boolean;
  id?: symbol;
  dismiss?: () => void;
}
```

### How to send notification?

To send a new notification you need to only import `useUiNotification` from composables and pass `type` and `message` to `send` function. Rest parameters are optional.

```js
import { useUiNotification } from '~/composables';

setup() {
  const { send } = useUiNotification();

  send({
    type: 'success',
    message: 'Successfully added product to the cart'
  })
}
```
