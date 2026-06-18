import { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);
  const timeoutRef = useRef(null);

  const handleAddToCart = () => {
    // Add to cart with chosen quantity
    addToCart(product.id, quantity);
    
    // Show the "Added" message
    setShowAdded(true);

    // Reset the timeout if clicked again
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowAdded(false);
    }, 2000);
  };

  const formattedPrice = (product.priceCents / 100).toFixed(2);
  const ratingStarsString = product.rating.stars * 10;
  const ratingImageUrl = `https://amazon-clone-gamma-blond.vercel.app/images/ratings/rating-${ratingStarsString}.png`;
  const productImageUrl = product.image.startsWith('http') ? product.image : `https://amazon-clone-gamma-blond.vercel.app/${product.image}`;
  const sizeChartUrl = product.sizeChartLink ? `https://amazon-clone-gamma-blond.vercel.app/${product.sizeChartLink}` : '#';

  return (
    <div className="bg-white border border-[#e0e0e0] flex flex-col p-5 relative">
      {/* Product Image Section */}
      <div className="h-44 w-full flex items-center justify-center mb-4">
        <img
          src={productImageUrl}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Title */}
      <h3 className="text-sm text-[#0f1111] leading-tight font-normal h-10 overflow-hidden line-clamp-2 mb-2">
        {product.name}
      </h3>

      {/* Rating Row */}
      <div className="flex items-center gap-1.5 mb-2">
        <img
          src={ratingImageUrl}
          alt={`${product.rating.stars} stars`}
          className="w-24 h-5 object-contain"
        />
        <span className="text-sm text-[#0190a6] hover:text-[#c45500] cursor-pointer">
          {product.rating.count}
        </span>
      </div>

      {/* Price */}
      <div className="text-lg font-bold text-[#0f1111] mb-3">
        ${formattedPrice}
      </div>

      {/* Quantity Selector */}
      <div className="mb-2">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="bg-[#f0f2f2] border border-[#d5d9d9] rounded px-2 py-1 text-sm outline-none cursor-pointer hover:bg-[#e3e6e6] shadow-sm"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Clothing size chart link */}
      {product.type === 'clothing' && (
        <div className="mb-3">
          <a
            href={sizeChartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#0190a6] hover:text-[#c45500]"
          >
            Size Chart
          </a>
        </div>
      )}

      {/* Added checkmark spacer/wrapper */}
      <div className="h-8 flex items-center">
        <div
          className={`flex items-center gap-1 text-[#067d62] text-xs font-semibold transition-opacity duration-300 ${
            showAdded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src="https://amazon-clone-gamma-blond.vercel.app/images/icons/checkmark.png"
            className="w-5 h-5 object-contain"
            alt="checkmark"
          />
          Added
        </div>
      </div>

      {/* Spacer to push button to the bottom */}
      <div className="flex-grow" />

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full py-2 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#e7a816] rounded-full text-sm font-medium border border-[#fcd200] active:shadow-inner cursor-pointer transition-colors shadow-sm"
      >
        Add to Cart
      </button>
    </div>
  );
}
