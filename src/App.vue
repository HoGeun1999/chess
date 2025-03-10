<template>
  <div id="app" @contextmenu="handleRightClick">
    <ChessBoard/>
    <ButtonContainer/>
    <GameTimer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ChessBoard from './components/ChessBoard.vue'
import GameTimer from './components/GameTimer.vue';
import ButtonContainer from './components/button/ButtonContainer.vue';

export default Vue.extend({
  name: 'App',
  components: {
    ChessBoard,
    GameTimer,
    ButtonContainer,
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
