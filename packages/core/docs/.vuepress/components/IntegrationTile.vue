<template>
  <div
    :class="[ statusClass ]"
    class="tile"
  >
    <div class="tile-image">
      <img
        :src="image"
        :alt="name"
      />
    </div>

    <div class="tile-info">
      <p class="tile-title">
        <span>{{ name }}</span>

        <span
          v-if="status !== $site.themeConfig.STATUSES.STABLE"
          class="tile-status-badge"
        >
          {{ status }}
        </span>
      </p>

      <p class="tile-tags-title">Availability: <span>{{ availability }}</span></p>

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

      <p v-if="compatibility && compatibility.length">
        <span class="tile-tags-title">Compatible with:</span>

        <span>{{ compatibility.join(', ') }}</span>
      </p>
    </div>

    <a
      v-if="link"
      :href="link"
      class="tile-more"
    >
      Read the documentation →
    </a>
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
      type: String,
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
    availability: {
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
    },
    compatibility: {
      type: Array,
      required: false
    }
  },

  computed: {
    statusClass() {
      const [ key ] = Object
        .entries(this.$site.themeConfig.STATUSES)
        .find(([ _, value ]) => value === this.status);

      return `tile-status-${key.toLowerCase()}`
    },

    availabilityClass() {
      const [ key ] = Object
        .entries(this.$site.themeConfig.AVAILABILITY)
        .find(([ _, value ]) => value === this.availability);

      return `tile-availability-${key.toLowerCase()}`
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
  align-items: flex-start;
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

  /*********** Image ***********/
.tile-image {
  padding-top: 10px;
  height: 80px;
  text-align: center;
}

.tile-image img {
  height: 100%;
  max-width: 180px;
  object-fit: contain;
  object-position: center;
}

  /*********** Information ***********/
.tile-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
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
  align-content: center;
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

.tile-status-badge {
  padding: 0 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 400;
}

.tile-status-wip {
  background-color: #F3F4F6;
}

.tile-status-wip .tile-image {
  opacity: 0.6;
  filter: grayscale(100%);
}

.tile-status-wip .tile-status-badge {
  background-color: #E5E7EB;
  color: #4B5563;
}

.tile-status-alpha .tile-status-badge {
  background-color: #FEF3C7;
  color: #D97706;
}

.tile-status-beta .tile-status-badge {
  background-color: #FEF3C7;
  color: #D97706;
}


.tile-maintained-by + .tile-maintained-by::before {
  content: ', ';
}

  /*********** Link ***********/
.tile-more {
  display: flex;
  padding: 20px 20px 20px;
  background-color: #F9FAFB;
  cursor: pointer;
}

.tile-more .tile-link {
  font-weight: 500;
}
</style>
