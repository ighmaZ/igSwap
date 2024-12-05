export function calculateMetrics(orderBook: {
  bids: { price: number; amount: number }[];
  asks: { price: number; amount: number }[];
}) {
  const topBid = orderBook.bids[0]?.price || 0;
  const topAsk = orderBook.asks[0]?.price || 0;

  const midPrice = (topBid + topAsk) / 2;
  const spread = topAsk - topBid;
  const slippage = (spread / midPrice) * 100;
  const priceImpact = (spread / topBid) * 100;
  const fees = 0.1; // Assuming a 0.1% fee

  return {
    slippage: slippage.toFixed(4),
    priceImpact: priceImpact.toFixed(4),
    fees: fees.toFixed(2),
  };
}
