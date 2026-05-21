import { useState } from 'react';
import Link from 'next/link';

interface SizeOptions {
  sizes: string[];
  colors: string[];
}

interface SizeSelectorProps {
  options: SizeOptions;
  onSizeSelect: (size: string) => void;
  onColorSelect: (color: string) => void;
  onAddToCart: () => void;
}

export default function SizeSelector({
  options,
  onSizeSelect,
  onColorSelect,
  onAddToCart,
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(options.colors[0] || '');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onSizeSelect(selectedSize);
    onColorSelect(selectedColor);
    onAddToCart();
  };

  return (
    <div className="space-y-6">
      {/* Color Selector */}
      <div>
        <label className="block text-sm font-semibold uppercase mb-4">Color</label>
        <div className="flex gap-3">
          {options.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full border-2 transition ${
                selectedColor === color
                  ? 'border-alpha-voltage'
                  : 'border-alpha-anthracite hover:border-alpha-gray'
              }`}
              style={{
                backgroundColor: color.toLowerCase(),
              }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <label className="block text-sm font-semibold uppercase mb-4">Size</label>
        <div className="grid grid-cols-4 gap-2">
          {options.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 px-2 text-xs font-semibold uppercase border transition ${
                selectedSize === size
                  ? 'bg-alpha-voltage text-alpha-black border-alpha-voltage'
                  : 'border-alpha-anthracite text-alpha-white hover:border-alpha-voltage'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-semibold uppercase mb-4">Quantity</label>
        <div className="flex items-center border border-alpha-anthracite w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 hover:bg-alpha-anthracite transition"
          >
            −
          </button>
          <span className="px-6 py-3 font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 hover:bg-alpha-anthracite transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-alpha-voltage text-alpha-black py-4 font-bold uppercase text-lg hover:opacity-80 transition"
      >
        Add to Cart
      </button>

      {/* Secondary Actions */}
      <div className="space-y-2">
        <button className="w-full border border-alpha-voltage text-alpha-voltage py-3 font-semibold uppercase hover:bg-alpha-voltage hover:text-alpha-black transition">
          Add to Wishlist
        </button>
        <button className="w-full border border-alpha-anthracite text-alpha-gray py-3 font-semibold uppercase hover:text-alpha-white transition">
          Share
        </button>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-alpha-anthracite pt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <svg className="w-5 h-5 text-alpha-voltage" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-alpha-gray">Secure Checkout</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <svg className="w-5 h-5 text-alpha-voltage" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
          </svg>
          <span className="text-alpha-gray">Free Shipping on Orders Over $100</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <svg className="w-5 h-5 text-alpha-voltage" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c4.76-4.76 12.624-4.76 17.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 00-1.414-1.414 9 9 0 0112.728 0 1 1 0 00-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 00-1.415-1.415 5 5 0 017.072 0 1 1 0 00-1.415 1.415zM9.5 16a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
          </svg>
          <span className="text-alpha-gray">Premium 24/7 Support</span>
        </div>
      </div>
    </div>
  );
}
