<template>
  <div v-if="isPromotion" class="promotion-container">
    <div class="overlay"></div>
    <div class="promotion-item-container">
      <div class="promotion-item" @click="selectPromotion('q')">
        <img class="img" :src="imgURL('q')" />
      </div>
      <div class="promotion-item" @click="selectPromotion('n')">
        <img class="img" :src="imgURL('n')" />
      </div>
      <div class="promotion-item" @click="selectPromotion('b')">
        <img class="img" :src="imgURL('b')" />
      </div>
      <div class="promotion-item" @click="selectPromotion('r')">
        <img class="img" :src="imgURL('r')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PromotionPawn',
  data() {
    return {
      promotionColor: '',
      promotionType: '',
      promotionLocation: [-1, -1],
    };
  },
  computed: {
    boardData(): string[][] {
      return this.$store.state.boardData;
    },
    isPromotion(): boolean {
      return this.$store.state.isPromotion;
    },
  },
  watch: {
    boardData: {
      handler: 'checkPromotion',
      deep: true,
    },
  },
  methods: {
    checkPromotion(): void {
      const firstRow = this.boardData[0];
      const lastRow = this.boardData[this.boardData.length - 1];

      for (let i = 0; i < this.boardData.length; i++) {
        if (firstRow[i] === 'bp') {
          this.$store.commit('setIsPromotion', true);
          this.$store.commit('setTimerPaused',false)
          this.promotionLocation = [0, i];
          this.promotionColor = 'b';
          return
        } else if (lastRow[i] === 'wp') {
          this.$store.commit('setIsPromotion', true);
          this.$store.commit('setTimerPaused',false)
          this.promotionLocation = [this.boardData.length - 1, i];
          this.promotionColor = 'w';
          return
        }
      }

      this.$store.commit('setIsPromotion', false);
    },
    imgURL(type: string): string | undefined {
      const img = this.promotionColor + type;
      return `https://assets-themes.chess.com/image/tlwah/150/${img}.png`;
    },
    selectPromotion(type: string): void {
      const [row, col] = this.promotionLocation;
      if (row !== -1 && col !== -1) {
        const value = this.promotionColor + type;
        this.$store.commit('changeBoardData', {
          row,
          col,
          value,
        });
      }
      this.$store.commit('setIsPromotion', false);
      this.$store.commit('setTimerPaused',true)
    },
  },
});
</script>

<style>
.promotion-item-container {
  position: fixed;
  display: flex;
  flex-direction: row;
  z-index: 1001;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

.promotion-item {
  width: 90px;
  height: 90px;
  border: 1px solid white;
  margin-top: 0.5px;
  z-index: 1001; /* overlay보다 높게 설정 */
  cursor: pointer;
}

.img {
  width: 100%;
  height: 100%;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000;
}
</style>
