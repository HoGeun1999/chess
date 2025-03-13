<template>
  <div v-if="isTimerSet" class="timer-container">
    <div class="white-timer">
      white timer : {{ whiteTime }}
    </div>
    <div class="timer-description">
      <p>이 타이머는 피셔 룰을 적용하고 있습니다. <br><br> 피셔 룰 설명: 기본시간은 각자 30분입니다. <br>착수를 완료하면 20초를 기본시간에 추가하게 됩니다.<br> 시간을 모두 사용하게 되면 시간패 입니다.</p>
    </div>
    <div class="pause-button-container">
      <PauseTimerBtn @start-timer="startTimer"/>
    </div>
    <div class="black-timer">
      black timer : {{ blackTime }}
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
        this.$store.commit('setGameOverPopup',true);
        this.clearTimers();
      }
    },
    startWhiteTimer() {
      if (this.whiteTime > 0) {
        this.$store.commit('updateWhiteTime', -1);
      } else {
        this.$store.commit('setGameOver', true);
        this.$store.commit('setGameOverPopup',true);
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
      this.$store.commit('clearAllTimers');
    },
  },
})
</script>

<style scoped>
.timer-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto auto 1fr;
  grid-template-areas:
    "white-timer"
    "timer-description"
    "pause-button-container"
    "black-timer";
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  color:white
}

.white-timer {
  grid-area: white-timer;
  font-size: 1.5em;
  font-weight: bold;
}

.timer-description {
  grid-area: timer-description;
  text-align: center;
  padding: 10px;
  font-size: 1em;
  border: 2px solid white;
  border-radius: 5px;
  margin-bottom: 5px;
}

.black-timer {
  grid-area: black-timer;
  font-size: 1.5em;
  font-weight: bold;
}

.pause-button-container {
  grid-area: pause-button-container;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
}

.pause-button-container button {
  padding: 10px 20px;

}
</style>
