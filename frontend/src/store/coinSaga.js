import { call, delay, put, takeLatest } from "redux-saga/effects";
import { buyApi, sellApi, newsApi, wordCloudApi } from "./api";
import { fetchWalletAsync, fetchUserAsync } from "./accountSaga";
import { selectNews, wordCloud } from "./coin";
const BUY_ASYNC = "BUY_ASYNC";
const SELL_ASYNC = "SELL_ASYNC";
const NEWS_ASYNC = "NEWS_ASYNC";
const WORDCOULD_ASYNC = "WORDCOULD_ASYNC";

export const buyAsync = (body) => ({ type: BUY_ASYNC, meta: body });
export const sellAsync = (body) => ({ type: SELL_ASYNC, meta: body });
export const newsAsync = (body) => ({ type: NEWS_ASYNC, meta: body });
export const wordCouldAsync = (body) => ({ type: WORDCOULD_ASYNC, meta: body });

function* buySaga(action) {
  const body = action.meta;
  console.log("body", body);
  try {
    const response = yield call(buyApi, body);
    if (response.status === 200) {
      yield put(fetchUserAsync());
      yield delay(fetchWalletAsync(), 500);
    }
  } catch (error) {
    console.log(error);
  }
}
function* sellSaga(action) {
  const body = action.meta;
  try {
    const response = yield call(sellApi, body);
    if (response.status === 200) {
      console.log("매도 성공???", response.data);
    }
  } catch (error) {
    console.log(error);
  }
}
function* newsSaga(action) {
  const body = action.meta;
  try {
    const response = yield call(newsApi, body);
    if (response.status === 200) {
      yield put(selectNews(response.data));
      console.log("성공");
    }
  } catch (error) {
    console.log(error);
  }
}
function* wordCouldSaga(action) {
  const body = action.meta;
  try {
    const response = yield call(wordCloudApi, body);
    if (response.status === 200) {
      yield put(wordCloud(response.data));
      console.log("워드 클라우드 성공", response.data);
    }
  } catch (error) {
    console.log("여기 에러?", error);
  }
}
export function* coinSaga() {
  yield takeLatest(BUY_ASYNC, buySaga);
  yield takeLatest(SELL_ASYNC, sellSaga);
  yield takeLatest(NEWS_ASYNC, newsSaga);
  yield takeLatest(WORDCOULD_ASYNC, wordCouldSaga);
}
