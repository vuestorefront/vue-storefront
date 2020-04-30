<template>
  <div class="container">
    <Header />
    <div class="hero">
      <div class="hero__content">
        click & collect
        <font-awesome-icon :icon="['fas', 'mouse-pointer']" />
      </div>
    </div>

    <div class="features">
      <div class="features__container">
        <div class="features__item">
          <img src="/add-to-cart.png" width="256" height="256" />
          <h3>Find your store</h3>
        </div>
        <div class="features__item">
          <img src="/magnifying-glass.png" width="256" height="256" />
          <h3>Reserve your items</h3>
        </div>
        <div class="features__item">
          <img src="/pickup.png" width="256" height="256" />
          <h3>Go Pickup</h3>
        </div>
      </div>
    </div>

    <div class="find" style="background-image: url('/store-search-bg.jpg')">
      <div class="find__container">
        <div class="find__info">
          <span>store locator</span>
          <h3>FIND YOUR CONVENIENCE STORE</h3>
        </div>
        <form class="find__form">
          <input type="text" class="find__form__input" placeholder="Find by City or Zip">
          <button class="circle-button">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
          <button class="circle-button" @click.prevent="loadLocation">
            <font-awesome-icon :icon="['fas', 'location-arrow']" />
          </button>
        </form>
      </div>
    </div>

    <div class="stores">
      <div class="stores__loader" v-if="isLoading">
        <Loading />
      </div>
      <div class="stores__item" v-for="store in multistores" :key="getId(store)">
        <div class="stores__item__content">
          <img src="/logo-small.png" />
          <div class="stores__item__content__address">
            <h3>{{ getName(store) }}</h3>
            <span>{{ getAddressLine1(store) }}</span>
            <span>{{ getAddressLine2(store) }}</span>
          </div>
        </div>
        <div class="stores__item__actions">
          <span>448.37 miles</span>
          <button @click="gotToStore(store)">Make my store</button>
        </div>
      </div>
    </div>

    <div class="footer">
      Copyright 2020 © <b>Circle K Stores and Alimentation Couche-Tard.</b>
    </div>

    <StoreLocator @click="loadLocation" />

  </div>
</template>
<script>

</script>

<script>
import { useGeolocation, useMultistore, multistoreGetters } from '@vue-storefront/commercetools'
import { ref, computed } from '@vue/composition-api';
import Header from './../components/Header';
import StoreLocator from './../components/StoreLocator';
import Loading from './../components/Loading';

export default {
  layout: null,
  components: {
    Header,
    StoreLocator,
    Loading
  },
  setup(props, context) {
    const { position, loading: geoLocationLocading, search: searchLocation } = useGeolocation();
    const { search: searchMultistores, loading: multistoresLocading, multistores, selectStore } = useMultistore();
    const selectedShop = computed(() => multistores.value?.[0]);
    const isLoading = computed(() => geoLocationLocading.value || multistoresLocading.value)

    const loadLocation = async () => {
      await searchLocation()
      searchMultistores({ coordinates: position.value });
    }

    const gotToStore = (store) => {
      selectStore(store);
      context.root.$router.push(`/c/women/women-clothing-jackets?store=${multistoreGetters.getId(store)}`)
    }

    return {
      ...multistoreGetters,
      isLoading,
      gotToStore,
      loadLocation,
      selectedShop,
      multistores
    };
  }
}
</script>

<style lang="scss" scoped>
@import "main.scss";
</style>
