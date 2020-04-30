<template>
  <div class="header">
    <img src="/logo.png" />
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Browse</a></li>
      <li><a href="#">Our stores</a></li>
    </ul>
    <div class="header__links">
      <button class="circle-button">
        <font-awesome-icon :icon="['fas', 'search']" />
      </button>
      <button class="circle-button">
        <font-awesome-icon :icon="['fas', 'user']" />
      </button>
      <div class="divider" />
      <button class="circle-button header__cart">
        <span>$ 0.00</span>
        <font-awesome-icon :icon="['fas', 'shopping-cart']" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../pages/main.scss";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;

  &__cart {
    width: auto;
    border-radius: 100px;
    padding: 0 .60em 0 .12em;

    span {
      font-size: .8em;
      font-weight: bold;
      margin: 0 8px;
    }
  }

  &__links {
    margin: 0 -9px;
    display: flex;
    align-items: center;

    > div, button {
      margin: 0 9px;
    }
  }

  img {
    display: block;
    max-height: 100px;
    width: 200px;
  }

  ul {
    list-style-type: none;
    display: flex;
    font-size: .9em;
    text-transform: uppercase;
  }

  li {
    margin: 0 9px;

    a {
      letter-spacing: .02em;
    }
  }
}
</style>
