import PriceChart from "@/components/PriceChart";
import { Swap } from "@/components/Swap";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className=" grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
        <div className="space-y-8">
          <PriceChart />
          {/* <OrderBook/>  */}
        </div>
      </div>
      <Swap />
      <div></div>
    </div>
  );
}
