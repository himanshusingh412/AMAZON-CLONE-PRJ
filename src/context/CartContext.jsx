import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
    label: 'FREE Shipping',
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499,
    label: '$4.99 - Shipping',
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999,
    label: '$9.99 - Shipping',
  }
];

// Helper to calculate delivery date string (e.g. "Thursday, June 25" or "Thursday, June 25, 2026")
export function getDeliveryDateString(daysOffset, includeYear = false) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  
  const options = includeYear 
    ? { month: 'long', day: 'numeric', year: 'numeric' }
    : { weekday: 'long', month: 'long', day: 'numeric' };
    
  return date.toLocaleDateString('en-US', options);
}

export function CartProvider({ children }) {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Error reading cart from localStorage", e);
      return [];
    }
  });

  // Initialize orders from localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (e) {
      console.error("Error reading orders from localStorage", e);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Total cart items count
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add item to cart
  const addToCart = (productId, quantityToAdd) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.productId === productId);
      
      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        return prevCart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantityToAdd } 
            : item
        );
      } else {
        // Add new item with default delivery option '1'
        return [...prevCart, { productId, quantity: quantityToAdd, deliveryOptionId: '1' }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  // Update item quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Update delivery option for an item in the cart
  const updateDeliveryOption = (productId, deliveryOptionId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, deliveryOptionId } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Place order: moves cart items to orders history and clears cart
  const placeOrder = (totals) => {
    if (cart.length === 0) return null;

    const orderId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    const orderTime = new Date().toISOString();
    
    // Capture the current delivery dates chosen at checkout for each item
    const orderProducts = cart.map((cartItem) => {
      const option = deliveryOptions.find(opt => opt.id === cartItem.deliveryOptionId) || deliveryOptions[0];
      const deliveryDate = getDeliveryDateString(option.deliveryDays, true); // e.g. "June 25, 2026"
      
      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        deliveryOptionId: cartItem.deliveryOptionId,
        estimatedDeliveryDate: deliveryDate,
        orderPlacedTime: orderTime,
        deliveryDays: option.deliveryDays
      };
    });

    const newOrder = {
      id: orderId,
      orderTime,
      totalCostCents: totals.orderTotalCents,
      products: orderProducts
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    
    return orderId;
  };

  const value = {
    cart,
    orders,
    cartQuantity,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateDeliveryOption,
    clearCart,
    placeOrder
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
