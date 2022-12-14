import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
const UPBIT_URL = "wss://api.upbit.com/websocket/v1";

const useNewData = () => {
  const selectedCoin = useSelector((state) => state.coinReducer.selectedCoin);
  const [result, setResult] = useState();
  const [timer, setTimer] = useState(false);
  const data = [
    { ticket: "test" },
    { type: "ticker", codes: [`${selectedCoin.code}`], isOnlyRealtime: true },
  ];
  const ws = useRef(null);
  useEffect(() => {
    // timer 종료 시 트리거
    if (timer) {
      alert("만료되었습니다.");
      ws.current.close();
    }
  }, [timer]);

  useEffect(() => {
    // 10분 지나면 종료 처리
    setTimeout(() => {
      setTimer(true);
    }, 1000 * 60 * 1000);

    ws.current = new WebSocket(UPBIT_URL);
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify(data));
    };
    ws.current.onclose = () => {
      console.log("DISCONNECTED");
    };
    ws.current.onmessage = async (event) => {
      // console.log("여기ㅣㅣㅣㅣㅣㅣ", event);
      const text = await new Response(event.data).text();
      const message = JSON.parse(text);
      const { opening_price, low_price, high_price, trade_price, timestamp, trade_volume } =
        message;
      setResult({
        open: opening_price,
        low: low_price,
        high: high_price,
        // 종가 = 현재가
        close: trade_price,
        volume: trade_volume,
        // 오전 9시 기준 일봉
        timestamp: Math.floor(timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000,
        turnover: ((opening_price + low_price + high_price + trade_price) / 4) * trade_volume,
      });
      // console.log("여기는???", opening_price, low_price, high_price, timestamp);
    };
    ws.current.onerror = (event) => {
      console.log("Error발새애애앵", event);
      ws.current.close();
    };
    return () => {
      ws.current.close();
    };
  }, []);
  // console.log("결과는", result);
  return result;
};
export default useNewData;
