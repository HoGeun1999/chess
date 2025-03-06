<template>
  <div id="app">
    <ChessBoard/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ChessBoard from './components/ChessBoard.vue'

export default Vue.extend({
  name: 'App',
  components: {
    ChessBoard,
  }
});
</script>

<style>
</style>
