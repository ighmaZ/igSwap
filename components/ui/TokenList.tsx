"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Token, TOKENS } from "@/lib/config/token";
import { Button } from "./Button";

interface TokenListProps {
  searchQuery: string;
  onSelect: (token: Token) => void;
}

export function TokenList({ searchQuery, onSelect }: TokenListProps) {
  const filteredTokens = TOKENS.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-h-[400px] overflow-y-auto space-y-2">
      {filteredTokens.map((token) => (
        <Button
          key={token.symbol}
          variant="ghost"
          className="w-full justify-start gap-4 hover:bg-muted"
          onClick={() => onSelect(token)}
        >
          <img
            src={token.logo}
            alt={token.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <span>{token.symbol}</span>
              <span className="text-sm">
                {token.balance.toFixed(4)} {token.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{token.name}</span>
              <div className="flex items-center gap-1">
                {token.priceChange24h > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
              </div>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}
