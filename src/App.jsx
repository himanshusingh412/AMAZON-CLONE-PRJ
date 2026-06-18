import { useState } from 'react';
import './App.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomeView from './components/HomeView';
import CheckoutView from './components/CheckoutView';
import OrdersView from './components/OrdersView';
import TrackingView from './components/TrackingView';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'checkout' | 'orders' | 'tracking'
  const [search, setSearch] = useState('');
  const [trackingParams, setTrackingParams] = useState(null); // { orderId, productId }

  const handleNavigate = (page) => {
    setCurrentPage(page);
    // Scroll to top on page navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderActiveView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView search={search} setSearch={setSearch} onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutView onNavigate={handleNavigate} />;
      case 'orders':
        return (
          <OrdersView
            onNavigate={handleNavigate}
            onTrackPackage={(orderId, productId) => {
              setTrackingParams({ orderId, productId });
              handleNavigate('tracking');
            }}
          />
        );
      case 'tracking':
        return (
          <TrackingView
            orderId={trackingParams?.orderId}
            productId={trackingParams?.productId}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <HomeView search={search} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#e3e6e6] flex flex-col font-sans">
        {/* Header */}
        <Header
          currentPage={currentPage}
          search={search}
          setSearch={setSearch}
          onNavigate={handleNavigate}
        />

        {/* Main Content View */}
        <main className="flex-grow">
          {renderActiveView()}
        </main>
      </div>
    </CartProvider>
  );
}