<template>
  <div>
    <nav>
      <ul>
        <li>
          <a href="/ssr">SSR Page</a>
        </li>
        <li>
          <a href="/csr">CSR Page</a>
        </li>
      </ul>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>
const { currency } = storeToRefs(useSfStore());

currency.value = "USD";
</script>
