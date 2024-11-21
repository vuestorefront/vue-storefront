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

Available options are:

- `enabled`: (boolean) Enable/disable file upload functionality. Default: `true`. If you set it to `false`, the middleware will not initialize file upload functionality and the `req.files` object will be empty. That can be useful if you do not want to handle file uploads in your app and want to avoid unnecessary processing.
- `maxFileSize`: (number) Maximum file size in bytes. Default: `5242880` (5MB)
- `maxFiles`: (number) Maximum number of files that can be uploaded at once. Default: `5`
- `allowedMimeTypes`: (string[]) Array of allowed MIME types. Default: `["image/*", "application/pdf"]`
- `fieldNames`: (string[]) Array of accepted form field names for file uploads. Default: `[]`
