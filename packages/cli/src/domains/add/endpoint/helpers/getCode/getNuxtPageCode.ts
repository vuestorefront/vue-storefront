export const getNuxtPageCode = (endpoint: string) => `
<template>
  <div class="flex justify-center items-center h-screen">
    <div class="p-5 w-96">
      <h1 class="typography-headline-2 font-bold mt-2 mb-4 text-green-500">
        Build something amazing
      </h1>
      <p class="text-gray-50">
       ${endpoint}()
      </p>
      <div class="box">
        <!-- <JsonViewer :value="jsonData" copyable boxed sort theme="light"  @onKeyClick="keyClick"/> -->
        <h4 class="text-gray-50">Response</h4>
        <JsonViewer class="min-h-[800px] min-w-[500px]" :value="res" expandDepth="5" expanded copyable boxed sort
          theme="dark" />
      </div>
      <div class="flex flex-col md:flex-row gap-4 mt-6">
        <SfButton @click="callEndpoint" size="lg"> call </SfButton>
        <SfButton @click="reset" size="lg" variant="secondary" class="bg-white"> reset </SfButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SfButton } from '@storefront-ui/vue';
import { sdk } from '~/sdk.config';
import { JsonViewer } from "vue3-json-viewer"
import "vue3-json-viewer/dist/index.css";

const res = useState('waiting to call ${endpoint}() ...');

async function callEndpoint() {
  const { data } = await sdk.boilerplate.${endpoint}('test');
  res.value = data
}

function reset() {
  res.value = 'waiting to call ${endpoint}() ...'
}
</script>
`;
