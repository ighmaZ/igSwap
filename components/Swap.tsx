"use client";

import { useCallback, useState } from "react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { ArrowDownUp } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/Button";
import { AlertDescription } from "./ui/Alert";
import { Alert } from "./ui/Alert";
import { TOKENS } from "@/lib/config/token";
import { TokenSelect } from "./ui/TokenSelect";
import { SwapConfirmation } from "./ui/SwapConfirmation";

export function Swap() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [fromToken, setFromToken] = useState(
    TOKENS.find((t) => t.symbol === "ETH")!
  );
  const [toToken, setToToken] = useState(
    TOKENS.find((t) => t.symbol === "USDC")!
  );

  const handleSwap = useCallback(() => {
    if (!error && amount) {
      setConfirmationOpen(true);
    }
  }, [error, amount]);

  // move up down
  const handleTokenSwap = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setAmount("");
    setError(null);
  };

  function calculateMinimumReceived(
    outputAmount: number,
    slippage: number
  ): number {
    return Number((outputAmount * (1 - slippage / 100)).toFixed(2));
  }

  const inputAmount = Number(amount) || 0;
  const outputAmount = inputAmount * (fromToken.price / toToken.price);
  const expectedAmount = 0.0; // will be changed

  const slippageThreshold = 0.01; // 1%
  const slippage = Math.random() * 2; // Random slippage between 0 and 2 (200%)

  const swapDetails = {
    inputAmount,
    outputAmount,
    minimumReceived: calculateMinimumReceived(outputAmount, slippage),
    fee: outputAmount * 0.003, // 0.3% fee
    gasFee: 7.5,
  };

  const handleAmountChange = useCallback(
    (value: string) => {
      setAmount(value);
      if (Number(value) > fromToken.balance) {
        setError("Insufficient balance");
      } else if (Number(value) > fromToken.balance * 0.7) {
        setError("High price impact warning");
      } else if (slippage > 1) {
        setError("Slippage exceeds 1%");
      } else {
        setError(null);
      }
    },
    [fromToken.balance, slippage]
  );

  return (
    <Card className="p-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Swap</h2>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <div className="flex justify-between mb-2">
            <Input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.0"
              className="border-none bg-transparent text-2xl w-[140px] p-0 "
            />
            <TokenSelect
              side="from"
              selectedToken={fromToken}
              onTokenSelect={setFromToken}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Balance: {fromToken.balance} {fromToken.symbol}
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleTokenSwap}
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <div className="flex justify-end mb-2">
            <TokenSelect
              side="to"
              selectedToken={toToken}
              onTokenSelect={setToToken}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Balance: {toToken.balance} {toToken.symbol}
            </span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Minimum Received</span>
            <span>
              {swapDetails.minimumReceived.toFixed(6)} {toToken.symbol}
            </span>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!amount || !!error}
          onClick={handleSwap}
        >
          {error || "Swap"}
        </Button>
      </div>

      <SwapConfirmation
        open={confirmationOpen}
        onOpenChange={setConfirmationOpen}
        details={swapDetails}
      />
    </Card>
  );
}
