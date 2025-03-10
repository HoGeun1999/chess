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
    blackTime: 10,
    whiteTime: 10,
    timers: [],
    isTimerPaused: true,
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
      // state.boardDataHistory = []; // 여긴 이렇게 해도 문제는 없다.
      // 빈 배열이 필요하고 바뀐 주소로 연결이 되니까 작동자체는 문제없음.
      // 하지만 메모리상으로는 이전의 boardDataHistory가 남아있음 
      // gabage collector가 작동하면 그마저도 지워지나?
      // 참조가 끊어져서 GC가 알아서 처리해준다.
      state.isTimerSet = false;
      state.blackTime = 10;
      state.whiteTime = 10;
      // state.timers = [];   // 여기 이걸 하면 문제가 생김 왜지?
      // 아마 기존 timers가 가르키던 주소에 timer들이 들어가있는데 clear하기전에
      // 먼저 resetGame을 실행하고 새로운 빈 주소를 가르키게 되서 타이머가 삭제가 안된듯
      state.isTimerPaused = true;
    },
  },
});

export default store;
