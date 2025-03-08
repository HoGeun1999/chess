<template>
  <button class="restart-btn" @click="restartGame">새 게임</button>
</template>


<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RestartBtn',
  methods: {
    restartGame(): void {
      this.$store.commit('resetGame')
    }
  },

})

</script>

<style>
</style>