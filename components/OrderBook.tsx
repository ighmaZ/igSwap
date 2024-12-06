"use client";

import { useOrderBook } from "../hooks/useOrderBook";
import { calculateMetrics } from "../utils/metrics";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface OrderBookProps {
  symbol: string;
}

export function OrderBook({ symbol }: OrderBookProps) {
  const orderBook = useOrderBook(symbol);
  const metrics = calculateMetrics(orderBook);

  return (
    <div className="grid gap-4 ">
      <Card>
        <CardHeader>
          <CardTitle>Order Book: {symbol}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderBook.bids.map((bid, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-green-500 flex items-center">
                      {bid.price.toFixed(2)}
                      <ArrowUpIcon className="ml-1 h-4 w-4" />
                    </TableCell>
                    <TableCell>{bid.amount.toFixed(4)}</TableCell>
                    <TableCell>{(bid.price * bid.amount).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderBook.asks.map((ask, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-red-500 flex items-center">
                      {ask.price.toFixed(2)}
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                    </TableCell>
                    <TableCell>{ask.amount.toFixed(4)}</TableCell>
                    <TableCell>{(ask.price * ask.amount).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Slippage</p>
              <p className="text-2xl font-bold">{metrics.slippage}%</p>
            </div>
            <div>
              <p className="text-sm font-medium">Price Impact</p>
              <p className="text-2xl font-bold">{metrics.priceImpact}%</p>
            </div>
            <div>
              <p className="text-sm font-medium">Fees</p>
              <p className="text-2xl font-bold">{metrics.fees}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
