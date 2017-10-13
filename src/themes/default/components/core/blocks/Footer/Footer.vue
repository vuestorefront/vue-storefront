<template>
  <footer>
    <div class="upper-footer bg-lightgray">
      <div class="container">
        
      </div>
    </div>
    <div class="container">
      <div class="row middle-md">
        <div class="col-md-3" >
          United States (US)
        </div>
        <div class="col-md-9 end-md">
          <ul class="links">
            <router-link class="c-black pr15" to="/legal" exact>Legal notice</router-link>
            <router-link class="c-black" to="/privacy" exact>Privacy policy</router-link>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Footer/Footer')]
}
</script>

<style scoped>
  .upper-footer {
    height: 300px;
  }
  .links {
    list-style-type: none;
  }
  .links li {
    display: inline-flex;
  }
</style>
