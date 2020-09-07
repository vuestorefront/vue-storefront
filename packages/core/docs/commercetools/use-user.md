---
platform: Commercetools
---

<IncludeContent content-key="use-user" />

::: slot login-params
```js
{
    username: string;
    password: string;
    [x: string]: any;
}
```
:::

::: slot register-params
```js
{
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    [x: string]: any;
}
```
:::

::: slot changepw-params
```js
currentPassword: string,
    newPassword: string
```
:::