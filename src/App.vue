<template>
  <div id="app" @contextmenu="handleRightClick">
      <WinerPopup/>
    <div class="main-left-container">
      <PromotionPawn/>
    </div>
    <div class="main-container">
      <ChessBoard />
    </div>
    <div class="timer-container">
      <GameTimer/>
    </div>
    <div class="bottom-container">
      <GameStartBtn class="btn"/>
      <SetTimerBtn class="btn"/>
      <UndoBtn class="btn"/>
      <RestartBtn class="btn"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ChessBoard from './components/ChessBoard.vue'
import GameTimer from './components/GameTimer.vue';
import GameStartBtn from './components/button/GameStartBtn.vue';
import SetTimerBtn from './components/button/SetTimerBtn.vue';
import UndoBtn from './components/button/UndoBtn.vue';
import RestartBtn from './components/button/RestartBtn.vue';
import PromotionPawn from './components/PromotionPawn.vue';
import WinerPopup from './components/WinerPopup.vue';

export default Vue.extend({
  name: 'App',
  components: {
    ChessBoard,
    GameTimer,
    GameStartBtn,
    SetTimerBtn,
    UndoBtn,
    RestartBtn,
    PromotionPawn,
    WinerPopup,
  },
  methods: {
    handleRightClick(event: MouseEvent): void {
      if(this.isSelected){
        event.preventDefault();
        this.$store.commit('toggleSelection', false);
        this.$store.commit('clearSelectedPiece');
      }
      event.preventDefault();
    }
  },
  computed: {
    isSelected(): boolean {
      return this.$store.state.isSelected;
    },
  },

});
</script>

<style>
#app{
  height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr); 
  grid-template-rows: 1fr 200px; 

  grid-template-areas:
    "main-left-container main-container timer-container"
    "bottom-container bottom-container bottom-container";

  background-color: rgb(55, 45, 45)
  
}
div {
  caret-color: transparent; 
}

.main-container{
  grid-area: main-container;
}

.bottom-container{
  grid-area: bottom-container;
  display: flex;
  gap: 30px
}

.timer-container {
  grid-area: timer-container;
  width: 100%;
  height: 100%;
}

.main-left-container{
  grid-area: main-left-container;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
}

.btn{
  width: 200px;
  height: 50px;
  font-weight: bold;
  font-size: 16px;
}
</style>
