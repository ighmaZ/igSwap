"use client";

import { useState } from "react";
import { Menu, Wallet, X, Cross } from "lucide-react";
import { ModeToggle } from "./ui/ModeToggle";
import { ethers } from "ethers";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState("0");
  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });

        setWalletAddress(accounts[0]);

        const balance = await (window as any).ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        });

        const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
        setWalletBalance(balanceInEth.toFixed(4));
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setWalletBalance("");
    setIsWalletMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          IgSwap
        </h1>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Items - Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          {walletAddress ? (
            <div className="relative">
              <button
                onClick={() => setIsWalletMenuOpen((prev) => !prev)}
                className="px-3 py-2 rounded-md flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 shadow-sm"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                  {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                </span>
                <Wallet className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
              {isWalletMenuOpen && (
                <div className="absolute w-full mt-2 rounded-lg shadow-lg bg-white dark:bg-gray-800 border dark:border-gray-700">
                  <button
                    onClick={disconnectWallet}
                    className="w-full px-3 py-2 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg transition duration-200"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium flex items-center gap-2 transition-all duration-200 shadow-sm"
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </button>
          )}

          <ModeToggle />
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-t shadow-lg md:hidden">
            <div className="flex flex-col items-center py-4 space-y-4">
              {walletAddress ? (
                <button
                  onClick={disconnectWallet}
                  className="w-full text-left px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium"
                >
                  Connect Wallet
                </button>
              )}
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
