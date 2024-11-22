---
"@vue-storefront/middleware": minor
---

**[ADDED]** Support for file uploads
Now you can upload files to the server with a `multipart/form-data` content type. Files are available in the `req.files` object.

```ts
// Example of an endpoint that handles file uploads
export const upload = (context) => {
  // Files are available in the `req.files` object
  const { files } = context.req;

  // Do something with files

  return Promise.resolve({
    status: 200,
    message: "ok",
  });
};
```

Please, read the [Getting Started guide](https://docs.alokai.com/middleware/guides/getting-started#file-upload-configuration) for more information about file uploads.
