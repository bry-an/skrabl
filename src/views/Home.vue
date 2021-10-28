<template>
    <div class="table">
        <SkrablGrid />
        <SkrablDeck />
        <button @click="submitTurn">Submit</button>
    </div>
</template>

<script>
import SkrablDeck from '../components/SkrablDeck.vue';
import SkrablGrid from '../components/SkrablGrid.vue';
import { submitTurn } from '../refs/gameState.js';

export default {
  setup() {
    return { submitTurn };
  },
  components: {
    SkrablDeck,
    SkrablGrid,
  },
};
</script>
<style lang="scss" scoped>
.table {
    margin: auto;
    width: 60%;
}

</style>
