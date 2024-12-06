"use client";

import { useState, useEffect } from "react";
import { fetchHistoricalData, fetchTokenData } from "../utils/fetchToken";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";

interface Token {
  id: string;
  symbol: string;
  name: string;
}

interface ChartData {
  date: string;
  price: number;
  impact: number;
}

const FAMOUS_TOKENS: Token[] = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin" },
  { id: "ethereum", symbol: "eth", name: "Ethereum" },
  { id: "cardano", symbol: "ada", name: "Cardano" },
  { id: "solana", symbol: "sol", name: "Solana" },
];

export default function Home() {
  const [selectedToken, setSelectedToken] = useState<Token>(FAMOUS_TOKENS[0]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetchData(selectedToken.id);
  }, [selectedToken.id]);

  async function fetchData(tokenId: string) {
    setLoading(true);
    try {
      const [tokenData, historicalData] = await Promise.all([
        fetchTokenData(tokenId),
        fetchHistoricalData(tokenId, 30),
      ]);

      const marketCap = tokenData.market_data.market_cap.usd;
      const priceData = historicalData.prices.map(
        ([timestamp, price]: [number, number]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price,
          impact: calculateImpact(price, marketCap),
        })
      );

      setChartData(priceData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }

  function calculateImpact(price: number, marketCap: number): number {
    const tradeAmount = marketCap * 0.01; // 1% of market cap
    return (tradeAmount / marketCap) * price * 100;
  }

  return (
    <Card className="p-4 mt-5">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">
              {selectedToken.name} Price and Impact
            </CardTitle>
            <CardDescription>
              30-day price history and estimated trade impact
            </CardDescription>
          </div>
          <Select
            value={selectedToken.id}
            onValueChange={(value) =>
              setSelectedToken(
                FAMOUS_TOKENS.find((t) => t.id === value) || FAMOUS_TOKENS[0]
              )
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a token" />
            </SelectTrigger>
            <SelectContent>
              {FAMOUS_TOKENS.map((token) => (
                <SelectItem key={token.id} value={token.id}>
                  {token.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: theme === "dark" ? "#f3f4f6" : "#374151" }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: theme === "dark" ? "#f3f4f6" : "#374151" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: theme === "dark" ? "#f3f4f6" : "#374151" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#374151" : "#f3f4f6",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  labelStyle={{
                    color: theme === "dark" ? "#f3f4f6" : "#374151",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                  name="Price (USD)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="impact"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={false}
                  name="Estimated Impact (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
