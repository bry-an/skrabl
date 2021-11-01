<template>
<div :class="['tile', {'clicked': clicked}]" @click="onClick">
          {{tile.letter.toUpperCase()}}
          <span class="value">{{tile.val}}</span>
      </div>
</template>

<script>
export default {
    name: 'SkrablTile',
    data() {
        return {
            tiles: [],
        };
    },
    props: {
        tile: {
            type: Object,
            default: () => ({ letter: '', val: '' }),
        },
        clicked: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClick() {
            this.$emit('tile-clicked', this.tile);
        },
    },
};
</script>

<style lang="scss" scoped>
.tile {
    background-color: #cb997e;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 0.25rem;
    min-width: 1.5rem;
    min-height: 1.5rem;
    font-weight: bold;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    -webkit-user-select: none;/* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    cursor: pointer;

    &.clicked {
        background-color: #454545;
    }
}
.value {
    position: absolute;
    top: 60%;
    left: 60%;
    font-size: 0.75rem;
}
</style>
