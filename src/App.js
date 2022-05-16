import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Coin from "./Components/Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const FetchData = async () => {
    const data = await axios.get(
      "https://api.coinstats.app/public/v1/coins?skip=0&limit=100"
    );

    setCoins(data.data.coins);
  };
  const filteredCoins = coins.filter((coin) => {
    if (coin) {
      return coin.name.toLowerCase().includes(search.toLowerCase());
    }
  });
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Crypto Search"
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          console.log(coin);
          const { icon, id, name, symbol, price } = coin;
          return (
            <Coin
              key={id}
              price={price}
              name={name}
              symbol={symbol}
              icon={icon}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
