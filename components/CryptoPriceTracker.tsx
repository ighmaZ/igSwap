"use client";

import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function CryptoPriceTracker() {
  const [coins, setCoins] = useState<CoinData[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4"></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coins.map((coin) => (
          <Card key={coin.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {coin.name} ({coin.symbol.toUpperCase()})
              </CardTitle>
              <img src={coin.image} alt={coin.name} className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${coin.current_price.toFixed(2)}
              </div>
              <p
                className={`text-xs ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h > 0 ? "+" : ""}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
