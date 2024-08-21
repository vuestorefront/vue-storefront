<template>
  <main>
    <h1>Server Side Page</h1>
    <pre>{{ result }}</pre>
    <div>Currency from the state: {{ currency }}</div>
  </main>
</template>

<script setup>
const sdk = useSdk();
const { currency } = storeToRefs(useSfStore());

const { data: result } = await useAsyncData("example", () =>
  sdk.example.getSuccess()
);
</script>
