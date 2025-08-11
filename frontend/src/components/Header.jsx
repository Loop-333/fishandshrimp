import { FaShoppingCart, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Cart from './Cart';
import { useCart } from '../context/useCart';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (totalQuantity > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);

  return (
    <>
      <header className="sticky top-0 flex flex-wrap items-center justify-between px-4 sm:px-12 py-4 bg-black shadow-md z-50">
        {/* Left spacer */}
        <div className="w-1/3">
          <img
            src="/assets/loja/logomobile.png"
            alt="Logo Mobile"
            className="h-20 w-auto lg:hidden"
          />
        </div>

        {/* Desktop logo */}
        <div className="w-1/3 flex justify-center">
          <img
            src="/assets/loja/logoheader.png"
            alt="Fish and Shrimp Azeitão"
            className="h-28 w-auto hidden lg:block"
          />
          <a className="text-white text-right lg:hidden">
            Contacte-nos <br />
            924 138 294
          </a>
        </div>

        {/* Right navigation */}
        <nav className="w-1/3 flex items-center justify-end gap-6">
          <a className="text-white hover:text-blue-600 transition text-right hidden lg:block">
            Contacte-nos <br />
            924 138 294
          </a>

          <div className="flex gap-4">
            <a href="https://wa.me/351924138294" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-xl text-green-600 hover:text-green-800" />
            </a>
            <a
              href="https://www.instagram.com/fish_and_shrimp_azeitao?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl text-pink-600 hover:text-pink-800" />
            </a>
          </div>

          <button className="relative" onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart className="text-xl text-gray-700 hover:text-blue-600" />
            {totalQuantity > 0 && (
              <span
                className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full ${
                  animate ? 'pop-animation' : ''
                }`}
              >
                {totalQuantity > 99 ? '99+' : totalQuantity}
              </span>
            )}
          </button>
        </nav>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500" />
      </header>
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
}
