import React, { useEffect, useState } from "react";
import { fetchCoinDetail } from "../api";
import { useParams } from "react-router-dom";

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      const data = await fetchCoinDetail(id);
      setCoin(data);
    };
    getCoinDetail();
  }, [id]);

  if (!coin) return <div>Loading...</div>;

  return (
    <div>
      <h1>{coin.name}</h1>
      <p>Symbol: {coin.symbol.toUpperCase()}</p>
      <p>Current Price: ${coin.market_data.current_price.usd}</p>
      <p>Market Cap: ${coin.market_data.market_cap.usd}</p>
      <p>Total Volume: ${coin.market_data.total_volume.usd}</p>
      <p>Circulating Supply: {coin.market_data.circulating_supply}</p>
      <p>Max Supply: {coin.market_data.max_supply || "N/A"}</p>
    </div>
  );
}

export default CoinDetail;
