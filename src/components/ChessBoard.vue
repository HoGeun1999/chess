<template>
  <div class="chess-board"> 
    <BoardBlock v-for="(board,index) in flatBoardData" :key="index" :value="board" :index="index"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BoardBlock from './BoardBlock.vue';

const boardData: string[][] = [
  ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
  ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
  ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
];

const flatBoardData: string[] = boardData.flat();

export default Vue.extend({
  name: 'ChessBoard',
  components: {
    BoardBlock,
  },
  data() {
    return {
      flatBoardData,
    };
  },
});
</script>

<style scoped>
.chess-board{
  border: 1px solid black;
  width: 720px;
  height: 720px;
  display: grid;
  grid-template-columns: repeat(8, 90px);
  grid-template-rows: repeat(8, 90px);
}
</style>