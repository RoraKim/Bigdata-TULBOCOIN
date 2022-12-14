// 액션의 타입
const LOGOUT = "LOGOUT";
const FETCH_USER = "FETCH_USER";
const CHANGE_IS_LOGGED_IN = "CHANGE_IS_LOGGEN_IN";
const TOKEN = "TOKEN";
const FETCH_WALLET = "FETCH_WALLET";
const FETCH_RANKING = "FETCH_RANKING";
const FETCH_HISTORY = "FETCH_HISTORY";
const FETCH_OTHER_USER = "FETCH_OTHER_USER";
const FETCH_MY_HISTORY = 'FETCH_MY_HISTORY'
const FETCH_LIKED_COIN = 'FETCH_LIKED_COIN'
// 액션 생성 함수 만들기
export const changeIsLoggedIn = (data) => ({ type: CHANGE_IS_LOGGED_IN, meta: data });
export const token = (data) => ({ type: TOKEN, meta: data }); // localStorage에 토큰 저장하기
export const fetchUser = (data) => ({ type: FETCH_USER, meta: data }); // localStorage에 유저 정보 저장하기
export const logout = () => ({ type: LOGOUT }); // localStorage에서 유저 정보 + 토큰 삭제하기
export const fetchWallet = (data) => ({ type: FETCH_WALLET, meta: data }); // localStorage에 지갑 정보 저장하기
export const fetchRanking = (data) => ({ type: FETCH_RANKING, meta: data });
export const fetchHistory = (data) => ({ type: FETCH_HISTORY, meta: data });
export const fetchOtherUser = (data) => ({ type: FETCH_OTHER_USER, meta: data }); // localStorage에 유저 정보 저장하기
export const fetchMyHistory = (data) => ({ type: FETCH_MY_HISTORY, meta: data }) // redux에 myHistory에 히스토리 저장
export const fetchLikedCoin = (data) => ({ type: FETCH_LIKED_COIN, meta: data }) // 리덕스랑 로컬스토리지에 관심코인 바꾸기
// 초기 값
const initialState = {
  isLoggedin: false,
  user: '{}',
  wallet: '[]',
  rankinglist: [],
  historylist: [],
  otheruser: {},
  myHistory: [],
  likedCoin: '[]'
};

// 리듀서 선언
export default function account(state = initialState, action) {
  switch (action.type) {
    case CHANGE_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedin: action.meta,
      };
    case TOKEN:
      localStorage.setItem("token", action.meta.accessToken);
      return {
        ...state,
      };
    case FETCH_USER:
      localStorage.setItem("user", JSON.stringify(action.meta.user));
      return {
        ...state,
        user: JSON.stringify(action.meta.user)
      };
    case FETCH_WALLET:
      localStorage.setItem("wallet", JSON.stringify(action.meta));
      return {
        ...state,
        wallet: JSON.stringify(action.meta)
      };
    case LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("wallet");
      localStorage.removeItem("likedCoin");
      localStorage.removeItem("token");
      return {
        ...state,
        user: '{}',
        wallet: '[]',
        likedCoin: '[]'
      };
    case FETCH_RANKING:
      return {
        ...state,
        rankinglist: action.meta,
      };
    case FETCH_HISTORY:
      return {
        ...state,
        historylist: action.meta,
      };
    case FETCH_OTHER_USER:
      return {
        ...state,
        otheruser: action.meta,
      };
    case FETCH_MY_HISTORY:
      return {
        ...state,
        myHistory: action.meta
      };
    case FETCH_LIKED_COIN:
      localStorage.setItem("likedCoin", JSON.stringify(action.meta));
      return {
        ...state,
        likedCoin: JSON.stringify(action.meta)
      }
    default:
      return state;
  }
}
