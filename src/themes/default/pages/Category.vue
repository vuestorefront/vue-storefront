<template>
  <div id="category">
    <header>
        <div class="container">
            <h1> {{ categoryName }} </h1>
        </div>
    </header>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                Sidebar
            </div>
            <div class="col-md-9">
                Content
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// TO-DO configure routing to show specific category not whole catalog, pass category via route param
import { corePage } from 'lib/themes'

export default {
  mixins: [corePage('Category')]
}
</script>

<style scoped>

</style>
