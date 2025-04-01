import React, { useEffect, useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash.debounce';
import { Link, useNavigate } from 'react-router-dom';
import ConnectionError from '../../component/connectionerror/ConnectionError';
import { FaSync } from 'react-icons/fa';
import useApi from '../../component/connectionerror/useApi';
import { useTranslation } from 'react-i18next';

interface Product {
  quantity: number;
  _id: string;
  name: string;
  image: string;
  weight: string;
  price: string;
  roastLevel: string;
  origin: string;
}

interface CoffeesProp {
  user: any;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

const OurCoffees = ({ user, setCartCount }: CoffeesProp) => {
  const { t } = useTranslation();
  const [coffeeProducts, setCoffeeProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState('');
  const [roastLevelFilter, setRoastLevelFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [coffeeTypeFilter, setCoffeeTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Create debounced fetch function
  const debouncedFetch = useCallback(debounce(async (params: any) => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/products`, { params });
      setCoffeeProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
      setError(null);
    } catch (err) {
      setError(axios.isAxiosError(err) && err.message === 'Network Error'
        ? 'connection'
        : t('coffees.errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  }, 2000), [t]);

  useEffect(() => {
    const params = {
      search,
      roastLevel: roastLevelFilter,
      origin: originFilter,
      coffeeType: coffeeTypeFilter,
      page,
      limit: 8,
    };
    debouncedFetch(params);

    // Cleanup
    return () => debouncedFetch.cancel();
  }, [search, roastLevelFilter, originFilter, coffeeTypeFilter, page, debouncedFetch]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      setCartCount(parsedCart.reduce((total: number, item: Product) => total + item.quantity, 0));
    }
  }, [setCartCount]);

  const handleAddToCartDirectly = (product: Product) => {
    setSelectedProduct(product);
    setShowQuantityPopup(true);
  };

  const handleAddToCartWithQuantity = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
      let updatedCart;

      if (existingProductIndex > -1) {
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
      } else {
        updatedCart = [...prevCart, { ...product, quantity }];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartCount(updatedCart.reduce((total: number, item: Product) => total + item.quantity, 0));
      return updatedCart;
    });

    setShowQuantityPopup(false);
    setQuantity(1);
  };

  const loadMoreProducts = () => {
    if (coffeeProducts.length < totalProducts) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No auth token found');
      }

      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const hasShippingDetails = response.data.shippingdetails?.length > 0;

      if (hasShippingDetails) {
        navigate('/itempayment');
      } else {
        navigate(user ? '/shippingform' : '/login', { state: { redirectTo: '/shippingform' } });
      }
    } catch (err) {
      console.error('Error during buy now process', err);
    }
  };

  if (error === 'connection') {
    return <ConnectionError />;
  }

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ReactLoading
          type="spinningBubbles"
          color="#AD7C59"
          height={80}
          width={80}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            {t('coffees.errors.title')}
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#AD7C59] text-white px-4 py-2 rounded hover:bg-[#61300d] transition"
          >
            <FaSync/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-4 h-[200vh]">
      <div className={`productsdiv transition-all duration-300 ${showQuantityPopup ? 'blur-sm' : ''}`}>
        <div className="search flex flex-wrap justify-between gap-4 mb-6">
          <div className="flex border border-gray-300 rounded-lg w-full md:w-1/3">
            <input
              type="text"
              placeholder={t('coffees.searchPlaceholder')}
              className="w-70 rounded-l-lg relative"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="text-gray-600 p-2 text-xl relative right-7" />
          </div>

          <select
            className="border px-4 py-2 rounded w-full md:w-auto"
            value={roastLevelFilter}
            onChange={(e) => setRoastLevelFilter(e.target.value)}
          >
            <option value="">{t('coffees.filters.roastLevel')}</option>
            <option value="Light">{t('coffees.filters.light')}</option>
            <option value="Medium">{t('coffees.filters.medium')}</option>
            <option value="Dark">{t('coffees.filters.dark')}</option>
          </select>

          <select
            className="border px-4 py-2 rounded w-full md:w-auto"
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
          >
            <option value="">{t('coffees.filters.origin')}</option>
            <option value="Jimma">{t('coffees.filters.jimma')}</option>
            <option value="Sidamo">{t('coffees.filters.sidamo')}</option>
            <option value="Yirgacheffe">{t('coffees.filters.yirgacheffe')}</option>
          </select>

          <select
            className="border px-4 py-2 rounded w-full md:w-auto"
            value={coffeeTypeFilter}
            onChange={(e) => setCoffeeTypeFilter(e.target.value)}
          >
            <option value="">{t('coffees.filters.coffeeType')}</option>
            <option value="Whole">{t('coffees.filters.wholeBean')}</option>
            <option value="Grinded">{t('coffees.filters.ground')}</option>
          </select>
        </div>

        <div className="product grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 rounded-2xl">
          {coffeeProducts.length > 0 ? (
            coffeeProducts.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:scale-[1.02]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="productimg w-full h-48 object-cover rounded-2xl mb-4 transition-transform duration-300 hover:scale-105"
                />
                
                <h3 className="productdisc text-lg font-semibold transition-colors duration-300 hover:text-[#AD7C59]">{product.name}</h3>
                <p className="productdisc text-gray-600 transition-colors duration-300 hover:text-gray-800">{product.weight}</p>
                <p className="productdisc text-xl font-bold mt-2 transition-colors duration-300 hover:text-[#61300d]">{product.price}</p>

                <div className="mt-4 flex justify-between gap-2">
                  <button
                    className="productsbtn bg-[#AD7C59] text-white py-2 px-4 rounded-xl hover:bg-[#61300d] cursor-pointer w-full"
                    onClick={() => handleAddToCartDirectly(product)}
                  >
                    {t('coffees.addToCart')}
                  </button>

                  <button
                    className="productsbtn bg-[#AD7C59] text-white py-2 px-4 rounded-xl hover:bg-[#61300d] cursor-pointer w-full"
                    onClick={handleBuyNow}
                  >
                    {t('coffees.buyNow')}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">{t('coffees.noProducts')}</div>
          )}
        </div>

        {coffeeProducts.length < totalProducts && (
          <div className="flex justify-center mt-6">
            <button
              className="bg-[#AD7C59] text-white px-6 py-2 rounded hover:bg-[#61300d]"
              onClick={loadMoreProducts}
              disabled={loading}
            >
              {loading ? t('coffees.loading') : t('coffees.loadMore')}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showQuantityPopup && selectedProduct && (
          <>
            <motion.div
              className="fixed inset-0 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuantityPopup(false)}
            />
            <motion.div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white p-6 shadow-xl border-t rounded-t-lg z-50"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-lg font-semibold mb-4">
                {t('coffees.quantityPopup.title')} {selectedProduct.name}
              </h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-xl text-xl"
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                >
                  -
                </button>
                <span className="text-2xl font-bold w-10 text-center">{quantity}</span>
                <button
                  className="bg-gray-300 px-4 py-2 rounded-xl text-xl"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded border border-gray-300 w-full"
                  onClick={() => setShowQuantityPopup(false)}
                >
                  {t('coffees.quantityPopup.cancel')}
                </button>
                <button
                  className="bg-[#AD7C59] text-white px-4 py-2 rounded hover:bg-[#61300d] w-full"
                  onClick={() => handleAddToCartWithQuantity(selectedProduct, quantity)}
                >
                  {t('coffees.addToCart')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OurCoffees;