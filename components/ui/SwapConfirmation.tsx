"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import type { SwapDetails } from "@/lib/types";
import useTokenStore from "@/store/store";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

interface SwapConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: SwapDetails;
}

export function SwapConfirmation({
  open,
  onOpenChange,
  details,
}: SwapConfirmationProps) {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  const { fromToken, toToken, setFromToken, setToToken } = useTokenStore();

  const handleConfirm = async () => {
    setStatus("pending");
    // Simulate transaction
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        onOpenChange(false);
      }, 2000);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Swap</DialogTitle>
          <DialogDescription>
            Please review your transaction details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">You pay</span>
              <span className="font-medium">
                {details.inputAmount} {fromToken.symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">You receive</span>
              <span className="font-medium">{details.outputAmount} USDC</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between"></div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Minimum Received</span>
              <span>
                {details.minimumReceived} {toToken.symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fee</span>
              <span>${formatCurrency(details.fee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gas Fee</span>
              <span>${formatCurrency(details.gasFee)}</span>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleConfirm}
            disabled={status === "pending"}
          >
            {status === "pending" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {status === "pending"
              ? "Confirming..."
              : status === "success"
              ? "Success!"
              : status === "error"
              ? "Failed"
              : "Confirm Swap"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
