<template>
  <button class="pause-button" @click="pauseTimer">{{ isTimerPaused ? '타이머 정지' : '타이머 시작' }}</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PauseTimerBtn',
  methods: {
    pauseTimer(): void {
      if (this.$store.state.turnCount != 0){
        if(this.isTimerPaused)
        this.$store.commit('setTimerPaused',false)
      else
        this.$store.commit('setTimerPaused',true)
      }
    }
  },
  computed: {
    isTimerPaused(): boolean {
      return this.$store.state.isTimerPaused;
    }
  }
})

</script>


<style>
.pause-button {
  width: 120px;
  height: 60px;
}
</style>