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
    blackTime: 300,
    whiteTime: 300,
    timers: [],
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
          state.whiteTime += 20;
        } else {
          state.blackTime += 20;
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
      state.boardDataHistory = [];
      state.isTimerSet = false;
      state.blackTime = 300;
      state.whiteTime = 300;
      // state.timers = [];   // 여기 이걸 하면 문제가 생김 왜지?
      // 아마 기존 timers가 가르키던 주소에 timer들이 들어가있는데 clear하기전에
      // 먼저 resetGame을 실행하고 새로운 빈 주소를 가르키게 되서 타이머가 삭제가 안된듯
    },
  },
});

export default store;
