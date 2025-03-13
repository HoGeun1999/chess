<template>
  <div class="restart-btn-wrapper">
    <button  class="restart-btn" @click="hadleRestartBtn">새 게임</button>
    <div v-if="restartPopup" class="overlay"></div>
    <div v-if="restartPopup" class="restart-popup">
      <div class="restart-popup-text">현재게임을 포기하시고 <br>새로운 게임을 하시겠습니까?</div>
      <div class="restart-popup-buttons">
        <button @click="handleReStartOKbtn">확인</button>
        <button @click="hadleRestartCancelbtn">취소</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RestartBtn',
  data(){
    return{
      restartPopup: false
    }
  },
  methods: {
    restartGame(): void {
      this.$store.commit('resetGame')
    },
    toggleRestartPopup(): void{
      this.restartPopup = !this.restartPopup
    },
    hadleRestartBtn():void{
      this.toggleRestartPopup()
      this.$store.commit('setTimerPaused',false)
    },
    handleReStartOKbtn(): void{
      this.restartGame()
      this.toggleRestartPopup()
      this.$store.commit('setTimerPaused',true)
    },
    hadleRestartCancelbtn(): void{
      this.toggleRestartPopup()
      this.$store.commit('setTimerPaused',true)      
    },
  }
})

</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 999; 
}

.restart-popup {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 150px;
  background-color: white;
  border: 2px solid black;
  border-radius: 8px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
}

.restart-popup div {
  margin-bottom: 10px;
}

.restart-popup-buttons {
  display: flex;
  justify-content: space-between; 
  width: 100%; 
}

.restart-popup button {
  width: 45%; 
}

.restart-btn {
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 16px;
}

.restart-popup-text{
  text-align: center;
  margin-top: 10px;
}
</style>