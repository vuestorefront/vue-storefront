<template>
  <main>
    <h1>Client Side Page</h1>
    <pre>{{ result }}</pre>
  </main>
</template>

<script setup>
const sdk = useSdk();

const { data: result } = await useLazyAsyncData("example", () =>
  sdk.example.getSuccess()
);
</script>
