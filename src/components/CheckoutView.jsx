import { useState } from 'react';
import { useCart, deliveryOptions, getDeliveryDateString } from '../context/CartContext';
import { products } from '../data/products';

export default function CheckoutView({ onNavigate }) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    updateDeliveryOption,
    placeOrder,
    cartQuantity
  } = useCart();

  // State to track which item is being edited (by productId)
  const [editingId, setEditingId] = useState(null);
  const [editVal, setEditVal] = useState(1);

  // Map cart items to actual product details
  const cartWithDetails = cart.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    const selectedOption = deliveryOptions.find((o) => o.id === cartItem.deliveryOptionId) || deliveryOptions[0];
    
    return {
      ...cartItem,
      product,
      selectedOption
    };
  }).filter((item) => item.product !== undefined); // filter out invalid products

  // Calculate totals
  const itemsCostCents = cartWithDetails.reduce((sum, item) => sum + (item.product.priceCents * item.quantity), 0);
  const shippingCostCents = cartWithDetails.reduce((sum, item) => sum + item.selectedOption.priceCents, 0);
  const totalBeforeTaxCents = itemsCostCents + shippingCostCents;
  const taxCents = Math.round(totalBeforeTaxCents * 0.1);
  const orderTotalCents = totalBeforeTaxCents + taxCents;

  const handleEditClick = (productId, currentQty) => {
    setEditingId(productId);
    setEditVal(currentQty);
  };

  const handleSaveClick = (productId) => {
    const qty = parseInt(editVal, 10);
    if (!isNaN(qty) && qty > 0) {
      updateQuantity(productId, qty);
    } else if (qty === 0) {
      removeFromCart(productId);
    }
    setEditingId(null);
  };

  const handlePlaceOrder = () => {
    const orderId = placeOrder({
      orderTotalCents
    });
    if (orderId) {
      onNavigate('orders');
    }
  };

  if (cartWithDetails.length === 0) {
    return (
      <div className="bg-[#e3e6e6] min-h-screen py-10">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="bg-white border border-[#e0e0e0] rounded p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#c45500] mb-4">Your Amazon Cart is empty.</h2>
            <p className="text-gray-600 mb-6">You have no items in your cart. Go add some products!</p>
            <button
              onClick={() => onNavigate('home')}
              className="py-2.5 px-6 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#e7a816] rounded-full text-sm font-medium border border-[#fcd200] cursor-pointer transition-colors shadow-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#e3e6e6] min-h-screen py-8">
      <div className="max-w-[1100px] mx-auto px-6">
        <h1 className="text-2xl font-bold text-[#0f1111] mb-6">Review your order&rarr;</h1>
        
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Left: Cart Items List */}
          <div className="flex-grow w-full lg:w-2/3 flex flex-col gap-4">
            {cartWithDetails.map((item) => {
              const product = item.product;
              const formattedPrice = (product.priceCents / 100).toFixed(2);
              const productImageUrl = product.image.startsWith('http') ? product.image : `https://amazon-clone-gamma-blond.vercel.app/${product.image}`;
              const arrivalDate = getDeliveryDateString(item.selectedOption.deliveryDays);

              return (
                <div key={product.id} className="bg-white border border-[#e0e0e0] rounded p-6 shadow-sm">
                  {/* Delivery Date Header */}
                  <div className="text-lg font-bold text-[#007600] mb-4">
                    Delivery date: {arrivalDate}
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Details Section (Left) */}
                    <div className="flex-grow flex gap-4 md:w-1/2">
                      <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 flex items-center justify-center bg-gray-50">
                        <img
                          src={productImageUrl}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[#0f1111] text-sm md:text-base leading-tight mb-1">
                          {product.name}
                        </h3>
                        <div className="text-base font-bold text-[#b12704] mb-2">
                          ${formattedPrice}
                        </div>
                        
                        {/* Quantity Row with Edit/Save/Delete */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#0f1111]">
                          {editingId === product.id ? (
                            <>
                              <span>Quantity:</span>
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={editVal}
                                onChange={(e) => setEditVal(e.target.value)}
                                className="w-16 border border-[#d5d9d9] rounded px-1.5 py-0.5 text-center outline-none"
                              />
                              <button
                                onClick={() => handleSaveClick(product.id)}
                                className="text-[#0190a6] hover:text-[#c45500] hover:underline cursor-pointer"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="text-[#0190a6] hover:text-[#c45500] hover:underline cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <span>
                                Quantity: <span className="font-bold">{item.quantity}</span>
                              </span>
                              <button
                                onClick={() => handleEditClick(product.id, item.quantity)}
                                className="text-[#0190a6] hover:text-[#c45500] hover:underline cursor-pointer"
                              >
                                Update
                              </button>
                            </>
                          )}
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-[#0190a6] hover:text-[#c45500] hover:underline cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Options Section (Right) */}
                    <div className="w-full md:w-1/2 flex flex-col gap-3">
                      <h4 className="font-bold text-sm text-[#0f1111]">Choose a delivery option:</h4>
                      
                      <div className="flex flex-col gap-2.5">
                        {deliveryOptions.map((option) => {
                          const isChecked = item.deliveryOptionId === option.id;
                          const optionDate = getDeliveryDateString(option.deliveryDays);
                          const shippingText = option.priceCents === 0 ? 'FREE Shipping' : `$${(option.priceCents / 100).toFixed(2)} - Shipping`;

                          return (
                            <label
                              key={option.id}
                              className="flex items-start gap-2.5 cursor-pointer group"
                            >
                              <input
                                type="radio"
                                name={`delivery-${product.id}`}
                                checked={isChecked}
                                onChange={() => updateDeliveryOption(product.id, option.id)}
                                className="mt-1 cursor-pointer accent-[#e77600] w-4 h-4"
                              />
                              <div className="flex flex-col text-sm leading-tight">
                                <span className={`font-bold ${isChecked ? 'text-[#007600]' : 'text-[#0f1111]'}`}>
                                  {optionDate}
                                </span>
                                <span className="text-gray-500 font-normal mt-0.5">
                                  {shippingText}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-1/3 bg-white border border-[#e0e0e0] rounded p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#0f1111] mb-4">Order Summary</h2>
            
            <div className="flex flex-col gap-3 text-sm text-[#0f1111] border-b border-[#f0f2f2] pb-4 mb-4">
              <div className="flex justify-between">
                <span>Items ({cartQuantity}):</span>
                <span>${(itemsCostCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping &amp; handling:</span>
                <span>${(shippingCostCents / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-sm text-[#0f1111] border-b border-[#f0f2f2] pb-4 mb-4">
              <div className="flex justify-between">
                <span>Total before tax:</span>
                <span>${(totalBeforeTaxCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax (10%):</span>
                <span>${(taxCents / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline text-[#b12704] text-lg font-bold mb-6">
              <span>Order total:</span>
              <span>${(orderTotalCents / 100).toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#e7a816] rounded-full text-sm font-semibold border border-[#fcd200] cursor-pointer transition-colors shadow-sm text-center"
            >
              Place your order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
