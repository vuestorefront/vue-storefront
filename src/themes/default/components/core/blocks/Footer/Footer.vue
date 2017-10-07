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
            <li class="pr15 display-inline-flex">Legal notice</li>
            <li>Privacy policy</li>
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
</style>
