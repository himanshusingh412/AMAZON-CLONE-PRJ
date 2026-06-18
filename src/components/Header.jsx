import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Header({ currentPage, search, setSearch, onNavigate }) {
  const { cartQuantity } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  // Sync scroll lock on body when sidebar or account menu is open
  useEffect(() => {
    if (sidebarOpen || accountMenuOpen) {
      document.body.classList.add('stop-scroll');
    } else {
      document.body.classList.remove('stop-scroll');
    }
    return () => {
      document.body.classList.remove('stop-scroll');
    };
  }, [sidebarOpen, accountMenuOpen]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setSearch('');
    onNavigate('home');
  };

  // Checkout simplified header
  if (currentPage === 'checkout') {
    return (
      <header className="bg-white border-b border-[#dddddd] h-[60px] sticky top-0 z-50 flex items-center shadow-sm font-sans">
        <div className="max-w-[1100px] w-full mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div onClick={handleLogoClick} className="cursor-pointer flex items-center">
            <img
              src="/images/logo.png"
              alt="Amazon"
              className="h-9 object-contain bg-[#131a22] px-2 py-1 rounded"
            />
          </div>

          {/* Checkout Title */}
          <div className="text-xl md:text-2xl font-medium text-[#0f1111] text-center flex-grow">
            Checkout (
            <button
              onClick={() => onNavigate('checkout')}
              className="text-[#0190a6] hover:text-[#c45500] hover:underline font-semibold"
            >
              {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}
            </button>
            )
          </div>

          {/* Lock Icon */}
          <div>
            <img
              src="https://amazon-clone-gamma-blond.vercel.app/images/icons/checkout-lock-icon.png"
              alt="Secure Checkout"
              className="h-6 object-contain"
            />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Sidebar Drawer */}
      <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="hdn-head">
          <h2>Hello, Sign in</h2>
        </div>
        
        <div className="hdn-content">
          <h3>Digital Content & Devices</h3>
          <ul>
            <div onClick={() => { setSidebarOpen(false); setSearch('music'); onNavigate('home'); }}>
              <li>Amazon Music</li>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            <div onClick={() => { setSidebarOpen(false); setSearch('books'); onNavigate('home'); }}>
              <li>Kindle E-Readers & Books</li>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            <div onClick={() => { setSidebarOpen(false); setSearch('app'); onNavigate('home'); }}>
              <li>Appstore for Android</li>
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </ul>
          <div className="line"></div>
        </div>

        <div className="hdn-content">
          <h3>Shop By Department</h3>
          <ul>
            <div onClick={() => { setSidebarOpen(false); setSearch('electronics'); onNavigate('home'); }}>
              <li>Electronics</li>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            <div onClick={() => { setSidebarOpen(false); setSearch('computer'); onNavigate('home'); }}>
              <li>Computers</li>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            <div onClick={() => { setSidebarOpen(false); setSearch('home'); onNavigate('home'); }}>
              <li>Smart Homes</li>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            <div onClick={() => { setSidebarOpen(false); setSearch('craft'); onNavigate('home'); }}>
              <li>Arts & Crafts</li>
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </ul>
          <div className="line"></div>
        </div>

        <div className="hdn-content">
          <h3>Programs & Features</h3>
          <ul>
            <div onClick={() => { setSidebarOpen(false); setSearch('gift card'); onNavigate('home'); }}>
              <li>Gift Cards & Mobile Recharges</li>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            <div onClick={() => { setSidebarOpen(false); setSearch('flight'); onNavigate('home'); }}>
              <li>Flight Tickets</li>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            <div onClick={() => { setSidebarOpen(false); setSearch('clearance'); onNavigate('home'); }}>
              <li>Clearance Store</li>
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </ul>
          <div className="line"></div>
        </div>
      </div>

      {/* Cross Close Button for Sidebar */}
      <i 
        className={`fa-solid fa-xmark ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></i>

      {/* Accounts & Lists Dropdown Menu */}
      <div className={`triangle ${accountMenuOpen ? 'active' : ''}`}></div>
      <div className={`hdn-sign ${accountMenuOpen ? 'active' : ''}`}>
        <div className="hdn-table">
          <div>
            <h3>Your Lists</h3>
            <ul>
              <li>Create a List</li>
              <li>Find a List & Registry</li>
              <li>Amazon Smile Charity Lists</li>
            </ul>
          </div>
          <div className="hdn-line"></div>
          <div>
            <h3>Your Account</h3>
            <ul>
              <li onClick={() => { setAccountMenuOpen(false); onNavigate('orders'); }}>Account</li>
              <li onClick={() => { setAccountMenuOpen(false); onNavigate('orders'); }}>Orders</li>
              <li>Recommendations</li>
              <li>Browsing History</li>
              <li>Watchlist</li>
              <li>Video Purchases</li>
              <li>Kindle Unlimited</li>
              <li>Content & Devices</li>
              <li>Subscribe & Save Items</li>
              <li>Membership</li>
              <li>Music Library</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Black Background Overlays */}
      <div 
        className={`black ${sidebarOpen ? 'active' : ''} ${accountMenuOpen ? 'active-1' : ''}`}
        onClick={() => {
          setSidebarOpen(false);
          setAccountMenuOpen(false);
        }}
      ></div>

      {/* Header Container */}
      <header>
        {/* First Row */}
        <div className="first">
          <div className="flex logo">
            <a href="#" onClick={handleLogoClick}>
              <img src="/images/logo.png" alt="Amazon Logo" />
            </a>
            <div className="map flex">
              <i className="fas fa-map-marker"></i>
              <div>
                <span>Deliver to</span>
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="flex input">
            <div>
              <span>All</span>
              <i className="fas fa-caret-down"></i>
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Amazon"
            />
            <i className="fas fa-search" onClick={() => onNavigate('home')}></i>
          </div>

          {/* Right Navigation Items */}
          <div className="flex right">
            <div className="flex lang">
              <img src="/images/usflag.jpg" alt="US Flag" />
              <i className="fas fa-caret-down"></i>
            </div>
            
            <div className="sign" onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
              <span>Hello, Sign in</span>
              <div className="flex ac">
                <span>Accounts & Lists</span>
                <i className="fas fa-caret-down"></i>
              </div>
            </div>

            <div className="sign" onClick={() => onNavigate('orders')}>
              <span>Returns</span>
              <span>& Orders</span>
            </div>

            <div className="flex cart" onClick={() => onNavigate('checkout')}>
              <i className="fas fa-shopping-cart"></i>
              <span className="ca">Cart</span>
              <p>{cartQuantity}</p>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="second">
          <div className="second-1" onClick={() => setSidebarOpen(true)}>
            <div>
              <i className="fas fa-bars"></i>
              <span>All</span>
            </div>
          </div>
          <div className="second-2">
            <ul>
              <li onClick={() => { setSearch('deal'); onNavigate('home'); }}>Today's Deal</li>
              <li onClick={() => { setSearch('service'); onNavigate('home'); }}>Customer Service</li>
              <li onClick={() => { setSearch('registry'); onNavigate('home'); }}>Registry</li>
              <li onClick={() => { setSearch('gift card'); onNavigate('home'); }}>Gift Cards</li>
              <li onClick={() => { setSearch('sell'); onNavigate('home'); }}>Sell</li>
            </ul>
          </div>
          <div className="second-3" onClick={() => { setSearch('summer'); onNavigate('home'); }}>
            <span>Shop Summer Sale</span>
          </div>
        </div>
      </header>
    </>
  );
}
