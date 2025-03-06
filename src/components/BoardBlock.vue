<template>
  <div class="board-block">
    <div :class="evenOrOdd" @click="handleOnClick">
      <img class="img" :src="imgURL" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  name: 'BoardBlock',
  methods: {
    handleOnClick() {
      console.log('click')
    }
  },
  props: {
    value:{
      type: String,
      required: true,
    },
    index:{
      type: Number,
      required: true,
    }
  },
  computed:{
    evenOrOdd(): String{
      if (Math.floor(this.index / 8) % 2 === this.index % 2) {
        return 'board-block-even';
      } else {
        return 'board-block-odd';
      }
    },
    imgURL(): String | undefined{
      if(this.value !== ''){
        return `https://assets-themes.chess.com/image/tlwah/150/${this.value}.png`;
      }
      else{
        return undefined
      }
    }
  },
});
</script>

<style scoped>
.board-block{
  width: 90px;
  height: 90px;
}
.board-block-even{
  width: 100%;
  height: 100%;
  background-color: green;
}

.board-block-odd{
  width: 100%;
  height: 100%;
  background-color: white;
}

.img{
  width: 100%;
  height: 100%;
}
</style>