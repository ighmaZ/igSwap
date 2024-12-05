import { useState, useEffect, useRef, useCallback } from "react";

interface Order {
  price: number;
  amount: number;
}

interface OrderBook {
  bids: Order[];
  asks: Order[];
}

const RECONNECT_INTERVAL = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 1000; // 1 second

export function useOrderBook(symbol: string) {
  const [orderBook, setOrderBook] = useState<OrderBook>({ bids: [], asks: [] });
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    wsRef.current = new WebSocket("wss://stream.binance.com:9443/ws");

    wsRef.current.onopen = () => {
      console.log("WebSocket connected");
      retryCountRef.current = 0;
      subscribeToOrderBook();
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.b && data.a) {
          setOrderBook({
            bids: data.b
              .slice(0, 5)
              .map(([price, amount]: [string, string]) => ({
                price: parseFloat(price),
                amount: parseFloat(amount),
              })),
            asks: data.a
              .slice(0, 5)
              .map(([price, amount]: [string, string]) => ({
                price: parseFloat(price),
                amount: parseFloat(amount),
              })),
          });
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      reconnectWithBackoff();
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      wsRef.current?.close();
    };
  }, [symbol]);

  const subscribeToOrderBook = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${symbol.toLowerCase()}@depth`],
          id: 1,
        })
      );
    }
  }, [symbol]);

  const reconnectWithBackoff = useCallback(() => {
    if (retryCountRef.current >= MAX_RETRIES) {
      console.log("Max retries reached. Stopping reconnection attempts.");
      return;
    }

    const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCountRef.current);
    console.log(`Attempting to reconnect in ${delay}ms`);

    setTimeout(() => {
      retryCountRef.current++;
      connect();
    }, delay);
  }, [connect]);

  useEffect(() => {
    connect();

    // Set up periodic reconnection
    const reconnectInterval = setInterval(() => {
      console.log("Scheduled reconnection");
      if (wsRef.current) {
        wsRef.current.close();
      }
    }, RECONNECT_INTERVAL);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      clearInterval(reconnectInterval);
    };
  }, [connect]);

  return orderBook;
}
