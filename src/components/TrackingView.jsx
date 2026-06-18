import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function TrackingView({ orderId, productId, onNavigate }) {
  const { orders } = useCart();

  // Find the order
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return (
      <div className="bg-[#e3e6e6] min-h-screen py-10 flex flex-col items-center justify-center">
        <p className="text-red-600 font-bold mb-4">Order not found.</p>
        <button onClick={() => onNavigate('orders')} className="text-[#0190a6] hover:underline font-semibold">
          Return to Orders
        </button>
      </div>
    );
  }

  // Find the ordered product info
  const orderItem = order.products.find((p) => p.productId === productId);
  if (!orderItem) {
    return (
      <div className="bg-[#e3e6e6] min-h-screen py-10 flex flex-col items-center justify-center">
        <p className="text-red-600 font-bold mb-4">Product not found in this order.</p>
        <button onClick={() => onNavigate('orders')} className="text-[#0190a6] hover:underline font-semibold">
          Return to Orders
        </button>
      </div>
    );
  }

  // Find product descriptive details
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return (
      <div className="bg-[#e3e6e6] min-h-screen py-10 flex flex-col items-center justify-center">
        <p className="text-red-600 font-bold mb-4">Product details not found.</p>
        <button onClick={() => onNavigate('orders')} className="text-[#0190a6] hover:underline font-semibold">
          Return to Orders
        </button>
      </div>
    );
  }

  const productImageUrl = product.image.startsWith('http') ? product.image : `https://amazon-clone-gamma-blond.vercel.app/${product.image}`;

  // Calculate progress percent
  const orderTimeMs = new Date(order.orderTime).getTime();
  const deliveryDays = orderItem.deliveryDays || 7;
  const deliveryTimeMs = orderTimeMs + (deliveryDays * 24 * 60 * 60 * 1000);
  const currentTimeMs = new Date().getTime();

  let progressPercent = ((currentTimeMs - orderTimeMs) / (deliveryTimeMs - orderTimeMs)) * 100;
  if (isNaN(progressPercent) || progressPercent < 0) progressPercent = 0;
  if (progressPercent > 100) progressPercent = 100;

  // Determine active status
  let status = 'preparing'; // 'preparing' | 'shipped' | 'delivered'
  if (progressPercent >= 50 && progressPercent < 100) {
    status = 'shipped';
  } else if (progressPercent >= 100) {
    status = 'delivered';
  }

  return (
    <div className="bg-white min-h-screen py-8 text-[#0f1111]">
      <div className="max-w-[650px] mx-auto px-6">
        {/* Back Link */}
        <button
          onClick={() => onNavigate('orders')}
          className="text-[#0190a6] hover:text-[#c45500] hover:underline text-sm font-semibold mb-6 flex items-center gap-1"
        >
          View all orders &rarr;
        </button>

        {/* Tracking Main Box */}
        <div className="border border-[#d5d9d9] rounded-lg p-8 shadow-sm">
          {/* Details Rows */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold leading-tight">
                Arriving on: {orderItem.estimatedDeliveryDate}
              </h1>
              <p className="text-gray-600 text-sm">{product.name}</p>
              <p className="text-gray-600 text-sm font-semibold">Quantity: {orderItem.quantity}</p>
            </div>

            {/* Product Image */}
            <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center border border-[#e0e0e0] p-1.5 rounded bg-gray-50">
              <img
                src={productImageUrl}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Status Label Row */}
          <div className="flex justify-between items-center mb-4 text-sm font-bold">
            <div className="w-1/3 flex justify-start">
              {status === 'preparing' ? (
                <span className="bg-[#ffd814] text-black font-bold px-4 py-1.5 rounded-full text-center">
                  Preparing
                </span>
              ) : (
                <span className="text-gray-400 font-bold px-4 py-1.5">Preparing</span>
              )}
            </div>

            <div className="w-1/3 flex justify-center">
              {status === 'shipped' ? (
                <span className="bg-[#ffd814] text-black font-bold px-4 py-1.5 rounded-full text-center">
                  Shipped
                </span>
              ) : (
                <span className="text-gray-400 font-bold px-4 py-1.5">Shipped</span>
              )}
            </div>

            <div className="w-1/3 flex justify-end">
              {status === 'delivered' ? (
                <span className="bg-[#ffd814] text-black font-bold px-4 py-1.5 rounded-full text-center">
                  Delivered
                </span>
              ) : (
                <span className="text-gray-400 font-bold px-4 py-1.5">Delivered</span>
              )}
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full bg-[#f0f2f2] h-6 rounded-full overflow-hidden border border-[#d5d9d9] p-0.5">
            <div
              style={{ width: `${Math.max(progressPercent, 4)}%` }}
              className="bg-[#007600] h-full rounded-full transition-all duration-500 flex items-center justify-end pr-1.5"
            >
              <div className="w-3.5 h-3.5 bg-[#007600] border-2 border-white rounded-full flex-shrink-0 shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
