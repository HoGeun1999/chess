import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State{
  turnCount : number;
  isSelected : boolean;
  selectedPiece: { row: number; col: number; value: string } | null;
  boardData: string[][];
}

const store = new Vuex.Store<State>({
  state: {
    turnCount: 0,
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
  },
  mutations: {
    nextTurn(state) {
      state.turnCount++;
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
    }
  },
});

export default store;
