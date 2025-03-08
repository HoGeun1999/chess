<template>
  <button class="undo-btn" @click="onClickUndoBtn">되돌리기</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'UndoBtn',
  methods: {
    onClickUndoBtn(): void {
      if (this.turnCount>0){
        this.$store.commit('preTurn');
        if(this.isSelected){
          this.$store.commit('clearSelectedPiece')
          this.$store.commit('toggleSelection');
        } 
        this.$store.commit('undoBoardData');
        if(this.isGameOver) this.$store.commit('setGameOver', false)
      }
      return
    }
  },
  computed:{
    turnCount(): number {
      return this.$store.state.turnCount;
    },
    isGameOver(): boolean {
      return this.$store.state.isGameOver;
    },
    isSelected(): boolean {
      return this.$store.state.isSelected;
    }
  }
})

</script>

<style>
</style>