const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

function buildApiUrl(endpoint: string) {
  return `${COINGECKO_API_BASE}${endpoint}`;
}

async function fetchFromApi(endpoint: string) {
  const response = await fetch(buildApiUrl(endpoint));
  if (!response.ok) {
    const errorMessage = `Error ${response.status}: ${response.statusText}`;
    throw new Error(`Failed to fetch data from ${endpoint}. ${errorMessage}`);
  }
  return response.json();
}

export async function fetchTokenData(tokenId: string) {
  return fetchFromApi(`/coins/${tokenId}`);
}

export async function fetchHistoricalData(tokenId: string, days: number) {
  return fetchFromApi(
    `/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`
  );
}
