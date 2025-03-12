<template>
  <div v-if="isShowGameOverPopup" class="winer-popup-container">
    <div class="winer-message">{{ winnerMessage }}</div>
    <button @click="closePopup">확인</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WinerPopup',
  computed:{
    isShowGameOverPopup(): boolean {
      return this.$store.state.isShowGameOverPopup;
    },
    turnCount(): number {
      return this.$store.state.turnCount;
    },
    winnerMessage(): string {
      return this.turnCount % 2 === 0 ? '백팀 승리' : '흑팀 승리';
    }
  },
  methods:{
    closePopup(){
      this.$store.commit('setGameOverPopup',false);
    },
  }
})

</script>

<style>
.winer-popup-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid white;
  border-radius: 5px;
  background-color: rgb(80, 60, 60);
  width: 240px;
  height: 120px;
  color: white;
  font-size: 30px;
}

button{
  width: 60px;
  height: 30px;
  margin-top: 10px;
}

</style>