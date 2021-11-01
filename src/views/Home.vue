<template>
    <div class="table">
        <SkrablGrid />
        <SkrablDeck />
        <button
            :class="[isValidTurn
                ? 'blue-button'
                : 'red-button',
                'btn']"
            :disabled="!isValidTurn"
            @click="submitTurn">
            Submit
        </button>
    </div>
</template>

<script>
import SkrablDeck from '../components/SkrablDeck.vue';
import SkrablGrid from '../components/SkrablGrid.vue';
import { submitTurn, isValidTurn } from '../refs/gameState.js';

export default {
    setup() {
        return { submitTurn, isValidTurn };
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
.red-button {
    background-color: red;
}
.blue-button {
    background-color: blue;
}

.btn {
    padding: 1rem;
    color: white;
    font-weight: bold;
}

</style>
