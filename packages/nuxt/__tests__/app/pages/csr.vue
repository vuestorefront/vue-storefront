<template>
  <main>
    <h1>Client Side Page</h1>
    <pre>{{ result }}</pre>
    <div>Currency from the state: {{ currency }}</div>
  </main>
</template>

<script setup>
const sdk = useSdk();
const { currency } = storeToRefs(useSfStore());

const { data: result } = await useLazyAsyncData("example", () =>
  sdk.example.getSuccess()
);
</script>
