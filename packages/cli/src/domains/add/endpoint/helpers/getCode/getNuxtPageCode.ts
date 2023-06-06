export const getNuxtPageCode = (endpoint: string) => `
<template>
  <div class="flex justify-center items-center h-screen">
    <div class="p-5 w-96">
      <p class="typography-text-xs md:typography-text-sm font-bold tracking-widest text-neutral-500 uppercase">
        Let's go
      </p>
      <h1 class="typography-headline-2 md:typography-headline-1 md:leading-[67.5px] font-bold mt-2 mb-4">
        Build something amazing
      </h1>
      <p>
       ${endpoint}()
      </p>
      <div class="box">
        <!-- <JsonViewer :value="jsonData" copyable boxed sort theme="light"  @onKeyClick="keyClick"/> -->
        <h4>Response</h4>
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
