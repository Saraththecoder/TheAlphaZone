import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { useCartStore } from '@/utils/store';

// Mock products data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Voltage Jacket',
    price: 499,
    originalPrice: 649,
    description: 'Premium cyber-minimalist jacket with futuristic silhouette',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&q=80',
      'https://images.unsplash.com/photo-1546287348-f9088b1e7e4f?w=500&q=80',
    ],
    category: 'APPAREL',
    rating: 5,
    reviews: 128,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000', '#0047FF', '#FFFFFF'],
    inStock: true,
    badge: 'NEW',
  },
  {
    id: '2',
    name: 'Alpha Tech Hoodie',
    price: 249,
    description: 'Futuristic oversized hoodie with reflective accents',
    image: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500&q=80',
    images: [],
    category: 'APPAREL',
    rating: 4.5,
    reviews: 89,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#000000', '#111111'],
    inStock: true,
    badge: 'TRENDING',
  },
  {
    id: '3',
    name: 'Cyber Cargo Pants',
    price: 349,
    originalPrice: 399,
    description: 'Multi-pocket tactical pants with tech aesthetic',
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&q=80',
    images: [],
    category: 'APPAREL',
    rating: 5,
    reviews: 156,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['#000000', '#333333'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Premium Streetwear Cap',
    price: 79,
    description: 'Minimalist design with embroidered logo',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e6b7?w=500&q=80',
    images: [],
    category: 'ACCESSORIES',
    rating: 4.5,
    reviews: 67,
    sizes: ['One Size'],
    colors: ['#000000'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Alpha Sneakers',
    price: 289,
    originalPrice: 359,
    description: 'Futuristic high-tech sneaker with premium materials',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    images: [],
    category: 'FOOTWEAR',
    rating: 5,
    reviews: 234,
    sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
    colors: ['#000000', '#0047FF'],
    inStock: true,
    badge: 'SOLD OUT SOON',
  },
  {
    id: '6',
    name: 'Tech Crossbody Bag',
    price: 199,
    description: 'Sleek utility bag with organized compartments',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    images: [],
    category: 'ACCESSORIES',
    rating: 4,
    reviews: 45,
    sizes: ['One Size'],
    colors: ['#000000'],
    inStock: false,
  },
  {
    id: '7',
    name: 'Minimalist Watch',
    price: 399,
    description: 'Premium digital minimalist timepiece',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=80',
    images: [],
    category: 'ACCESSORIES',
    rating: 5,
    reviews: 112,
    sizes: ['One Size'],
    colors: ['#000000', '#FFFFFF'],
    inStock: true,
  },
  {
    id: '8',
    name: 'Alpha Tee',
    price: 89,
    description: 'Essential premium cotton t-shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    images: [],
    category: 'APPAREL',
    rating: 4.5,
    reviews: 289,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000', '#FFFFFF', '#0047FF'],
    inStock: true,
  },
];

interface FilterState {
  category: string;
  priceRange: [number, number];
  sortBy: string;
}

const ProductsPage: NextPage = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'ALL',
    priceRange: [0, 1000],
    sortBy: 'newest',
  });
  const [showFilters, setShowFilters] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (filters.category !== 'ALL' && product.category !== filters.category) {
      return false;
    }
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false;
    }
    return true;
  });

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    alert('Added to cart!');
  };

  return (
    <>
      <Head>
        <title>Shop - TheAlphaZone</title>
        <meta name="description" content="Explore our premium luxury fashion collection" />
      </Head>

      <Navigation />

      <main className="bg-alpha-black pt-20">
        {/* Header */}
        <section className="container mx-auto px-6 py-20 border-b border-alpha-voltage border-opacity-20">
          <h1 className="text-6xl font-display font-black mb-4">All Products</h1>
          <p className="text-xl text-alpha-gray max-w-2xl">
            Discover our complete collection of premium cyber-fashion pieces. Curated for rebels.
          </p>
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full mb-6 px-6 py-3 bg-alpha-voltage text-alpha-black font-bold uppercase"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>

              <div
                className={`${
                  showFilters ? 'block' : 'hidden'
                } lg:block space-y-8 sticky top-32`}
              >
                {/* Category Filter */}
                <div>
                  <h3 className="text-lg font-bold uppercase mb-4 font-display">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {['ALL', 'APPAREL', 'ACCESSORIES', 'FOOTWEAR'].map(
                      (category) => (
                        <button
                          key={category}
                          onClick={() =>
                            setFilters({ ...filters, category })
                          }
                          className={`block text-sm font-medium transition ${
                            filters.category === category
                              ? 'text-alpha-voltage'
                              : 'text-alpha-gray hover:text-alpha-white'
                          }`}
                        >
                          {category}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="text-lg font-bold uppercase mb-4 font-display">
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          priceRange: [0, parseInt(e.target.value)],
                        })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-alpha-gray">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="text-lg font-bold uppercase mb-4 font-display">
                    Sort By
                  </h3>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters({ ...filters, sortBy: e.target.value })
                    }
                    className="w-full bg-alpha-anthracite border border-alpha-voltage border-opacity-50 px-4 py-3 text-alpha-white text-sm focus:outline-none"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() =>
                    setFilters({
                      category: 'ALL',
                      priceRange: [0, 1000],
                      sortBy: 'newest',
                    })
                  }
                  className="w-full px-6 py-3 border border-alpha-voltage text-alpha-voltage font-semibold uppercase text-sm hover:bg-alpha-voltage hover:text-alpha-black transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="mb-8 flex items-center justify-between">
                <p className="text-alpha-gray text-sm">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-alpha-gray text-lg mb-6">
                    No products found matching your filters.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        category: 'ALL',
                        priceRange: [0, 1000],
                        sortBy: 'newest',
                      })
                    }
                    className="px-6 py-3 bg-alpha-voltage text-alpha-black font-bold uppercase hover:opacity-80 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProductsPage;
