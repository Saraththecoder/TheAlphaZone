import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SizeSelector from '@/components/SizeSelector';
import { useCartStore } from '@/utils/store';
import { Product, Review } from '@/types';

// Mock product data
const MOCK_PRODUCT: Product = {
  id: '1',
  name: 'The Voltage Jacket',
  price: 499,
  originalPrice: 649,
  description: 'Premium cyber-minimalist jacket with futuristic silhouette and tech-inspired design',
  image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=800&q=80',
  images: [
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=800&q=80',
    'https://images.unsplash.com/photo-1546287348-f9088b1e7e4f?w=800&q=80',
    'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&q=80',
  ],
  category: 'APPAREL',
  rating: 5,
  reviews: 128,
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Black', 'Voltage Blue', 'White'],
  inStock: true,
  badge: 'NEW',
};

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Alex Rivera',
    rating: 5,
    title: 'Absolutely Perfect',
    content: 'This jacket is exactly what I was looking for. Premium quality, incredible design. Worth every penny.',
    date: '2 weeks ago',
    verified: true,
  },
  {
    id: '2',
    author: 'Jordan Kim',
    rating: 5,
    title: 'Game Changer',
    content: 'The attention to detail is insane. This piece elevated my entire wardrobe. Highly recommend!',
    date: '1 month ago',
    verified: true,
  },
  {
    id: '3',
    author: 'Casey Moon',
    rating: 4,
    title: 'Great Quality, Fast Delivery',
    content: 'Very happy with my purchase. Only note is sizing runs slightly large, but overall amazing.',
    date: '6 weeks ago',
    verified: true,
  },
];

const ProductDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(MOCK_PRODUCT, 1);
    alert('Product added to cart!');
  };

  return (
    <>
      <Head>
        <title>{MOCK_PRODUCT.name} - TheAlphaZone</title>
        <meta name="description" content={MOCK_PRODUCT.description} />
      </Head>

      <Navigation />

      <main className="bg-alpha-black pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 py-6 flex items-center gap-2 text-sm text-alpha-gray border-b border-alpha-voltage border-opacity-20">
          <Link href="/" className="hover:text-alpha-white transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-alpha-white transition">
            Shop
          </Link>
          <span>/</span>
          <span className="text-alpha-white">{MOCK_PRODUCT.name}</span>
        </div>

        {/* Product Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative bg-alpha-anthracite aspect-square overflow-hidden">
                <img
                  src={MOCK_PRODUCT.images[activeImageIndex] || MOCK_PRODUCT.image}
                  alt={MOCK_PRODUCT.name}
                  className="w-full h-full object-cover"
                />
                {MOCK_PRODUCT.badge && (
                  <div className="absolute top-6 left-6 bg-alpha-voltage text-alpha-black px-4 py-2 font-bold uppercase text-sm">
                    {MOCK_PRODUCT.badge}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {MOCK_PRODUCT.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square bg-alpha-anthracite border-2 overflow-hidden transition ${
                      activeImageIndex === index
                        ? 'border-alpha-voltage'
                        : 'border-alpha-anthracite hover:border-alpha-gray'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-5xl font-display font-black mb-4">
                  {MOCK_PRODUCT.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < MOCK_PRODUCT.rating
                            ? 'text-alpha-voltage'
                            : 'text-alpha-anthracite'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-alpha-gray text-sm">
                    ({MOCK_PRODUCT.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-4">
                  <span className="text-5xl font-bold">
                    ${MOCK_PRODUCT.price}
                  </span>
                  {MOCK_PRODUCT.originalPrice && (
                    <span className="text-xl text-alpha-gray line-through mb-2">
                      ${MOCK_PRODUCT.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-alpha-gray leading-relaxed">
                {MOCK_PRODUCT.description}
              </p>

              {/* Size Selector */}
              <SizeSelector
                options={{
                  sizes: MOCK_PRODUCT.sizes,
                  colors: ['Black', 'Voltage Blue', 'White'],
                }}
                onSizeSelect={() => {}}
                onColorSelect={() => {}}
                onAddToCart={handleAddToCart}
              />

              {/* Product Details Accordion */}
              <div className="border-t border-alpha-voltage border-opacity-20 pt-8 space-y-4">
                {[
                  {
                    title: 'Material & Care',
                    content:
                      '100% Premium Cotton Blend. Machine wash cold. Dry clean recommended for longevity.',
                  },
                  {
                    title: 'Shipping & Returns',
                    content:
                      'Free shipping on orders over $100. 30-day return policy. Easy exchanges.',
                  },
                  {
                    title: 'Sizing Guide',
                    content:
                      'Runs true to size. See our detailed sizing chart for measurements.',
                  },
                ].map((item, i) => (
                  <details
                    key={i}
                    className="group border border-alpha-anthracite hover:border-alpha-voltage transition cursor-pointer"
                  >
                    <summary className="px-6 py-4 font-semibold uppercase text-sm flex items-center justify-between">
                      {item.title}
                      <svg
                        className="w-5 h-5 transition group-open:rotate-180"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <div className="px-6 pb-4 border-t border-alpha-anthracite text-alpha-gray">
                      {item.content}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="container mx-auto px-6 py-20 border-t border-alpha-voltage border-opacity-20">
          <h2 className="text-5xl font-display font-black mb-12">Customer Reviews</h2>

          <div className="space-y-8">
            {MOCK_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="border border-alpha-anthracite p-8 hover:border-alpha-voltage transition"
              >
                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-alpha-voltage'
                              : 'text-alpha-anthracite'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {review.verified && (
                      <span className="text-alpha-voltage text-xs font-bold uppercase">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <span className="text-alpha-gray text-sm">{review.date}</span>
                </div>

                {/* Review Content */}
                <h3 className="font-bold text-lg mb-3">{review.title}</h3>
                <p className="text-alpha-gray mb-4">{review.content}</p>
                <p className="text-alpha-gray text-sm font-semibold">
                  — {review.author}
                </p>
              </div>
            ))}
          </div>

          {/* Load More Reviews */}
          <button className="mt-12 px-8 py-4 border border-alpha-voltage text-alpha-voltage font-bold uppercase hover:bg-alpha-voltage hover:text-alpha-black transition w-full">
            Load More Reviews
          </button>
        </section>

        {/* Related Products */}
        <section className="container mx-auto px-6 py-20 border-t border-alpha-voltage border-opacity-20">
          <h2 className="text-5xl font-display font-black mb-12">Related Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Link
                key={i}
                href="#"
                className="group space-y-4"
              >
                <div className="bg-alpha-anthracite aspect-square overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-1549887534-f3bc9af9d5e5?w=400&q=80`}
                    alt="Related"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-lg group-hover:text-alpha-voltage transition">
                  Related Product {i}
                </h3>
                <p className="text-alpha-gray text-sm">$249</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailsPage;
