<template>
  <div class="tile" :style="{
    backgroundImage: 'url(' + item.background + ')',
    backgroundColor: item.overlay
  }">
    <div class="content">
      <h2>{{ item.title }}</h2>
      <p>{{ item.text }}</p>
      <a :href="item.url.url">{{ item.cta }}</a>
    </div>
  </div>
</template>

<script>
import { Blok } from '..'

export default {
  name: 'TileBlok',
  extends: Blok
}
</script>

<style lang="scss" scoped>
.tile {
  position: relative;
  width: 100%;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  background-size: cover;
  background-blend-mode: overlay;
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
}

h2 {
  text-transform: uppercase;
  padding: 0;
  margin: 0;
}

a {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  display: block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 10px;
  transition: all .3s;
  border: 2px solid #fff;
  font-size: 1.3em;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  overflow: hidden;
  margin: 10px auto;
  max-width: 50%;
}
</style>
