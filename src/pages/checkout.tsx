import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCartStore } from '@/utils/store';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

const CheckoutPage: NextPage = () => {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal());
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const subtotal = getTotal;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = (subtotal) * 0.08;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('review');
    }
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully! Order #' + Math.random().toString(36).substr(2, 9).toUpperCase());
  };

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Checkout - TheAlphaZone</title>
        </Head>
        <Navigation />
        <main className="bg-alpha-black pt-20 min-h-screen flex items-center">
          <div className="container mx-auto px-6 text-center py-32">
            <h1 className="text-5xl font-display font-black mb-6">Your cart is empty</h1>
            <p className="text-alpha-gray text-lg mb-8">
              Add items before checking out.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-alpha-voltage text-alpha-black font-bold uppercase hover:opacity-80 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - TheAlphaZone</title>
        <meta name="description" content="Complete your purchase at TheAlphaZone" />
      </Head>

      <Navigation />

      <main className="bg-alpha-black pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Steps */}
              <div className="flex gap-4 mb-12">
                {(['shipping', 'payment', 'review'] as const).map((s, i) => (
                  <div key={s} className="flex items-center flex-1">
                    <button
                      onClick={() => {
                        if (s === 'shipping' || (s === 'payment' && step !== 'shipping') || (s === 'review' && step === 'review')) {
                          setStep(s);
                        }
                      }}
                      className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition ${
                        step === s || (step === 'review' && s !== 'review')
                          ? 'bg-alpha-voltage text-alpha-black'
                          : 'bg-alpha-anthracite text-alpha-gray'
                      }`}
                    >
                      {i + 1}
                    </button>
                    {i < 2 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition ${
                          (step === 'payment' && s === 'shipping') || (step === 'review' && s !== 'review')
                            ? 'bg-alpha-voltage'
                            : 'bg-alpha-anthracite'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmitStep} className="space-y-8">
                {/* SHIPPING STEP */}
                {step === 'shipping' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-display font-black">Shipping Information</h2>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="col-span-2 bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                      />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="col-span-2 bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="col-span-2 bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="col-span-2 bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white focus:outline-none focus:border-alpha-voltage"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-alpha-voltage text-alpha-black py-4 font-bold uppercase hover:opacity-80 transition"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {/* PAYMENT STEP */}
                {step === 'payment' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-display font-black">Payment Details</h2>

                    <div className="space-y-4">
                      <input
                        type="text"
                        name="cardName"
                        placeholder="Cardholder Name"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                      />
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number (4111 1111 1111 1111)"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        required
                        className="w-full bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          maxLength={5}
                          required
                          className="bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                        />
                        <input
                          type="text"
                          name="cardCVC"
                          placeholder="CVC"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          maxLength={4}
                          required
                          className="bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white placeholder-alpha-gray focus:outline-none focus:border-alpha-voltage"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep('shipping')}
                        className="flex-1 border border-alpha-voltage text-alpha-voltage py-4 font-bold uppercase hover:bg-alpha-voltage hover:text-alpha-black transition"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-alpha-voltage text-alpha-black py-4 font-bold uppercase hover:opacity-80 transition"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                )}

                {/* REVIEW STEP */}
                {step === 'review' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-display font-black">Review Order</h2>

                    {/* Shipping Review */}
                    <div className="border border-alpha-anthracite p-6">
                      <h3 className="font-bold uppercase mb-4">Shipping To</h3>
                      <p className="text-alpha-gray">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zipCode}<br />
                        {formData.country}
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep('shipping')}
                        className="mt-4 text-alpha-voltage text-sm font-semibold uppercase hover:text-alpha-white transition"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Payment Review */}
                    <div className="border border-alpha-anthracite p-6">
                      <h3 className="font-bold uppercase mb-4">Payment Method</h3>
                      <p className="text-alpha-gray">
                        {formData.cardName}<br />
                        ••••••••••••{formData.cardNumber.slice(-4)}
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep('payment')}
                        className="mt-4 text-alpha-voltage text-sm font-semibold uppercase hover:text-alpha-white transition"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep('payment')}
                        className="flex-1 border border-alpha-voltage text-alpha-voltage py-4 font-bold uppercase hover:bg-alpha-voltage hover:text-alpha-black transition"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handlePlaceOrder}
                        className="flex-1 bg-alpha-voltage text-alpha-black py-4 font-bold uppercase hover:opacity-80 transition"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <h3 className="text-2xl font-display font-bold">Order Summary</h3>

                {/* Cart Items */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm border-b border-alpha-anthracite pb-4">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-alpha-gray">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-alpha-voltage border-opacity-20 pt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-alpha-gray">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
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

                {/* Trust Info */}
                <div className="bg-alpha-anthracite p-4 text-xs text-alpha-gray space-y-2">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-alpha-voltage flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Your payment is secure and encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CheckoutPage;
