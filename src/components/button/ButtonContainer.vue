<template>
  <div class="btn-container">
    <GameStartBtn />
    <SetTimerBtn />
    <UndoBtn />
    <RestartBtn />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UndoBtn from './UndoBtn.vue';
import RestartBtn from './RestartBtn.vue';
import SetTimerBtn from './SetTimerBtn.vue';
import GameStartBtn from './GameStartBtn.vue';

export default Vue.extend({
  name: 'ButtonContainer',
  data(){
    return {

    }
  },
  components: {
    UndoBtn,
    RestartBtn,
    SetTimerBtn,
    GameStartBtn,
  },
})
</script>

<style>
</style>