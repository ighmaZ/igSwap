const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

export async function fetchTokenData(tokenId: string) {
  const response = await fetch(`${COINGECKO_API_BASE}/coins/${tokenId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch token data");
  }
  return response.json();
}
export async function fetchHistoricalData(tokenId: string, days: number) {
  const response = await fetch(
    `${COINGECKO_API_BASE}/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch historical data");
  }
  return response.json();
}

export async function fetchMultipleTokensData(tokenIds: string[]) {
  const ids = tokenIds.join(",");
  const response = await fetch(
    `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch multiple tokens data");
  }
  return response.json();
}
