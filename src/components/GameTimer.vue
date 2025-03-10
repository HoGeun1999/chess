<template>
  <div v-if="isTimerSet" class="timer-container">
    <div>
      <p>이 타이머는 피셔 룰을 적용하고 있습니다.</p>
      <p>피셔 룰 설명: 기본시간은 각자 30분입니다. 착수를 완료하면 20초를 기본시간에 추가하게 됩니다. 시간을 모두 사용하게 되면 시간패 입니다.</p>
    </div>
    <div class="timer">
      white timer : {{ whiteTime }}
    </div>
    <div>
      black timer : {{ blackTime }}
    </div>
    <div class="pause-button-container">
      <PauseTimerBtn @start-timer="startTimer"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PauseTimerBtn from './button/PauseTimerBtn.vue';

export default Vue.extend({
  name: 'GameTimer',
  components: {
    PauseTimerBtn,
  },
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
          if(this.$store.state.isTimerPaused){
            if (turnCount % 2 === 0) {
            this.startBlackTimer();
            } else {
              this.startWhiteTimer();
            }
          }
          else{
            return
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
