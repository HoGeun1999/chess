<template>
  <div class="board-block" :class="boardBlockClass" @click="handleOnClick">
      <img class="img" :src="imgURL" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const knightMove: number[][]= [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]

export default Vue.extend({
  name: 'BoardBlock',
  methods: {
    handleOnClick() {
      if(this.value === 'wn' || this.value == 'bn'){
        console.log(knightMove)
      }
    }
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    boardBlockClass(): string {
      const baseClass = 'board-block';
      const evenOrOddClass = (this.rowIndex + this.columnIndex) % 2 === 0 ? 'even' : 'odd';
      return `${baseClass} ${evenOrOddClass}`;
    },
    imgURL(): string | undefined {
      if (this.value !== '') {
        return `https://assets-themes.chess.com/image/tlwah/150/${this.value}.png`;
      } else {
        return undefined;
      }
    },
  },
});
</script>

<style scoped>
.board-block {
  width: 90px;  
  height: 90px; 
}

.board-block.even {
  background-color: #d18b47; 
}

.board-block.odd {
  background-color: #ffce9e; 
}

.img {
  width: 100%;
  height: 100%;
}
</style>
