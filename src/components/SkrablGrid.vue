<template>
  <div class="grid">
      <div v-for="(row, i) in grid" class="grid-row" :key="i">
          <div v-for="tile in row" class="grid-tile" :key="tile.key" @click="assignTile(tile.key)">
          <div class="absolute">{{tile.key}}</div>
              <SkrablTile v-if="tile.placedTile" :tile="tile.placedTile"/>
          </div>
      </div>
  </div>
</template>

<script>
import { selectedTile, grid, assignTile } from '../refs/gameState.js';
import SkrablTile from './SkrablTile.vue';

export default {
    setup() {
        return { grid, assignTile, selectedTile };
    },
    components: {
        SkrablTile,
    },
};

</script>
<style lang="scss" scoped>
.absolute {
    position: absolute;
}
.grid-row {
    display: flex;
}
.grid-tile {
    min-width: 3.5rem;
    min-height: 3.5rem;
    border: 1px solid #6b705c;
    background-color: #ffe8d6;
    cursor: pointer;
}

</style>
