<template>
  <div class="restart-btn-wrapper">
    <button  class="restart-btn" @click="toggleRestartPopup">새 게임</button>
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
    }
  },

})

</script>

<style>
.restart-btn-wrapper {
  width: 100px;
  height: 50px;
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
  box-sizing: border-box; /* 패딩을 포함하여 전체 크기 계산 */
}

.restart-popup div {
  margin-bottom: 10px; /* 텍스트와 버튼 사이 간격 */
}

.restart-popup-buttons {
  display: flex;
  justify-content: space-between; /* 좌우로 분리 */
  width: 100%; /* 부모 크기에 맞게 설정 */
}

.restart-popup button {
  width: 45%; /* 버튼 너비 설정 */
}

.restart-btn {
  width: 100%;
  height: 100%;
}

.restart-popup-text{
  text-align: center;
  margin-top: 10px;
}
</style>