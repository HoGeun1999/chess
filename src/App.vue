<template>
  <div id="app" @contextmenu="handleRightClick">
    <ChessBoard/>
    <div class="btn-container">
      <SetTimerBtn/>
      <UndoBtn/>
      <RestartBtn/>
    </div>
    <GameTimer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ChessBoard from './components/ChessBoard.vue'
import UndoBtn from './components/button/UndoBtn.vue';
import RestartBtn from './components/button/RestartBtn.vue';
import SetTimerBtn from './components/button/SetTimerBtn.vue';
import GameTimer from './components/GameTimer.vue';

export default Vue.extend({
  name: 'App',
  components: {
    ChessBoard,
    UndoBtn,
    RestartBtn,
    SetTimerBtn,
    GameTimer,
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
div {
  caret-color: transparent; 
}
</style>
