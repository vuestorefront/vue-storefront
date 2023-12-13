<template>
  <div>
    <strong>Success</strong>
    <div id="result" class="mt-4">
      {{ result }}
    </div>
  </div>
</template>

<script setup>
const sdk = useSdk();

const result = ref("null");

async function testCall() {
  const data = await sdk.example.getSuccess();
  result.value = JSON.stringify(data);
}

await testCall();
</script>
