<template>
  <div class="chess-board">
    <div v-for="(row, rowIndex) in boardData" :key="rowIndex" class="row">
      <BoardBlock 
        v-for="(board, colIndex) in row" 
        :key="`${rowIndex}-${colIndex}`" 
        :value="board" 
        :rowIndex="rowIndex" 
        :columnIndex="colIndex" 
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BoardBlock from './BoardBlock.vue';

export default Vue.extend({
  name: 'ChessBoard',
  components: {
    BoardBlock,
  },
  computed: {
    boardData(): string[][] {
      return this.$store.state.boardData;
    },
  },
});
</script>

<style scoped>
.chess-board {
  border: 1px solid black;
  width: 720px;
  height: 720px;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  width: 100%;
}

</style>
