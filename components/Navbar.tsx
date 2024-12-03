"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ui/ModeToggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative flex h-16 items-center justify-between px-2 md:pl-8 pr-14 ">
        {/* Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent ml-4">
          IgSwap
        </h1>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden absolute right-4" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Items - Desktop */}
        <nav className="hidden md:flex items-center gap-4 ">
          <button className="text-sm">connect wallet</button>

          <ModeToggle />
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-t shadow-lg">
            <div className="flex flex-col items-center py-4 space-y-4">
              <button className="text-sm">connect wallet</button>
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
