<template>
  <button class="undo-btn" @click="onClickUndoBtn">되돌리기</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'UndoBtn',
  methods: {
    onClickUndoBtn() {
      if (this.turnCount>0){
        this.$store.commit('preTurn');
        this.$store.commit('undoBoardData');
      }
      return
    }
  },
  computed:{
    turnCount(): number {
      return this.$store.state.turnCount;
    },
  }
})


</script>

<style>
</style>