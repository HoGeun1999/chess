<template>
  <div class="board-block" :class="boardBlockClass" @click="handleOnClick">
      <img v-if="imgURL" class="img" :src="imgURL" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  name: 'BoardBlock',
  data() {
    return {
      Move: {
        'r': [[1,0],[0,1],[-1,0],[0,-1]],
        'b': [[1,1],[1,-1],[-1,1],[-1,-1]],
        'q': [[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]],
        'k': [[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]],
      } as Record<string, number[][]>,
    };
  },
  methods: {
    handleOnClick():void {
      if (!this.$store.state.isGameStarted || this.$store.state.isGameOver)  {
        return 
      }
      const isBlackTurn = this.turnCount % 2 === 0;
      const isWhiteTurn = !isBlackTurn;
      const pieceColor = this.value[0];

      if(!this.isSelected){
        if((isBlackTurn&&pieceColor === 'b') || (isWhiteTurn && pieceColor === 'w')){
          this.$store.commit('setSelectedPiece', { row: this.rowIndex, col: this.columnIndex, value: this.value });
          this.$store.commit('toggleSelection');
        }
      }
      else{
        if(this.value === "" || pieceColor !== this.selectedPiece.value[0]){
          if(this.selectedPiece.value.includes("n")){
            if(this.moveCheckKnight()){
              this.playTurn()
              if(this.$store.state.isTimerSet){
                this.$store.commit('giveFischerTime')
              }              
            }
            else{
              return
            }
          } 
          else if(this.selectedPiece.value.includes("p")){
            if(this.moveCheckPawn()){
              this.playTurn()
              if(this.$store.state.isTimerSet){
                this.$store.commit('giveFischerTime')
              }
            }
            else{
              return
            }
          }
          else if(this.moveCheckOthers(this.selectedPiece.value[1])){
            this.playTurn()
            if(this.$store.state.isTimerSet){
                this.$store.commit('giveFischerTime')
              }
          }
          this.endGame()
        }
        else{
          this.$store.commit('setSelectedPiece', { row: this.rowIndex, col: this.columnIndex, value: this.value });
        }
      }
    },
    moveCheckKnight():boolean{
      const knightMove: number[][]= [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]
      const moveLocation: number[] = [this.rowIndex, this.columnIndex]
      for(let i = 0; i < knightMove.length; i++){
        const Location: number[] = [this.selectedPiece.row + knightMove[i][0], this.selectedPiece.col + knightMove[i][1]]
        if(Location[0] === moveLocation[0] && Location[1] === moveLocation[1]){
          return true
        }
      }
      return false
    },
    moveCheckPawn(): boolean {
      const isBlackPawn = this.selectedPiece.value[0] === 'b';
      const direction = isBlackPawn ? -1 : 1;
      const startingRow = isBlackPawn ? 6 : 1;
      const frontRow = this.selectedPiece.row + direction;
      if (this.rowIndex === frontRow && this.columnIndex === this.selectedPiece.col) {
        if (this.boardData[frontRow][this.columnIndex] === "") {
          return true;
        }
      }

      if (this.selectedPiece.row === startingRow && this.rowIndex === frontRow + direction && this.columnIndex === this.selectedPiece.col) {
        if (this.boardData[frontRow][this.columnIndex] === "" && this.boardData[frontRow + direction][this.columnIndex] === "") {
          return true;
        }
      }

      if (this.rowIndex === frontRow && (this.columnIndex === this.selectedPiece.col + 1 || this.columnIndex === this.selectedPiece.col - 1)) {
        const targetPiece = this.boardData[this.rowIndex][this.columnIndex];
        if (targetPiece && targetPiece[0] !== this.selectedPiece.value[0]) {
          return true;
        }
      }
      return false;
    },
    moveCheckOthers(pieceType: string): boolean {
      if (!this.Move[pieceType]) return false; 

      const directions = this.Move[pieceType]; 
      const startRow = this.selectedPiece.row;
      const startCol = this.selectedPiece.col;
      const targetRow = this.rowIndex;
      const targetCol = this.columnIndex;

      if (pieceType === 'k') {
        for (const [rowDir, colDir] of directions) {
          const newRow = startRow + rowDir;
          const newCol = startCol + colDir;
          if (newRow === targetRow && newCol === targetCol) {
            return true; 
          }
        }
        return false; 
      }

      for (const [rowDir, colDir] of directions) {
        let currentRow = startRow + rowDir;
        let currentCol = startCol + colDir;

        while (this.isWithinBounds(currentRow, currentCol)) {
          if (currentRow === targetRow && currentCol === targetCol) {
            return true;
          }
          if (this.boardData[currentRow][currentCol] !== "") {
            break; 
          }
          currentRow += rowDir;
          currentCol += colDir;
        }
      }
      return false; 
    },
    isWithinBounds(row: number, col: number): boolean {
      return row >= 0 && row < 8 && col >= 0 && col < 8; 
    },
    playTurn():void{
      this.$store.commit('saveBoardData')
      this.$store.commit('movePiece',{
            from: {row: this.selectedPiece.row, col:this.selectedPiece.col},
            to:{row:this.rowIndex,col:this.columnIndex}})
      this.$store.commit('toggleSelection');
      this.$store.commit('nextTurn');
      this.$store.commit('clearSelectedPiece');
    },
    endGame():void {
      let hasBlackKing = false; 
      let hasWhiteKing = false;

      for (let i = 0; i < this.boardData.length; i++) {
        for (let j = 0; j < this.boardData[i].length; j++) {
          if (this.boardData[i][j] === "bk") {
            hasBlackKing = true;
          }
          if (this.boardData[i][j] === "wk") {
            hasWhiteKing = true;
          }
        }
      }
      if (!hasBlackKing) {
        this.$store.commit('setGameOver', true); 
        this.$store.commit('setGameOverPopup',true);
        this.$store.commit('clearAllTimers');
        return 
      }
      if (!hasWhiteKing) {
        this.$store.commit('setGameOver', true); 
        this.$store.commit('setGameOverPopup',true);
        this.$store.commit('clearAllTimers');
        return 
      }
      return
    },
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
    boadDataHistory(): any{
      return this.$store.state.boardDataHistory;
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
