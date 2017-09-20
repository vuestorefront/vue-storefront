<template>
  <footer>
    <div class="upper-footer">
      <div class="container">
        
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          United States
        </div>
        <div class="col-md-9">
          <ul class="links">
            <li>Legal notice</li>
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
    background-color: #F2F2F2;
    height: 300px;
  }
  .links {
    list-style-type: none;
  }
  .links li {
    display: inline-flex;
  }
</style>
