import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { fetchCoinDetail } from "../api";

ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

function PriceChart({ coinId }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await fetchCoinDetail(coinId);
        const historicalData = data?.market_data?.sparkline_7d?.price || [];

        if (historicalData.length > 0) {
          const labels = historicalData.map((_, index) => index.toString());
          const prices = historicalData.map((price) => price);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Price (USD)",
                data: prices,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: false,
              },
            ],
          });
        } else {
          console.log("No historical data available.");
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [coinId]);

  return (
    <div>
      <h2>Price Chart</h2>
      {chartData.labels ? (
        <Line data={chartData} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default PriceChart;
