---
"@vue-storefront/sdk": minor
---

**[ADDED]** Add support for multipart/form-data requests in SDK

- Added handling for multipart/form-data content type in the default HTTP client
- Automatically handles File and Blob objects in request parameters

```typescript
// Upload a file using multipart/form-data
await sdk.commerce.uploadFile(
  { file: new File(["content"], "test.txt", { type: "text/plain" }) },
  prepareConfig({
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
);
```
