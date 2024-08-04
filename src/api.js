import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export const fetchCoins = async () => {
  const response = await axios.get(`${API_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
    },
  });
  return response.data;
};

export const fetchCoinDetail = async (id) => {
  const response = await axios.get(`${API_URL}/coins/${id}`);
  return response.data;
};
