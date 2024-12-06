import CryptoPriceTracker from "@/components/CryptoPriceTracker";
import { OrderBook } from "@/components/OrderBook";
import PriceChart from "@/components/PriceChart";
import { Swap } from "@/components/Swap";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8 mt-5">
          <PriceChart />
          <OrderBook symbol="BTCUSDT" />
        </div>
        <div className="space-y-8">
          <div className="mt-5">
            <Swap />
          </div>
          <div className="flex justify-center w-full">
            <CryptoPriceTracker />
          </div>
        </div>
      </div>
    </div>
  );
}
