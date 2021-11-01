<template>
  <div class="tiles">
      <SkrablTile
      class="tile-container"
        v-for="tile in tileDeck"
        @tile-clicked="setSelectedTile"
        :tile="tile"
        :clicked="selectedTile.key === tile.key"
        :key="tile.key"/>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import {
    initializeDeck, tileDeck, selectedTile, setSelectedTile,
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
        return { tileDeck, setSelectedTile, selectedTile };
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
