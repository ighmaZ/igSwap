"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { TOKENS, POPULAR_TOKEN_IDS, type Token } from "@/lib/config/token";
import { TokenList } from "./TokenList";
import { Button } from "./Button";

interface TokenSelectProps {
  side: "from" | "to";
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
}

export function TokenSelect({
  //   side,
  selectedToken,
  onTokenSelect,
}: TokenSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const popularTokens = POPULAR_TOKEN_IDS.map((id) =>
    TOKENS.find((token) => token.id === id)
  ).filter((token): token is Token => token !== undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <img
            src={selectedToken.logo}
            alt={selectedToken.name}
            className="w-5 h-5 rounded-full"
          />
          {selectedToken.symbol}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Token"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 gap-2">
            {popularTokens.map((token) => (
              <Button
                key={token.symbol}
                variant="outline"
                className="gap-2"
                onClick={() => onTokenSelect(token)}
              >
                <img
                  src={token.logo}
                  alt={token.name}
                  className="w-5 h-5 rounded-full"
                />
                {token.symbol}
              </Button>
            ))}
          </div>
          <TokenList
            searchQuery={searchQuery}
            onSelect={(token) => {
              onTokenSelect(token);
              setSearchQuery("");
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
