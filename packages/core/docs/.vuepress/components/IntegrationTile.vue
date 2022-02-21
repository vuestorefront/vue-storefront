<template>
  <div
    :class="[ statusClass ]"
    class="tile"
  >
    <div class="tile-data">
      <div class="tile-image">
        <img
          :src="image"
          :alt="name"
        />
      </div>

      <div class="tile-info">
        <div class="tile-title">
          <span>{{ name }}</span>

          <div class="tile-badges">
            <span
              v-if="license === $site.themeConfig.LICENSE.ENTERPRISE"
              class="tile-badge-license"
            >
              {{ license }}
            </span>

            <span
              v-if="status !== $site.themeConfig.STATUS.STABLE"
              class="tile-badge-status"
            >
              {{ status }}
            </span>
          </div>
        </div>

        <p v-if="maintainedBy && maintainedBy.length">
          <span class="tile-tags-title">Maintained by:</span>

          <a
            v-for="{ name, link } in maintainedBy"
            :key="name"
            :href="link"
            class="tile-maintained-by"
          >{{ name }}</a>
        </p>

        <p v-if="categories && categories.length">
          <span class="tile-tags-title">Category:</span>

          <span>{{ categories.join(', ') }}</span>
        </p>
      </div>
    </div>

    <p
      v-if="link"
      class="tile-more"
    >
      <a
        v-if="typeof link === 'string'"
        :href="link"
      >
        Read the documentation
      </a>

      <a
        v-else
        v-for="{ name, link } in Object.values(link)"
        :key="name"
        :href="link"
      >
        Read the documentation for&nbsp;<span>{{ name }}</span>
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'IntegrationTile',

  props: {
    name: {
      type: String,
      required: true
    },
    link: {
      type: [ String, Array ],
      required: false
    },
    image: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    license: {
      type: String,
      required: true
    },
    maintainedBy: {
      type: Array,
      required: false
    },
    categories: {
      type: Array,
      required: false
    }
  },

  computed: {
    statusClass() {
      const [ key ] = Object
        .entries(this.$site.themeConfig.STATUS)
        .find(([ _, value ]) => value === this.status);

      return `tile-status-${key.toLowerCase()}`
    },

    licenseClass() {
      const [ key ] = Object
        .entries(this.$site.themeConfig.LICENSE)
        .find(([ _, value ]) => value === this.license);

      return `tile-license-${key.toLowerCase()}`
    }
  }
}
</script>


<style scoped>
* {
  box-sizing: border-box;
}

.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  color: #4B5563;
  font-weight: 400;
  font-size: 0.9rem;
  text-decoration: none;
  overflow: hidden;
}

.tile > * {
  width: 100%;
}

.tile-data {
  display: flex;
}

@media (max-width: 1023px) {
  .tile-data {
    flex-direction: column;
  }
}

/*********** Image ***********/
.tile-image {
  padding: 20px 40px;
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tile-image img {
  width: 100%;
  height: 70px;
  object-fit: contain;
  object-position: center;
}

/*********** Information ***********/
.tile-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-left: 1px solid #e2e8f0;
}

@media (max-width: 1023px) {
  .tile-info {
    border-left: 0;
    border-top: 1px solid #e2e8f0;
  }
}


.tile-info p {
  line-height: 1.8rem;
  margin: 0;
}

.tile-header > * + * {
  margin-left: 5px;
}

.tile-title {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 30px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #4B5563;
}

.tile-description {
  flex-grow: 1;
  margin-bottom: 10px;
  line-height: 1.4rem;
  color: #6B7280;
}

.tile-tags-title {
  font-weight: 600;
  color: #6B7280;
}

.tile-tags-title > span {
  font-weight: 400;
}

.tile-badges {
  height: 100%;
  margin: 3px 0;
}

.tile-badges * + * {
  margin-left: 5px;
}

.tile-badge-license,
.tile-badge-status {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 400;
}

.tile-badge-license {
  background-color: #dbeafe; 
  color: #2563eb;
}

.tile-status-wip {
  background-color: #F3F4F6;
}

.tile-status-wip .tile-image {
  opacity: 0.6;
  filter: grayscale(100%);
}

.tile-status-wip .tile-badge-status {
  background-color: #E5E7EB;
  color: #4B5563;
}

.tile-status-beta .tile-badge-status {
  background-color: #ffedd5;
  color: #ea580c;
}

.tile-maintained-by + .tile-maintained-by::before {
  content: ', ';
}

/*********** Link ***********/
.tile-more {
  flex-grow: 1;
  margin: 0;
  padding: 0;
}

.tile-more a {
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: 500;
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.tile-more a > span {
  font-weight: 700;
}

.tile-more a:hover {
  text-decoration: none;
}

.tile-more a::after {
  content: "→";
  padding-left: 5px;
}
</style>
