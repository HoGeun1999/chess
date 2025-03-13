<template>
  <button class="set-timer-btn" @click="setTimer">타이머 추가</button>
</template>


<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SetTimerBtn',
  methods: {
    setTimer(){
      if(!this.$store.state.isTimerSet){
        this.$store.commit('setTimerSet',true)  
      }
      else{
        this.$store.commit('setTimerSet',false)  
      }
    }
  },

})

</script>

<style>
</style>