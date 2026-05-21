# TheAlphaZone - Project Quick Reference

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/pages/index.tsx` | Homepage |
| `src/pages/products.tsx` | Product listing |
| `src/pages/products/[id].tsx` | Product details |
| `src/pages/cart.tsx` | Shopping cart |
| `src/pages/checkout.tsx` | Checkout flow |
| `src/components/Navigation.tsx` | Header navigation |
| `src/utils/store.ts` | Cart & wishlist state |
| `tailwind.config.js` | Design tokens |
| `DESIGN_SYSTEM.md` | Design guidelines |
| `DEVELOPMENT.md` | Dev guide |

---

## 🎨 Design System Quick Reference

### Colors
- **Dark**: `bg-alpha-black` (#000000), `bg-alpha-anthracite` (#111111)
- **Text**: `text-alpha-white` (#F4F4F5), `text-alpha-gray` (#A1A1AA)
- **Accent**: `bg-alpha-voltage` / `text-alpha-voltage` (#0047FF)

### Typography
- **Display**: `font-display` (Neue Haas Grotesk)
- **Body**: `font-sans` (Inter)
- **Sizes**: `text-6xl` (72px) → `text-xs` (12px)

### Spacing
- Base: 4px
- Multiples: `p-4`, `p-8`, `p-16`, `p-24`, etc.

### Animations
- `fade-in` - Fade in animation
- `slide-up` - Slide up animation
- `hover:scale-105` - Hover scale effect

---

## 🛠 Common Tasks

### Add to Cart
```tsx
import { useCartStore } from '@/utils/store';

const addItem = useCartStore((state) => state.addItem);
addItem(product, quantity, size, color);
```

### Get Cart Total
```tsx
const total = useCartStore((state) => state.getTotal());
```

### Access Wishlist
```tsx
import { useWishlistStore } from '@/utils/store';

const isFavorite = useWishlistStore((state) => state.isFavorite(id));
```

### Create Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {/* Items */}
</div>
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Class Prefix |
|-----------|-------|-------------|
| Mobile | 320px-640px | (default) |
| Tablet | 641px-1024px | `md:` |
| Desktop | 1025px+ | `lg:` |

---

## 🔌 API Endpoints

All endpoints in `src/utils/api.ts`:

```typescript
// Products
productAPI.getAll()
productAPI.getById(id)
productAPI.getByCategory(category)
productAPI.search(query)

// Orders
orderAPI.create(data)
orderAPI.getById(id)

// Payments
paymentAPI.processPayment(data)
```

---

## 📦 Build Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run linter
```

---

## 🎯 Component Props

### ProductCard
```tsx
<ProductCard 
  product={product}
  onAddToCart={(product) => {}}
/>
```

### SizeSelector
```tsx
<SizeSelector
  options={{ sizes: [], colors: [] }}
  onSizeSelect={(size) => {}}
  onColorSelect={(color) => {}}
  onAddToCart={() => {}}
/>
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles not showing | Run `npm run build` |
| Port in use | Use `npm run dev -- -p 3001` |
| Module not found | Clear `node_modules` and reinstall |
| TypeScript errors | Check `src/types/index.ts` |

---

## 📚 Documentation

- **Design System**: `DESIGN_SYSTEM.md`
- **Development**: `DEVELOPMENT.md`
- **Changelog**: `CHANGELOG.md`
- **README**: `README.md`

---

## 🌐 Deployment

### Vercel
```bash
git push origin main  # Auto-deploys
```

### Other Platforms
```bash
npm run build  # Creates .next/ folder
# Deploy .next/, public/, package.json
```

---

## 💡 Pro Tips

1. Use Tailwind IntelliSense VS Code extension
2. Check browser console for state debugging
3. Use Next.js Image component for images
4. Test responsive design with DevTools
5. Keep components small and reusable

---

## 📞 Support Resources

- [Next.js Docs](https://nextjs.org)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)

---

**TheAlphaZone** — *Luxury cyber-fashion platform*
