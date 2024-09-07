import { useSelector } from "react-redux";
import OrderHistoryCard from "./OrderHistoryCard";

export default function OrderHistory() {
  const { orders } = useSelector((state) => state.order);

  return (
    <div className="bg-smoke min-h-screen font-Poppins py-5">
      <h1 className="text-center text-color font-bold text-3xl md:text-5xl">
        Order History
      </h1>
      <div>
        {orders && orders.length > 0 ? (
          orders.map((item, index) => (
            <OrderHistoryCard item={item} key={index} />
          ))
        ) : (
          <div className="text-center text-gray-500 text-xl mt-5 font-semibold">
            No Orders Placed Yet
          </div>
        )}
      </div>
    </div>
  );
}
