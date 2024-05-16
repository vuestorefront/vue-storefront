<template>
  <main>
    <h1>Server Side Page</h1>
    <pre>{{ result }}</pre>
  </main>
</template>

<script setup>
const sdk = useSdk();

const { data: result } = await useAsyncData("example", () =>
  sdk.example.getSuccess()
);
</script>
