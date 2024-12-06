import { create } from "zustand";
import { Token, TOKENS } from "@/lib/config/token"; // Ensure this imports the correct types

interface TokenStore {
  fromToken: Token;
  toToken: Token;
  setFromToken: (token: Token) => void;
  setToToken: (token: Token) => void;
}

const useTokenStore = create<TokenStore>((set) => ({
  fromToken: TOKENS.find((t) => t.symbol === "ETH") || TOKENS[0], // Provide a default value
  toToken: TOKENS.find((t) => t.symbol === "USDC") || TOKENS[1], // Provide a default value
  setFromToken: (token: Token) => set(() => ({ fromToken: token })),
  setToToken: (token: Token) => set(() => ({ toToken: token })),
}));

export default useTokenStore;
