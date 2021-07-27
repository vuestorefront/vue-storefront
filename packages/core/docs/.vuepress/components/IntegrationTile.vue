<template>
  <div
    :class="{ wip }"
    class="tile"
  >
    <img
      :src="image"
      class="tile-image"
    />

    <div class="tile-info">
      <a
        v-if="link"
        :href="link"
        class="tile-title"
      >
        {{ name }}
      </a>

      <div
        v-else
        class="tile-title"
      >
        {{ name }}
      </div>

      <div
        v-if="description"
        class="tile-description"
      >
        {{ description }}
      </div>

      <div class="tile-badges">
        <span
          v-for="tag in tags"
          :key="tag"
          class="tile-badge"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="tile-more">
      <a
        v-if="link"
        :href="link"
        class="tile-link"
      >
        Read more →
      </a>
    </div>
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
    description: {
      type: String,
      required: false
    },
    link: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: true
    },
    wip: {
      type: Boolean,
      required: false,
      default: false
    },
    tags: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      required: false
    }
  }
}
</script>


<style scoped>
* {
  box-sizing: border-box;
}

/*********** Tile ***********/
.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #E5E7EB;
  border-radius: 5px;
  color: #4B5563;
  font-weight: 400;
  text-decoration: none;
}

.tile > * {
  width: 100%;
  padding: 10px 20px;
}

.tile.wip {
  background-color: #F3F4F6;
}
/*********** Image ***********/
.tile-image {
  padding: 20px 40px;
  height: 110px;
  top: calc(50% - 55px);
  object-fit: contain;
}

.tile.wip .tile-image {
  opacity: 0.6;
  filter: grayscale(100%);
}

/*********** Information ***********/
.tile-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #E5E7EB;
}

.tile-info > * + * {
  margin-top: 15px;
}

.tile-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: #4B5563;
}

.tile-description {
  flex-grow: 1;
  margin-bottom: 10px;
  color: #6B7280;
}

.tile-badges {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
}

.tile-badge {
  font-size: 14px;
  height: 18px;
  border-radius: 3px;
  padding: 4px 6px;
  margin-bottom: 5px;
  color: #6B7280;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  box-sizing: initial;
  margin: 0 5px 5px 0;
}

.tile-more {
  display: flex;
  justify-content: flex-end;
}

.tile-link {
  padding: 6px 20px;
  border-radius: 16px;
  font-weight: 500;
  color: #3B82F6;
  background-color: #DBEAFE;
}
</style>
