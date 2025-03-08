<template>
  <div v-if="isTimerSet">
    <div class="timer">
      white timer : {{ whiteTime }}
    </div>
    <div>
      black timer : {{ blackTime }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GameTimer',
  computed: {
    isTimerSet(): boolean {
      return this.$store.state.isTimerSet;
    },
    whiteTime(): number {
      return this.$store.state.whiteTime;
    },
    blackTime(): number {
      return this.$store.state.blackTime;
    },
  },
  watch: {
    isTimerSet(newVal) {
      if (newVal) {
        this.startTimer();
      } else {
        this.clearTimers();
      }
    },
  },
  methods: {
    startBlackTimer() {
      if (this.blackTime > 0) {
        this.$store.commit('updateBlackTime', -1);
      } else {
        this.$store.commit('setGameOver', true);
        alert('백 승');
        this.clearTimers();
      }
    },
    startWhiteTimer() {
      if (this.whiteTime > 0) {
        this.$store.commit('updateWhiteTime', -1);
      } else {
        this.$store.commit('setGameOver', true);
        alert('흑 승');
        this.clearTimers();
      }
    },
    startTimer() {
      const timerId = setInterval(() => {
        const turnCount = this.$store.state.turnCount;
        
        if(turnCount !== 0 && !this.$store.state.isGameOver){
          if (turnCount % 2 === 0) {
            this.startBlackTimer();
          } else {
            this.startWhiteTimer();
          }
        }

      }, 1000);
      this.$store.commit('addTimer', timerId)
    },
    clearTimers() {
      console.log(this.$store.state.timers)
      this.$store.commit('clearAllTimers');
    },
  },
})
</script>

<style scoped>
/* 스타일 추가 */
</style>
