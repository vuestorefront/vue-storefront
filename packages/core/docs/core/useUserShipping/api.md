`useUserShipping` contains following properties:

- `load` - function for fetching user addresses. When invoked, it requests data from the API and populates `shipping` property.

- `addAddress` - function for posting new shipping address.

<Content slot-key="add-params" />

- `deleteAddress` - function for deleting existing shipping address.

<Content slot-key="delete-params" />

- `updateAddress` - function for updating existing shipping address.

<Content slot-key="update-params" />

- `setDefault` - function for settings an existing shipping address as default.

::: tip
If `isDefault` property is passed to `addAddress` or `updateAddress`, there is no need to call `setDefault` separately.
:::

<Content slot-key="set-default-params" />

- `shipping` - reactive data object containing response from the backend.

- `loading` - reactive object containing information about loading state of `load`, `addAddress`, `deleteAddress`, `updateAddress` and `setDefault` methods.
