<template>
  <div class="tiles">
      <SkrablTile
      class="tile-container"
        v-for="tile in tileDeck"
        @tile-clicked="setClickedTile"
        :tile="tile"
        :clicked="clickedTile.key === tile.key"
        :key="tile.key"/>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import {
  initializeDeck, tileDeck, clickedTile, setClickedTile,
} from '../refs/gameState';
import SkrablTile from './SkrablTile.vue';

export default {
  components: {
    SkrablTile,
  },
  setup() {
    onMounted(() => {
      initializeDeck();
    });
    return { tileDeck, setClickedTile, clickedTile };
  },
};
</script>
<style lang="scss" scoped>
.tiles {
    display: flex;
}
.tile-container {
    margin: 0.5rem;
}

</style>
