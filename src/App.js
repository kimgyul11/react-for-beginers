import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [inverted, setInverted] = useState(false);
  const selectCoin = (e) => {
    setSelectedCoin(e.target.value);
    console.log(selectedCoin);
  };
  const onChange = (e) => {
    setMoney(e.target.value);
  };
  const onInverter = () => {
    reset();
    setInverted((curr) => !curr);
  };
  const reset = () => {
    setMoney("");
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []); //빈배열이면 한번만 작동하는 것이지?
  return (
    <div>
      <h1>The Coins!</h1>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <select onChange={selectCoin}>
          {coins.map((coin) => (
            <option value={coin.quotes.USD.price}>
              {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <label htmlFor="usd">USD</label>
      <input
        id="usd"
        value={inverted ? money * selectedCoin : money}
        onChange={onChange}
        type="number"
        placeholder="USD를 입력하라"
        disabled={inverted}
      ></input>
      <label htmlFor="btc">btc</label>
      <input
        id="btc"
        value={inverted ? money : money / selectedCoin}
        onChange={onChange}
        type="number"
        placeholder="USD를 입력하라"
        disabled={!inverted}
      ></input>
      <button onClick={reset}>초기화</button>
      <button onClick={onInverter}>타입변경</button>
    </div>
  );
}

export default App;
