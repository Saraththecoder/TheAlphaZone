import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCartStore } from '@/utils/store';
import { CartItem } from '@/types';

const CartPage: NextPage = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal());

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscount(getTotal * 0.1);
      alert('Coupon applied! 10% discount');
    } else {
      alert('Invalid coupon code');
    }
  };

  const subtotal = getTotal;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax + shipping;

  return (
    <>
      <Head>
        <title>Shopping Cart - TheAlphaZone</title>
        <meta name="description" content="Review and checkout your items" />
      </Head>

      <Navigation />

      <main className="bg-alpha-black pt-20">
        {/* Header */}
        <section className="container mx-auto px-6 py-12 border-b border-alpha-voltage border-opacity-20">
          <h1 className="text-5xl font-display font-black">Shopping Cart</h1>
        </section>

        {items.length === 0 ? (
          // Empty Cart
          <section className="container mx-auto px-6 py-32 text-center">
            <svg className="w-24 h-24 text-alpha-voltage mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-3xl font-display font-bold mb-4">Your cart is empty</h2>
            <p className="text-alpha-gray text-lg mb-8 max-w-md mx-auto">
              Discover premium luxury fashion pieces and add them to your cart.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-alpha-voltage text-alpha-black font-bold uppercase hover:opacity-80 transition"
            >
              Continue Shopping
            </Link>
          </section>
        ) : (
          <section className="container mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item: CartItem) => (
                  <div
                    key={item.id}
                    className="border border-alpha-anthracite p-6 hover:border-alpha-voltage transition flex gap-6"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-alpha-anthracite flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.id}`}
                        className="text-lg font-bold hover:text-alpha-voltage transition mb-2 block"
                      >
                        {item.name}
                      </Link>
                      {item.selectedSize && (
                        <p className="text-alpha-gray text-sm mb-2">
                          Size: {item.selectedSize}
                        </p>
                      )}
                      <p className="text-alpha-gray text-sm mb-4">
                        Color: {item.selectedColor || 'Black'}
                      </p>
                      <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-alpha-gray hover:text-alpha-voltage transition text-sm font-semibold uppercase"
                      >
                        Remove
                      </button>

                      <div className="flex items-center border border-alpha-anthracite">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-3 py-2 hover:bg-alpha-anthracite transition"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-2 hover:bg-alpha-anthracite transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="block text-center py-4 border border-alpha-voltage text-alpha-voltage font-semibold uppercase hover:bg-alpha-voltage hover:text-alpha-black transition"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-6">
                  {/* Coupon */}
                  <div>
                    <label className="block text-sm font-semibold uppercase mb-3">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white text-sm focus:outline-none focus:border-alpha-voltage"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-3 bg-alpha-voltage text-alpha-black font-bold uppercase text-sm hover:opacity-80 transition"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-alpha-gray text-xs mt-2">
                      Try code: WELCOME10
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div className="border border-alpha-voltage border-opacity-20 p-6 space-y-4">
                    <h3 className="text-lg font-bold uppercase">Order Summary</h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-alpha-gray">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-alpha-voltage">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}

                      {shipping > 0 ? (
                        <div className="flex justify-between text-alpha-gray">
                          <span>Shipping</span>
                          <span>${shipping.toFixed(2)}</span>
                        </div>
                      ) : (
                        <div className="flex justify-between text-alpha-voltage">
                          <span>Shipping</span>
                          <span>FREE</span>
                        </div>
                      )}

                      <div className="flex justify-between text-alpha-gray">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>

                      <div className="border-t border-alpha-anthracite pt-3 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-alpha-voltage">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="block w-full bg-alpha-voltage text-alpha-black py-4 font-bold uppercase text-center hover:opacity-80 transition"
                  >
                    Proceed to Checkout
                  </Link>

                  {/* Trust Badges */}
                  <div className="border-t border-alpha-anthracite pt-6 space-y-3 text-xs text-alpha-gray">
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-alpha-voltage flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span>Secure SSL checkout</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-alpha-voltage flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                      </svg>
                      <span>30-day returns policy</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-alpha-voltage flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c4.76-4.76 12.624-4.76 17.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 00-1.414-1.414 9 9 0 0112.728 0 1 1 0 00-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 00-1.415-1.415 5 5 0 017.072 0 1 1 0 00-1.415 1.415zM9.5 16a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                      </svg>
                      <span>Premium 24/7 support</span>
                    </div>
                  </div>

                  {/* Clear Cart */}
                  <button
                    onClick={() => {
                      if (confirm('Clear your entire cart?')) {
                        clearCart();
                      }
                    }}
                    className="w-full px-4 py-3 text-alpha-gray border border-alpha-anthracite font-semibold uppercase text-sm hover:text-alpha-voltage transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default CartPage;
