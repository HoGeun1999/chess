<template>
  <button class="game-start-btn" @click="startGame">게임 시작</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GameStartBtn',
  methods: {
    startGame():void{
      this.$store.commit('setGameStarted',true);
    },
  },
  computed: {
  }
})
</script>

<style>
</style>