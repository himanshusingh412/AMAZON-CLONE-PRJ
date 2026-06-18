import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function OrdersView({ onNavigate, onTrackPackage }) {
  const { orders, addToCart } = useCart();

  const formatOrderDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return 'Recent';
    }
  };

  const handleBuyItAgain = (productId) => {
    addToCart(productId, 1);
  };

  if (orders.length === 0) {
    return (
      <div className="bg-[#e3e6e6] min-h-screen py-10">
        <div className="max-w-[850px] mx-auto px-6">
          <div className="bg-white border border-[#e0e0e0] rounded p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#0f1111] mb-4">Your Orders</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <button
              onClick={() => onNavigate('home')}
              className="py-2 px-6 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#e7a816] rounded-full text-sm font-medium border border-[#fcd200] cursor-pointer transition-colors shadow-sm"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-8 text-[#0f1111]">
      <div className="max-w-[850px] mx-auto px-6">
        <h1 className="text-3xl font-extrabold mb-6">Your Orders</h1>

        <div className="flex flex-col gap-8">
          {orders.map((order) => {
            const formattedTotal = (order.totalCostCents / 100).toFixed(2);
            const placedDate = formatOrderDate(order.orderTime);

            return (
              <div key={order.id} className="border border-[#d5d9d9] rounded-lg overflow-hidden shadow-sm">
                {/* Order Header Grid */}
                <div className="bg-[#f0f2f2] border-b border-[#d5d9d9] px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm">
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    {/* Date Placed */}
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-xs font-bold uppercase tracking-wider">Order Placed</span>
                      <span className="text-gray-700 font-semibold mt-0.5">{placedDate}</span>
                    </div>
                    {/* Total */}
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-xs font-bold uppercase tracking-wider">Total</span>
                      <span className="text-gray-700 font-semibold mt-0.5">${formattedTotal}</span>
                    </div>
                  </div>

                  {/* Order ID */}
                  <div className="flex flex-col md:items-end">
                    <span className="text-gray-600 text-xs font-bold uppercase tracking-wider">Order ID</span>
                    <span className="text-gray-700 font-mono mt-0.5 break-all">{order.id}</span>
                  </div>
                </div>

                {/* Order Items Body */}
                <div className="bg-white px-6 py-4 divide-y divide-[#f0f2f2]">
                  {order.products.map((orderItem, index) => {
                    const product = products.find((p) => p.id === orderItem.productId);
                    if (!product) return null;

                    const productImageUrl = product.image.startsWith('http') ? product.image : `https://amazon-clone-gamma-blond.vercel.app/${product.image}`;

                    return (
                      <div key={index} className="py-6 first:pt-2 last:pb-2 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex gap-4 items-center">
                          {/* Image */}
                          <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-gray-50 border border-[#e0e0e0] p-1.5 rounded">
                            <img
                              src={productImageUrl}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-sm leading-snug max-w-md md:max-w-lg">
                              {product.name}
                            </h3>
                            <div className="text-sm text-gray-700 mt-1">
                              Arriving on: <span className="font-semibold text-gray-900">{orderItem.estimatedDeliveryDate}</span>
                            </div>
                            <div className="text-sm text-gray-700">
                              Quantity: <span className="font-semibold text-gray-900">{orderItem.quantity}</span>
                            </div>
                            
                            {/* Buy It Again Button */}
                            <button
                              onClick={() => handleBuyItAgain(product.id)}
                              className="mt-2 w-max py-1.5 px-3 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#e7a816] border border-[#fcd200] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <img
                                src="https://amazon-clone-gamma-blond.vercel.app/images/icons/buy-it-again.png"
                                className="w-4 h-4 object-contain"
                                alt="Buy it again"
                              />
                              Buy it again
                            </button>
                          </div>
                        </div>

                        {/* Track Package Button */}
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => onTrackPackage(order.id, product.id)}
                            className="w-full md:w-auto py-2 px-6 bg-white hover:bg-[#f7fafa] active:bg-[#f0f2f2] border border-[#d5d9d9] rounded-lg text-sm font-medium cursor-pointer transition-colors shadow-sm text-center"
                          >
                            Track package
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
