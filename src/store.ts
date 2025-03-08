import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State{
  turnCount : number;
  isGameOver : boolean;
  isSelected : boolean;
  selectedPiece: { row: number; col: number; value: string } | null;
  boardData: string[][];
  boardDataHistory: string[][][];
}

const store = new Vuex.Store<State>({
  state: {
    turnCount: 0,
    isGameOver: false,
    isSelected: false,
    selectedPiece: null,
    boardData: [
      ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
      ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
      ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ],
    boardDataHistory: [],
  },
  mutations: {
    nextTurn(state) {
      state.turnCount++;
    },
    preTurn(state) {
      state.turnCount--;
    },
    setSelectedPiece(state, { row, col, value }) {
      state.selectedPiece = { row, col, value };
    },
    clearSelectedPiece(state) {
      state.selectedPiece = null;
    },
    toggleSelection(state) {
      state.isSelected = !state.isSelected;
    },
    movePiece(state, { from, to }) {
      const piece = state.boardData[from.row][from.col];
      Vue.set(state.boardData[from.row], from.col, ''); 
      Vue.set(state.boardData[to.row], to.col, piece); 
    },
    setGameOver(state, payload: boolean) {
      state.isGameOver = payload;
    },
    saveBoardData(state) {
      const copiedBoardData = JSON.parse(JSON.stringify(state.boardData));  // 깊은 복사
      state.boardDataHistory.push(copiedBoardData);
    },
    undoBoardData(state) {
      state.boardData = state.boardDataHistory.pop()!;
    },
    resetGame(state) {
      state.turnCount = 0;
      state.isGameOver = false;
      state.isSelected = false;
      state.selectedPiece = null;
      state.boardData = [
        ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
        ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
        ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
      ];
      state.boardDataHistory = [];
    },
  },
});

export default store;
