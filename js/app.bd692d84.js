(function(){"use strict";var t={8629:function(t,e,s){var i=s(2856),r=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{attrs:{id:"app"},on:{contextmenu:t.handleRightClick}},[e("WinerPopup"),e("div",{staticClass:"main-left-container"},[e("PromotionPawn")],1),e("div",{staticClass:"main-container"},[e("ChessBoard")],1),e("div",{staticClass:"timer-container"},[e("GameTimer")],1),e("div",{staticClass:"bottom-container"},[e("GameStartBtn",{staticClass:"btn"}),e("SetTimerBtn",{staticClass:"btn"}),e("UndoBtn",{staticClass:"btn"}),e("RestartBtn",{staticClass:"btn"})],1)],1)},o=[],n=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"chess-board"},t._l(t.boardData,(function(s,i){return e("div",{key:i,staticClass:"row"},t._l(s,(function(t,s){return e("BoardBlock",{key:`${i}-${s}`,attrs:{value:t,rowIndex:i,columnIndex:s}})})),1)})),0)},a=[],c=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"board-block",class:t.boardBlockClass,on:{click:t.handleOnClick}},[t.imgURL?e("img",{staticClass:"img",attrs:{src:t.imgURL}}):t._e()])},l=[],m=i.Ay.extend({name:"BoardBlock",data(){return{Move:{r:[[1,0],[0,1],[-1,0],[0,-1]],b:[[1,1],[1,-1],[-1,1],[-1,-1]],q:[[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]],k:[[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]}}},methods:{handleOnClick(){if(!this.$store.state.isGameStarted||this.$store.state.isGameOver)return;const t=this.turnCount%2===0,e=!t,s=this.value[0];if(this.isSelected)if(""===this.value||s!==this.selectedPiece.value[0]){if(this.selectedPiece.value.includes("n")){if(!this.moveCheckKnight())return;this.playTurn(),this.$store.state.isTimerSet&&this.$store.commit("giveFischerTime")}else if(this.selectedPiece.value.includes("p")){if(!this.moveCheckPawn())return;this.playTurn(),this.$store.state.isTimerSet&&this.$store.commit("giveFischerTime")}else this.moveCheckOthers(this.selectedPiece.value[1])&&(this.playTurn(),this.$store.state.isTimerSet&&this.$store.commit("giveFischerTime"));this.endGame()}else this.$store.commit("setSelectedPiece",{row:this.rowIndex,col:this.columnIndex,value:this.value});else(t&&"b"===s||e&&"w"===s)&&(this.$store.commit("setSelectedPiece",{row:this.rowIndex,col:this.columnIndex,value:this.value}),this.$store.commit("toggleSelection"))},moveCheckKnight(){const t=[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]],e=[this.rowIndex,this.columnIndex];for(let s=0;s<t.length;s++){const i=[this.selectedPiece.row+t[s][0],this.selectedPiece.col+t[s][1]];if(i[0]===e[0]&&i[1]===e[1])return!0}return!1},moveCheckPawn(){const t="b"===this.selectedPiece.value[0],e=t?-1:1,s=t?6:1,i=this.selectedPiece.row+e;if(this.rowIndex===i&&this.columnIndex===this.selectedPiece.col&&""===this.boardData[i][this.columnIndex])return!0;if(this.selectedPiece.row===s&&this.rowIndex===i+e&&this.columnIndex===this.selectedPiece.col&&""===this.boardData[i][this.columnIndex]&&""===this.boardData[i+e][this.columnIndex])return!0;if(this.rowIndex===i&&(this.columnIndex===this.selectedPiece.col+1||this.columnIndex===this.selectedPiece.col-1)){const t=this.boardData[this.rowIndex][this.columnIndex];if(t&&t[0]!==this.selectedPiece.value[0])return!0}return!1},moveCheckOthers(t){if(!this.Move[t])return!1;const e=this.Move[t],s=this.selectedPiece.row,i=this.selectedPiece.col,r=this.rowIndex,o=this.columnIndex;if("k"===t){for(const[t,n]of e){const e=s+t,a=i+n;if(e===r&&a===o)return!0}return!1}for(const[n,a]of e){let t=s+n,e=i+a;while(this.isWithinBounds(t,e)){if(t===r&&e===o)return!0;if(""!==this.boardData[t][e])break;t+=n,e+=a}}return!1},isWithinBounds(t,e){return t>=0&&t<8&&e>=0&&e<8},playTurn(){this.$store.commit("saveBoardData"),this.$store.commit("movePiece",{from:{row:this.selectedPiece.row,col:this.selectedPiece.col},to:{row:this.rowIndex,col:this.columnIndex}}),this.$store.commit("toggleSelection"),this.$store.commit("nextTurn"),this.$store.commit("clearSelectedPiece")},endGame(){let t=!1,e=!1;for(let s=0;s<this.boardData.length;s++)for(let i=0;i<this.boardData[s].length;i++)"bk"===this.boardData[s][i]&&(t=!0),"wk"===this.boardData[s][i]&&(e=!0);return t&&e?void 0:(this.$store.commit("setGameOver",!0),this.$store.commit("setGameOverPopup",!0),void this.$store.commit("clearAllTimers"))}},props:{value:{type:String,required:!0},rowIndex:{type:Number,required:!0},columnIndex:{type:Number,required:!0}},computed:{boardBlockClass(){const t="board-block",e=(this.rowIndex+this.columnIndex)%2===0?"even":"odd",s=this.selectedPiece&&this.selectedPiece.row===this.rowIndex&&this.selectedPiece.col===this.columnIndex?"selected":"";return`${t} ${e} ${s}`},imgURL(){return""!==this.value?`https://assets-themes.chess.com/image/tlwah/150/${this.value}.png`:void 0},turnCount(){return this.$store.state.turnCount},isSelected(){return this.$store.state.isSelected},selectedPiece(){return this.$store.state.selectedPiece},boardData(){return this.$store.state.boardData},boadDataHistory(){return this.$store.state.boardDataHistory}}}),u=m,h=s(1656),d=(0,h.A)(u,c,l,!1,null,"ef0e0e10",null),p=d.exports,v=i.Ay.extend({name:"ChessBoard",components:{BoardBlock:p},computed:{boardData(){return this.$store.state.boardData}}}),b=v,f=(0,h.A)(b,n,a,!1,null,"d4e9a520",null),P=f.exports,w=function(){var t=this,e=t._self._c;t._self._setupProxy;return t.isTimerSet?e("div",{staticClass:"timer-container"},[e("div",{staticClass:"white-timer"},[t._v(" white timer : "+t._s(t.formattedWhiteTime)+" ")]),t._m(0),e("div",{staticClass:"pause-button-container"},[e("PauseTimerBtn",{on:{"start-timer":t.startTimer}})],1),e("div",{staticClass:"black-timer"},[t._v(" black timer : "+t._s(t.formattedBlackTime)+" ")])]):t._e()},T=[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"timer-description"},[e("p",[t._v("이 타이머는 피셔 룰을 적용하고 있습니다. "),e("br"),e("br"),t._v(" 피셔 룰 설명: 기본시간은 각자 30분입니다. "),e("br"),t._v("착수를 완료하면 20초를 기본시간에 추가하게 됩니다."),e("br"),t._v(" 시간을 모두 사용하게 되면 시간패 입니다.")])])}],$=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("button",{staticClass:"pause-button",on:{click:t.pauseTimer}},[t._v(t._s(t.isTimerPaused?"타이머 정지":"타이머 시작"))])},_=[],C=i.Ay.extend({name:"PauseTimerBtn",methods:{pauseTimer(){0!=this.$store.state.turnCount&&(this.isTimerPaused?this.$store.commit("setTimerPaused",!1):this.$store.commit("setTimerPaused",!0))}},computed:{isTimerPaused(){return this.$store.state.isTimerPaused}}}),g=C,x=(0,h.A)(g,$,_,!1,null,null,null),k=x.exports,S=i.Ay.extend({name:"GameTimer",components:{PauseTimerBtn:k},computed:{isTimerSet(){return this.$store.state.isTimerSet},whiteTime(){return this.$store.state.whiteTime},blackTime(){return this.$store.state.blackTime},formattedWhiteTime(){return this.formatTime(this.whiteTime)},formattedBlackTime(){return this.formatTime(this.blackTime)}},watch:{isTimerSet(t){t?this.startTimer():this.clearTimers()}},methods:{formatTime(t){const e=Math.floor(t/60),s=t%60;return`${String(e).padStart(2,"0")}:${String(s).padStart(2,"0")}`},startBlackTimer(){this.blackTime>0?this.$store.commit("updateBlackTime",-1):(this.$store.commit("setGameOver",!0),this.$store.commit("setGameOverPopup",!0),this.clearTimers())},startWhiteTimer(){this.whiteTime>0?this.$store.commit("updateWhiteTime",-1):(this.$store.commit("setGameOver",!0),this.$store.commit("setGameOverPopup",!0),this.clearTimers())},startTimer(){const t=setInterval((()=>{const t=this.$store.state.turnCount;if(0!==t&&!this.$store.state.isGameOver){if(!this.$store.state.isTimerPaused)return;t%2===0?this.startBlackTimer():this.startWhiteTimer()}}),1e3);this.$store.commit("addTimer",t)},clearTimers(){this.$store.commit("clearAllTimers")}}}),y=S,B=(0,h.A)(y,w,T,!1,null,"7358643b",null),D=B.exports,G=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("button",{staticClass:"game-start-btn",on:{click:t.startGame}},[t._v("게임 시작")])},O=[],I=i.Ay.extend({name:"GameStartBtn",methods:{startGame(){this.$store.commit("setGameStarted",!0)}},computed:{}}),A=I,R=(0,h.A)(A,G,O,!1,null,null,null),U=R.exports,L=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("button",{staticClass:"set-timer-btn",on:{click:t.setTimer}},[t._v("타이머 추가")])},W=[],q=i.Ay.extend({name:"SetTimerBtn",methods:{setTimer(){this.$store.state.isTimerSet?this.$store.commit("setTimerSet",!1):this.$store.commit("setTimerSet",!0)}}}),M=q,j=(0,h.A)(M,L,W,!1,null,null,null),H=j.exports,F=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("button",{staticClass:"undo-btn",on:{click:t.onClickUndoBtn}},[t._v("되돌리기")])},K=[],N=i.Ay.extend({name:"UndoBtn",methods:{onClickUndoBtn(){this.isGameOver||this.turnCount>0&&(this.$store.commit("preTurn"),this.isSelected&&(this.$store.commit("clearSelectedPiece"),this.$store.commit("toggleSelection")),this.$store.commit("undoBoardData"))}},computed:{turnCount(){return this.$store.state.turnCount},isGameOver(){return this.$store.state.isGameOver},isSelected(){return this.$store.state.isSelected}}}),E=N,J=(0,h.A)(E,F,K,!1,null,null,null),z=J.exports,Q=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"restart-btn-wrapper"},[e("button",{staticClass:"restart-btn",on:{click:t.hadleRestartBtn}},[t._v("새 게임")]),t.restartPopup?e("div",{staticClass:"overlay"}):t._e(),t.restartPopup?e("div",{staticClass:"restart-popup"},[t._m(0),e("div",{staticClass:"restart-popup-buttons"},[e("button",{on:{click:t.handleReStartOKbtn}},[t._v("확인")]),e("button",{on:{click:t.hadleRestartCancelbtn}},[t._v("취소")])])]):t._e()])},V=[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"restart-popup-text"},[t._v("현재게임을 포기하시고 "),e("br"),t._v("새로운 게임을 하시겠습니까?")])}],X=i.Ay.extend({name:"RestartBtn",data(){return{restartPopup:!1}},methods:{restartGame(){this.$store.commit("resetGame")},toggleRestartPopup(){this.restartPopup=!this.restartPopup},hadleRestartBtn(){this.toggleRestartPopup(),this.$store.commit("setTimerPaused",!1)},handleReStartOKbtn(){this.restartGame(),this.toggleRestartPopup(),this.$store.commit("setTimerPaused",!0)},hadleRestartCancelbtn(){this.toggleRestartPopup(),this.$store.commit("setTimerPaused",!0)}}}),Y=X,Z=(0,h.A)(Y,Q,V,!1,null,null,null),tt=Z.exports,et=function(){var t=this,e=t._self._c;t._self._setupProxy;return t.isPromotion?e("div",{staticClass:"promotion-container"},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"promotion-item-container"},[e("div",{staticClass:"promotion-item",on:{click:function(e){return t.selectPromotion("q")}}},[e("img",{staticClass:"img",attrs:{src:t.imgURL("q")}})]),e("div",{staticClass:"promotion-item",on:{click:function(e){return t.selectPromotion("n")}}},[e("img",{staticClass:"img",attrs:{src:t.imgURL("n")}})]),e("div",{staticClass:"promotion-item",on:{click:function(e){return t.selectPromotion("b")}}},[e("img",{staticClass:"img",attrs:{src:t.imgURL("b")}})]),e("div",{staticClass:"promotion-item",on:{click:function(e){return t.selectPromotion("r")}}},[e("img",{staticClass:"img",attrs:{src:t.imgURL("r")}})])])]):t._e()},st=[],it=i.Ay.extend({name:"PromotionPawn",data(){return{promotionColor:"",promotionType:"",promotionLocation:[-1,-1]}},computed:{boardData(){return this.$store.state.boardData},isPromotion(){return this.$store.state.isPromotion}},watch:{boardData:{handler:"checkPromotion",deep:!0}},methods:{checkPromotion(){if(this.$store.state.isGameOver)return;const t=this.boardData[0],e=this.boardData[this.boardData.length-1];for(let s=0;s<this.boardData.length;s++){if("bp"===t[s])return this.$store.commit("setIsPromotion",!0),this.$store.commit("setTimerPaused",!1),this.promotionLocation=[0,s],void(this.promotionColor="b");if("wp"===e[s])return this.$store.commit("setIsPromotion",!0),this.$store.commit("setTimerPaused",!1),this.promotionLocation=[this.boardData.length-1,s],void(this.promotionColor="w")}this.$store.commit("setIsPromotion",!1)},imgURL(t){const e=this.promotionColor+t;return`https://assets-themes.chess.com/image/tlwah/150/${e}.png`},selectPromotion(t){const[e,s]=this.promotionLocation;if(-1!==e&&-1!==s){const i=this.promotionColor+t;this.$store.commit("changeBoardData",{row:e,col:s,value:i})}this.$store.commit("setIsPromotion",!1),this.$store.commit("setTimerPaused",!0)}}}),rt=it,ot=(0,h.A)(rt,et,st,!1,null,null,null),nt=ot.exports,at=function(){var t=this,e=t._self._c;t._self._setupProxy;return t.isShowGameOverPopup?e("div",{staticClass:"winer-popup-container"},[e("div",{staticClass:"winer-message"},[t._v(t._s(t.winnerMessage))]),e("button",{on:{click:t.closePopup}},[t._v("확인")])]):t._e()},ct=[],lt=i.Ay.extend({name:"WinerPopup",computed:{isShowGameOverPopup(){return this.$store.state.isShowGameOverPopup},turnCount(){return this.$store.state.turnCount},winnerMessage(){return this.turnCount%2===0?"백팀 승리":"흑팀 승리"}},methods:{closePopup(){this.$store.commit("setGameOverPopup",!1)}}}),mt=lt,ut=(0,h.A)(mt,at,ct,!1,null,null,null),ht=ut.exports,dt=i.Ay.extend({name:"App",components:{ChessBoard:P,GameTimer:D,GameStartBtn:U,SetTimerBtn:H,UndoBtn:z,RestartBtn:tt,PromotionPawn:nt,WinerPopup:ht},methods:{handleRightClick(t){this.isSelected&&(t.preventDefault(),this.$store.commit("toggleSelection",!1),this.$store.commit("clearSelectedPiece")),t.preventDefault()}},computed:{isSelected(){return this.$store.state.isSelected}}}),pt=dt,vt=(0,h.A)(pt,r,o,!1,null,null,null),bt=vt.exports,ft=(s(4114),s(8111),s(7588),s(1910));i.Ay.use(ft.Ay);const Pt=new ft.Ay.Store({state:{turnCount:0,isGameOver:!1,isSelected:!1,isGameStarted:!1,selectedPiece:null,boardData:[["wr","wn","wb","wq","wk","wb","wn","wr"],["wp","wp","wp","wp","wp","wp","wp","wp"],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["bp","bp","bp","bp","bp","bp","bp","bp"],["br","bn","bb","bq","bk","bb","bn","br"]],boardDataHistory:[],isTimerSet:!1,blackTime:1800,whiteTime:1800,timers:[],isTimerPaused:!0,isPromotion:!1,isShowGameOverPopup:!1},mutations:{nextTurn(t){t.turnCount++},preTurn(t){t.turnCount--},setSelectedPiece(t,{row:e,col:s,value:i}){t.selectedPiece={row:e,col:s,value:i}},clearSelectedPiece(t){t.selectedPiece=null},toggleSelection(t){t.isSelected=!t.isSelected},movePiece(t,{from:e,to:s}){const r=t.boardData[e.row][e.col];i.Ay.set(t.boardData[e.row],e.col,""),i.Ay.set(t.boardData[s.row],s.col,r)},changeBoardData(t,{row:e,col:s,value:r}){i.Ay.set(t.boardData[e],s,r)},setGameOver(t,e){t.isGameOver=e},setGameStarted(t,e){t.isGameStarted=e},saveBoardData(t){const e=JSON.parse(JSON.stringify(t.boardData));t.boardDataHistory.push(e)},undoBoardData(t){t.boardData=t.boardDataHistory.pop()},updateWhiteTime(t,e){t.whiteTime=t.whiteTime+e},updateBlackTime(t,e){t.blackTime=t.blackTime+e},setTimerSet(t,e){t.isTimerSet=e},giveFischerTime(t){const e=t.turnCount;1!==e&&(e%2===0?t.whiteTime+=20:t.blackTime+=20)},addTimer(t,e){t.timers.push(e)},clearAllTimers(t){t.timers.forEach((t=>clearInterval(t))),t.timers=[]},setTimerPaused(t,e){t.isTimerPaused=e},setIsPromotion(t,e){t.isPromotion=e},setGameOverPopup(t,e){t.isShowGameOverPopup=e},resetGame(t){t.turnCount=0,t.isGameOver=!1,t.isSelected=!1,t.isGameStarted=!1,t.selectedPiece=null,t.boardData=[["wr","wn","wb","wq","wk","wb","wn","wr"],["wp","wp","wp","wp","wp","wp","wp","wp"],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["bp","bp","bp","bp","bp","bp","bp","bp"],["br","bn","bb","bq","bk","bb","bn","br"]],t.boardDataHistory.length=0,t.isTimerSet=!1,t.blackTime=1800,t.whiteTime=1800,t.isTimerPaused=!0,t.isShowGameOverPopup=!1}}});var wt=Pt;i.Ay.config.productionTip=!1,new i.Ay({render:t=>t(bt),store:wt}).$mount("#app")}},e={};function s(i){var r=e[i];if(void 0!==r)return r.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,s),o.exports}s.m=t,function(){var t=[];s.O=function(e,i,r,o){if(!i){var n=1/0;for(m=0;m<t.length;m++){i=t[m][0],r=t[m][1],o=t[m][2];for(var a=!0,c=0;c<i.length;c++)(!1&o||n>=o)&&Object.keys(s.O).every((function(t){return s.O[t](i[c])}))?i.splice(c--,1):(a=!1,o<n&&(n=o));if(a){t.splice(m--,1);var l=r();void 0!==l&&(e=l)}}return e}o=o||0;for(var m=t.length;m>0&&t[m-1][2]>o;m--)t[m]=t[m-1];t[m]=[i,r,o]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};s.O.j=function(e){return 0===t[e]};var e=function(e,i){var r,o,n=i[0],a=i[1],c=i[2],l=0;if(n.some((function(e){return 0!==t[e]}))){for(r in a)s.o(a,r)&&(s.m[r]=a[r]);if(c)var m=c(s)}for(e&&e(i);l<n.length;l++)o=n[l],s.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return s.O(m)},i=self["webpackChunkchess"]=self["webpackChunkchess"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=s.O(void 0,[504],(function(){return s(8629)}));i=s.O(i)})();
//# sourceMappingURL=app.bd692d84.js.map