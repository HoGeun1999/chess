<template>
  <div>
    <button  class="restart-btn" @click="toggleRestartPopup">새 게임</button>
    <div v-if="restartPopup" class="restart-popup">
      <div>설명</div>
      <button @click="handleReStartOKbtn">확인</button>
      <button @click="toggleRestartPopup">취소</button>
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
    handleReStartOKbtn(): void{
      this.restartGame()
      this.toggleRestartPopup()
    }
  },

})

</script>

<style>
</style>