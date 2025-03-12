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
  isTimerSet : boolean;
  isGameStarted : boolean;
  blackTime: number;
  whiteTime: number;
  timers: number[];
  isTimerPaused: boolean;
  isPromotion: boolean;
}

const store = new Vuex.Store<State>({
  state: {
    turnCount: 0,
    isGameOver: false,
    isSelected: false,
    isGameStarted: false,
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
    isTimerSet: false,
    blackTime: 20,
    whiteTime: 20,
    timers: [],
    isTimerPaused: true,
    isPromotion: false,
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
    changeBoardData(state, {row, col, value}){
      Vue.set(state.boardData[row], col, value);
    },
    setGameOver(state, payload: boolean) {
      state.isGameOver = payload;
    },
    setGameStarted(state, payload: boolean) {
      state.isGameStarted = payload;
    },
    saveBoardData(state) {
      const copiedBoardData = JSON.parse(JSON.stringify(state.boardData));
      state.boardDataHistory.push(copiedBoardData);
    },
    undoBoardData(state) {
      state.boardData = state.boardDataHistory.pop()!;
    },
    updateWhiteTime(state, payload: number) {
      state.whiteTime = state.whiteTime + payload;
    },
    updateBlackTime(state, payload: number) {
      state.blackTime = state.blackTime + payload;
    },
    setTimerSet(state, payload: boolean) {
      state.isTimerSet = payload;
    },
    giveFischerTime(state):void {
      const turnCount = state.turnCount;
      if (turnCount !== 1){
        if (turnCount % 2 === 0) {
          state.whiteTime += 0;
        } else {
          state.blackTime += 0;
        }
      }
    },
    addTimer(state, timerId: number) {
      state.timers.push(timerId);
    },
    clearAllTimers(state) {
      state.timers.forEach((timerId) => clearInterval(timerId));
      state.timers = [];
    },
    setTimerPaused(state, payload: boolean) {
      state.isTimerPaused = payload;
    },
    setIsPromotion(state, payload: boolean) {
      state.isPromotion = payload;
    },
    resetGame(state) {
      state.turnCount = 0;
      state.isGameOver = false;
      state.isSelected = false;
      state.isGameStarted = false;
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
      state.boardDataHistory.length = 0;
      state.isTimerSet = false;
      state.blackTime = 10;
      state.whiteTime = 10;
      state.isTimerPaused = true;
    },
  },
});

export default store;
