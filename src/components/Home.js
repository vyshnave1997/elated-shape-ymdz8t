import React, { useEffect, useState } from "react";
import { fetchCoins } from "../api";
import { Link } from "react-router-dom";
import "./Home.css"; // Add this line to include component-specific styles

function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      const data = await fetchCoins();
      setCoins(data);
    };
    getCoins();
  }, []);

  return (
    <div className="container">
      <h1>Crypto Tracker</h1>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>
              {coin.name} ({coin.symbol.toUpperCase()}) - ${coin.current_price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
