import { useRef } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function HomeView({ search, setSearch, onNavigate }) {
  const wirelessCarouselRef = useRef(null);
  const pcCarouselRef = useRef(null);
  const booksCarouselRef = useRef(null);

  const scrollCarousel = (ref, offset) => {
    if (ref.current) {
      ref.current.scrollLeft += offset;
    }
  };

  const handleCategoryClick = (categorySearch) => {
    setSearch(categorySearch);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products for the search view
  const filteredProducts = products.filter((product) => {
    if (!search) return true;
    const query = search.toLowerCase().trim();
    
    // Match name or keywords
    const matchesName = product.name.toLowerCase().includes(query);
    const matchesKeywords = product.keywords && product.keywords.some((kw) => 
      kw.toLowerCase().includes(query)
    );
    
    return matchesName || matchesKeywords;
  });

  // If a search query is active, display the interactive product grid
  if (search) {
    return (
      <div className="bg-[#e3e6e6] min-h-screen py-10 font-sans">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Search Results for "{search}"
            </h2>
            <button
              onClick={() => setSearch('')}
              className="text-[#007185] hover:text-[#c45500] hover:underline font-semibold cursor-pointer"
            >
              Clear Search &larr;
            </button>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5 gap-x-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#e0e0e0] rounded p-10 text-center">
              <h2 className="text-xl font-bold text-[#c45500] mb-2">No products found</h2>
              <p className="text-sm text-gray-600">
                We couldn't find any products matching "{search}". Try checking your spelling or using different keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default Amazon landing page dashboard layout
  return (
    <>
      <section className="sec-1">
        <div className="mock-container">
          {/* Automated Image Slider */}
          <div className="slider">
            <div className="image-box">
              <div className="slide">
                <img src="/images/summer_sale_banner.png" alt="Summer Sale Banner" />
              </div>
            </div>
          </div>

          <div className="container-1">
            {/* Country/Deliver Notification banner */}
            <div className="para">
              <p>
                You are on the local React Amazon Clone. Explore millions of products with fast local delivery.
              </p>
            </div>

            {/* Bento Grid Comp 1 */}
            <div className="product-comp">
              <div className="box">
                <h3>Gaming Accessories</h3>
                <div className="box-a">
                  <div onClick={() => handleCategoryClick('socks')}>
                    <img src="/images/ga1.jpg" alt="Headsets" />
                    <span>Headsets</span>
                  </div>
                  <div onClick={() => handleCategoryClick('sports')}>
                    <img src="/images/ga2.jpg" alt="Keyboards" />
                    <span>Keyboards</span>
                  </div>
                  <div onClick={() => handleCategoryClick('sports')}>
                    <img src="/images/ga3.jpg" alt="Computer mice" />
                    <span>Computer mice</span>
                  </div>
                  <div onClick={() => handleCategoryClick('sports')}>
                    <img src="/images/ga4.jpg" alt="Chairs" />
                    <span>Chairs</span>
                  </div>
                </div>
                <a href="#" onClick={() => handleCategoryClick('sports')}>See More</a>
              </div>

              <div className="box">
                <h3>Shop By Category</h3>
                <div className="box-a">
                  <div onClick={() => handleCategoryClick('electronics')}>
                    <img src="/images/sc1.jpg" alt="Laptop" />
                    <span>Laptop</span>
                  </div>
                  <div onClick={() => handleCategoryClick('sports')}>
                    <img src="/images/sc2.jpg" alt="Video Games" />
                    <span>Video Games</span>
                  </div>
                  <div onClick={() => handleCategoryClick('socks')}>
                    <img src="/images/sc3.jpg" alt="Baby" />
                    <span>Baby</span>
                  </div>
                  <div onClick={() => handleCategoryClick('apparel')}>
                    <img src="/images/sc4.jpg" alt="Toy & Games" />
                    <span>Toy & Games</span>
                  </div>
                </div>
                <a href="#" onClick={() => handleCategoryClick('apparel')}>Shop Now</a>
              </div>

              <div className="box box-c" onClick={() => handleCategoryClick('kitchen')}>
                <h3>Amazon Basics</h3>
                <div>
                  <img src="/images/amazon basics.jpg" alt="Amazon Basics" />
                </div>
                <a href="#" onClick={() => handleCategoryClick('kitchen')}>See More</a>
              </div>

              <div className="box-b">
                <div className="best">
                  <h3>Sign up for the Best Experience</h3>
                  <button onClick={() => onNavigate('orders')}>Sign in securely</button>
                </div>
                <div>
                  <img src="/images/banner.jpg" alt="Banner Promotion" />
                </div>
              </div>
            </div>

            {/* Bento Grid Comp 2 */}
            <div className="product-comp">
              <div className="box box-c" onClick={() => handleCategoryClick('summer')}>
                <h3>Shop Summer Sale</h3>
                <div>
                  <img src="/images/summer_sale_bento.png" alt="Shop Summer Sale" />
                </div>
                <a href="#" onClick={() => handleCategoryClick('summer')}>See More</a>
              </div>

              <div className="box box-c" onClick={() => handleCategoryClick('kitchen')}>
                <h3>Electronics</h3>
                <div>
                  <img src="/images/electronics.jpg" alt="Electronics" />
                </div>
                <a href="#" onClick={() => handleCategoryClick('kitchen')}>See More</a>
              </div>

              <div className="box box-c" onClick={() => handleCategoryClick('kitchen')}>
                <h3>Find your ideal TV</h3>
                <div>
                  <img src="/images/find your deal.jpg" alt="TVs" />
                </div>
                <a href="#" onClick={() => handleCategoryClick('kitchen')}>See More</a>
              </div>

              <div className="box box-c" onClick={() => handleCategoryClick('socks')}>
                <h3>Easy Returns</h3>
                <div>
                  <img src="/images/easy return.jpg" alt="Easy Returns" />
                </div>
                <a href="#" onClick={() => handleCategoryClick('socks')}>See More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wireless Popular Products Carousel Section */}
      <section className="sec-2">
        <div className="slide-sec">
          <div className="l-btn" onClick={() => scrollCarousel(wirelessCarouselRef, -1100)}>
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <div className="r-btn" onClick={() => scrollCarousel(wirelessCarouselRef, 1100)}>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <h3>Popular Products in Wireless Internationally</h3>
          <ul className="product-slide" ref={wirelessCarouselRef}>
            <li onClick={() => handleCategoryClick('sports')}><img src="/images/pinter1.jpg" alt="P1" /></li>
            <li onClick={() => handleCategoryClick('socks')}><img src="/images/pinter2.jpg" alt="P2" /></li>
            <li onClick={() => handleCategoryClick('sports')}><img src="/images/pinter3.jpg" alt="P3" /></li>
            <li onClick={() => handleCategoryClick('sports')}><img src="/images/pinter4.jpg" alt="P4" /></li>
            <li onClick={() => handleCategoryClick('apparel')}><img src="/images/pinter5.jpg" alt="P5" /></li>
            <li onClick={() => handleCategoryClick('apparel')}><img src="/images/pinter6.jpg" alt="P6" /></li>
            <li onClick={() => handleCategoryClick('apparel')}><img src="/images/pinter7.jpg" alt="P7" /></li>
            <li onClick={() => handleCategoryClick('sports')}><img src="/images/pinter8.jpg" alt="P8" /></li>
            <li onClick={() => handleCategoryClick('socks')}><img src="/images/pinter9.jpg" alt="P9" /></li>
            <li onClick={() => handleCategoryClick('socks')}><img src="/images/pinter10.jpg" alt="P10" /></li>
            <li onClick={() => handleCategoryClick('sports')}><img src="/images/pinter11.jpg" alt="P11" /></li>
            <li onClick={() => handleCategoryClick('sports')}><img src="/images/pinter12.jpg" alt="P12" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pinter13.jpg" alt="P13" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pinter14.jpg" alt="P14" /></li>
            <li onClick={() => handleCategoryClick('sports')}><img src="/images/pinter15.jpg" alt="P15" /></li>
          </ul>
        </div>
      </section>

      {/* PC Popular Products Carousel Section */}
      <section className="sec-2">
        <div className="slide-sec">
          <div className="l-btn btn-1b" onClick={() => scrollCarousel(pcCarouselRef, -1100)}>
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <div className="r-btn btn-1a" onClick={() => scrollCarousel(pcCarouselRef, 1100)}>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <h3>Popular Products in PC Internationally</h3>
          <ul className="product-slide product-slide-1" ref={pcCarouselRef}>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc2.jpg" alt="PC2" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc3.jpg" alt="PC3" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc4.jpg" alt="PC4" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc5.jpg" alt="PC5" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc6.jpg" alt="PC6" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc7.jpg" alt="PC7" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc8.jpg" alt="PC8" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc9.jpg" alt="PC9" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc10.jpg" alt="PC10" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc11.jpg" alt="PC11" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc12.jpg" alt="PC12" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc13.jpg" alt="PC13" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc14.jpg" alt="PC14" /></li>
            <li onClick={() => handleCategoryClick('kitchen')}><img src="/images/pc15.jpg" alt="PC15" /></li>
          </ul>
        </div>
      </section>

      {/* Bento Grid Comp 3 */}
      <div className="product-comp">
        <div className="box box-c" onClick={() => handleCategoryClick('sports')}>
          <h3>Shop Activity Trackers and Smart Watches</h3>
          <div>
            <img src="/images/watch.jpg" alt="Watches" />
          </div>
          <a href="#" onClick={() => handleCategoryClick('sports')}>See More</a>
        </div>

        <div className="box box-d">
          <h3>Comfy Styles for Men</h3>
          <div className="box-a">
            <div onClick={() => handleCategoryClick('apparel')}>
              <img src="/images/cm1.jpg" alt="Sweatshirts" />
              <span>Sweatshirts</span>
            </div>
            <div onClick={() => handleCategoryClick('apparel')}>
              <img src="/images/cm2.jpg" alt="Joggers" />
              <span>Joggers</span>
            </div>
            <div onClick={() => handleCategoryClick('apparel')}>
              <img src="/images/cm3.jpg" alt="Cardigans" />
              <span>Cardigans</span>
            </div>
            <div onClick={() => handleCategoryClick('apparel')}>
              <img src="/images/cm4.jpg" alt="Easy Tees" />
              <span>Easy Tees</span>
            </div>
          </div>
          <a href="#" onClick={() => handleCategoryClick('apparel')}>See More</a>
        </div>

        <div className="box box-d">
          <h3>Gaming Merchandise</h3>
          <div className="box-a">
            <div onClick={() => handleCategoryClick('apparel')}>
              <img src="/images/gm1.jpg" alt="Apparel" />
              <span>Apparel</span>
            </div>
            <div onClick={() => handleCategoryClick('apparel')}>
              <img src="/images/gm2.jpg" alt="Hats" />
              <span>Hats</span>
            </div>
            <div onClick={() => handleCategoryClick('apparel')}>
              <img src="/images/gm3.jpg" alt="Action Figures" />
              <span>Action Figures</span>
            </div>
            <div onClick={() => handleCategoryClick('apparel')}>
              <img src="/images/gm4.jpg" alt="Mugs" />
              <span>Mugs</span>
            </div>
          </div>
          <a href="#" onClick={() => handleCategoryClick('apparel')}>See More</a>
        </div>

        <div className="box box-c" onClick={() => handleCategoryClick('bathroom')}>
          <h3>Shop Pet Supplies</h3>
          <div>
            <img src="/images/pets.jpg" alt="Pets" />
          </div>
          <a href="#" onClick={() => handleCategoryClick('bathroom')}>See More</a>
        </div>
      </div>

      {/* Bento Grid Comp 4 */}
      <div className="product-comp">
        <div className="box box-c" onClick={() => handleCategoryClick('sports')}>
          <h3>For your Fitness Needs</h3>
          <div>
            <img src="/images/fitness.jpg" alt="Fitness" />
          </div>
          <a href="#" onClick={() => handleCategoryClick('sports')}>Shop Now</a>
        </div>

        <div className="box box-c" onClick={() => handleCategoryClick('appliances')}>
          <h3>Create with Strip Lights</h3>
          <div>
            <img src="/images/light.jpg" alt="Strip Lights" />
          </div>
          <a href="#" onClick={() => handleCategoryClick('appliances')}>Shop Now</a>
        </div>

        <div className="box box-c" onClick={() => handleCategoryClick('apparel')}>
          <h3>New arrivals in Toys</h3>
          <div>
            <img src="/images/craft.jpg" alt="Toys" />
          </div>
          <a href="#" onClick={() => handleCategoryClick('apparel')}>Shop Now</a>
        </div>

        <div className="box box-c" onClick={() => handleCategoryClick('books')}>
          <h3>Kindle E Readers</h3>
          <div>
            <img src="/images/reader.jpg" alt="Kindle" />
          </div>
          <a href="#" onClick={() => handleCategoryClick('books')}>Shop Now</a>
        </div>
      </div>

      {/* Books Carousel Section */}
      <section className="sec-2">
        <div className="slide-sec">
          <div className="l-btn btn-1c" onClick={() => scrollCarousel(booksCarouselRef, -1100)}>
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <div className="r-btn btn-1d" onClick={() => scrollCarousel(booksCarouselRef, 1100)}>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <h3>Top Sellers in Books</h3>
          <ul className="product-slide product-slide-2" ref={booksCarouselRef}>
            <li onClick={() => handleCategoryClick('books')}><img src="/images/b1.jpg" alt="B1" /></li>
            <li onClick={() => handleCategoryClick('books')}><img src="/images/b2.jpg" alt="B2" /></li>
            <li onClick={() => handleCategoryClick('books')}><img src="/images/b3.jpg" alt="B3" /></li>
            <li onClick={() => handleCategoryClick('books')}><img src="/images/b4.jpg" alt="B4" /></li>
            <li onClick={() => handleCategoryClick('books')}><img src="/images/b5.jpg" alt="B5" /></li>
            <li onClick={() => handleCategoryClick('books')}><img src="/images/b6.jpg" alt="B6" /></li>
            <li onClick={() => handleCategoryClick('books')}><img src="/images/b7.jpg" alt="B7" /></li>
            <li onClick={() => handleCategoryClick('books')}><img src="/images/b8.jpg" alt="B8" /></li>
            <li onClick={() => handleCategoryClick('books')}><img src="/images/b9.jpg" alt="B9" /></li>
            <li onClick={() => handleCategoryClick('books')}><img src="/images/b10.jpg" alt="B10" /></li>
          </ul>
        </div>
      </section>

      {/* Footer Section */}
      <section className="footer">
        <div className="backtop" onClick={handleBackToTop}>
          <span>Back to Top</span>
        </div>
        <div className="detail">
          <div className="table">
            <div>
              <div className="t-head">Get to Know Us</div>
              <ul>
                <li>Careers</li>
                <li>Blogs</li>
                <li>About Amazon</li>
                <li>Investor Relations</li>
                <li>Amazon Advices</li>
                <li>Amazon Science</li>
              </ul>
            </div>

            <div>
              <div className="t-head">Make Money with Us</div>
              <ul>
                <li>Sell Products on Amazon</li>
                <li>Sell on Amazon Business</li>
                <li>Sell Apps on Amazon</li>
                <li>Become an Affiliate</li>
                <li>Advertise your Products</li>
                <li>Host an Amazon Hub</li>
              </ul>
            </div>

            <div>
              <div className="t-head">Amazon Payment Products</div>
              <ul>
                <li>Amazon Business Cards</li>
                <li>Shop with Points</li>
                <li>Reload your Balance</li>
                <li>Amazon Currency Converter</li>
              </ul>
            </div>

            <div>
              <div className="t-head">Let Us Help You</div>
              <ul>
                <li>Amazon and COVID-19</li>
                <li onClick={() => onNavigate('orders')}>Your Account</li>
                <li onClick={() => onNavigate('orders')}>Your Orders</li>
                <li>Shipping Rates and Policies</li>
                <li>Returns and Replacements</li>
                <li>Manage your Content & Devices</li>
                <li>Amazon Assistant</li>
                <li>Help</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="copy">
          <span>&copy; Designed by HIMANSHU SINGH (Roll No: 2503201000566)</span>
        </div>
      </section>
    </>
  );
}
