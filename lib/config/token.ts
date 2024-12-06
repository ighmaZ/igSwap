"use client";

export interface Token {
  symbol: string;
  name: string;
  logo: string;
  balance: number;
  price: number;
  priceChange24h: number;
  id: string; // CoinGecko ID
}

export const TOKENS: Token[] = [
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    balance: 1.5,
    price: 1840.28,
    priceChange24h: 2.5,
  },
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    balance: 0.05,
    price: 35000,
    priceChange24h: 1.8,
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    logo: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    balance: 2500,
    price: 1,
    priceChange24h: 0,
  },
  {
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    logo: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
    balance: 1800,
    price: 1,
    priceChange24h: 0,
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "BNB",
    logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    balance: 10,
    price: 310,
    priceChange24h: 1.2,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    balance: 25,
    price: 95,
    priceChange24h: 3.5,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    logo: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    balance: 1000,
    price: 0.45,
    priceChange24h: -1.2,
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "XRP",
    logo: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
    balance: 2000,
    price: 0.55,
    priceChange24h: 1.5,
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    logo: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
    balance: 150,
    price: 6.8,
    priceChange24h: 2.1,
  },
  {
    id: "avalanche-2",
    symbol: "AVAX",
    name: "Avalanche",
    logo: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
    balance: 45,
    price: 32,
    priceChange24h: 4.2,
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    logo: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
    balance: 200,
    price: 13,
    priceChange24h: 2.8,
  },
  {
    id: "polygon",
    symbol: "MATIC",
    name: "Polygon",
    logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    balance: 1500,
    price: 0.85,
    priceChange24h: 1.9,
  },
  {
    id: "uniswap",
    symbol: "UNI",
    name: "Uniswap",
    logo: "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
    balance: 100,
    price: 5.2,
    priceChange24h: -0.8,
  },
  {
    id: "aave",
    symbol: "AAVE",
    name: "Aave",
    logo: "https://assets.coingecko.com/coins/images/12645/small/AAVE.png",
    balance: 15,
    price: 85,
    priceChange24h: 1.1,
  },
  {
    id: "maker",
    symbol: "MKR",
    name: "Maker",
    logo: "https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png",
    balance: 2,
    price: 1250,
    priceChange24h: 0.9,
  },
  {
    id: "compound-governance-token",
    symbol: "COMP",
    name: "Compound",
    logo: "https://assets.coingecko.com/coins/images/10775/small/COMP.png",
    balance: 10,
    price: 45,
    priceChange24h: -1.5,
  },
  {
    id: "curve-dao-token",
    symbol: "CRV",
    name: "Curve DAO",
    logo: "https://assets.coingecko.com/coins/images/12124/small/Curve.png",
    balance: 500,
    price: 0.55,
    priceChange24h: 2.3,
  },
  {
    id: "synthetix",
    symbol: "SNX",
    name: "Synthetix",
    logo: "https://assets.coingecko.com/coins/images/3406/small/SNX.png",
    balance: 200,
    price: 2.8,
    priceChange24h: 3.2,
  },
  {
    id: "yearn-finance",
    symbol: "YFI",
    name: "yearn.finance",
    logo: "https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png",
    balance: 0.1,
    price: 6500,
    priceChange24h: 1.7,
  },
  {
    id: "sushi",
    symbol: "SUSHI",
    name: "Sushi",
    logo: "https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png",
    balance: 300,
    price: 1.2,
    priceChange24h: -0.5,
  },
];

//  quick access tokens
export const POPULAR_TOKEN_IDS = ["bitcoin", "ethereum", "cardano", "solana"];

export function getTokenById(id: string): Token | undefined {
  return TOKENS.find((token) => token.id === id);
}

export function getTokenBySymbol(symbol: string): Token | undefined {
  return TOKENS.find((token) => token.symbol === symbol);
}
