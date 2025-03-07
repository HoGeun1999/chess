<template>
  <div class="board-block" :class="boardBlockClass" @click="handleOnClick">
      <img v-if="imgURL" class="img" :src="imgURL" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// const knightMove: number[][]= [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]

export default Vue.extend({
  name: 'BoardBlock',
  methods: {
    handleOnClick() {
      const isBlackTurn = this.turnCount % 2 === 0;
      const isWhiteTurn = !isBlackTurn;
      const pieceColor = this.value[0];
  
      if(!this.isSelected){
        if((isBlackTurn&&pieceColor === 'b') || (isWhiteTurn && pieceColor === 'w')){
          this.$store.commit('setSelectedPiece', { row: this.rowIndex, col: this.columnIndex, value: this.value });
          this.$store.commit('toggleSelection', true);
        }
      }
      else{
        if(this.value === "" || pieceColor !== this.selectedPiece.value[0]){
          // 여기에 그 말이 움직일 수 있는 조건인지 확인하고 movePiece실행하도록
          
          this.$store.commit('movePiece',{
            from: {row: this.selectedPiece.row, col:this.selectedPiece.col},
            to:{row:this.rowIndex,col:this.columnIndex}}
          )
          this.$store.commit('toggleSelection', false);
          this.$store.commit('nextTurn');
          this.$store.commit('clearSelectedPiece');
        }
        else{
          this.$store.commit('setSelectedPiece', { row: this.rowIndex, col: this.columnIndex, value: this.value });
        }
      }
    }
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    boardBlockClass(): string {
      const baseClass = 'board-block';
      const evenOrOddClass = (this.rowIndex + this.columnIndex) % 2 === 0 ? 'even' : 'odd';
      const isSelectedClass = this.selectedPiece && 
                            this.selectedPiece.row === this.rowIndex && 
                            this.selectedPiece.col === this.columnIndex 
                            ? 'selected' 
                            : '';
      return `${baseClass} ${evenOrOddClass} ${isSelectedClass}`;
    },
    imgURL(): string | undefined {
      if (this.value !== '') {
        return `https://assets-themes.chess.com/image/tlwah/150/${this.value}.png`;
      } else {
        return undefined;
      }
    },
    turnCount(): number {
      return this.$store.state.turnCount;
    },
    isSelected(): boolean {
      return this.$store.state.isSelected;
    },
    selectedPiece(): any {
      return this.$store.state.selectedPiece;
    },
    boardData(): string[][] {
      return this.$store.state.boardData; 
    },
  },
});
</script>

<style scoped>
.board-block {
  width: 90px;  
  height: 90px; 
}

.board-block.even {
  background-color: #d18b47; 
}

.board-block.odd {
  background-color: #ffce9e; 
}

.board-block.even.selected,
.board-block.odd.selected {
  background-color: green; 
}

.img {
  width: 100%;
  height: 100%;
}
</style>
