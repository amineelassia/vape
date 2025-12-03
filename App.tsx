import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { AIChat } from './components/AIChat';
import { Footer } from './components/Footer';
import { AIStudio } from './components/AIStudio';
import { ViewState, Product, CartItem } from './types';

// Mock Vape Data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cyber Puff 9000',
    price: 24.99,
    category: 'disposable',
    description: 'The ultimate disposable experience. Features a futuristic LED screen, dual mesh coils, and 9000 puffs of pure flavor intensity. USB-C rechargeable.',
    image: 'https://images.unsplash.com/photo-1534119643501-9a706591244e?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1534119643501-9a706591244e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.9,
    puffs: 9000,
    flavor: 'Blue Razz Ice'
  },
  {
    id: '2',
    name: 'Neon Juice: Kryptonite',
    price: 18.50,
    category: 'e-liquid',
    description: 'A glowing blend of melon, cucumber, and mint. A radioactive flavor explosion that keeps you refreshed all day.',
    image: 'https://images.unsplash.com/photo-1563816669931-e14571997d97?auto=format&fit=crop&q=80&w=800',
    gallery: [
       'https://images.unsplash.com/photo-1563816669931-e14571997d97?auto=format&fit=crop&q=80&w=800',
       'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=800',
       'https://images.unsplash.com/photo-1595181519782-b7b25e755259?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.7,
    flavor: 'Melon Mint'
  },
  {
    id: '3',
    name: 'Void Mod X',
    price: 89.99,
    category: 'mods',
    description: 'High-power box mod reaching 220W. Transparent chassis with internal RGB lighting. Built for cloud chasers.',
    image: 'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1496360875323-93d396996841?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8
  },
  {
    id: '4',
    name: 'Stealth Pod Pro',
    price: 34.99,
    category: 'pods',
    description: 'Ultra-slim, discreet, and powerful. The perfect pocket companion with leak-proof technology.',
    image: 'https://images.unsplash.com/photo-1619451427882-6a36a9996c38?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1619451427882-6a36a9996c38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512054236021-9e735497b762?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.5
  },
  {
    id: '5',
    name: 'Glitch Bar 5000',
    price: 19.99,
    category: 'disposable',
    description: 'Experience the glitch. Intense strawberry kiwi flavor with a unique geometric design grip.',
    image: 'https://images.unsplash.com/photo-1600088927806-03f3c3609805?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1600088927806-03f3c3609805?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528643536868-692d098e79e6?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.6,
    puffs: 5000,
    flavor: 'Strawberry Kiwi'
  },
  {
    id: '6',
    name: 'Quantum Salt: Berry',
    price: 15.99,
    category: 'e-liquid',
    description: 'Nicotine salts optimized for pod systems. A complex mix of dark berries and anise.',
    image: 'https://images.unsplash.com/photo-1557870183-b7156942c0f2?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1557870183-b7156942c0f2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506337195308-795914a10052?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.4,
    flavor: 'Mixed Berry'
  },
  {
    id: '7',
    name: 'Titan Tank V2',
    price: 39.99,
    category: 'mods',
    description: 'Massive capacity sub-ohm tank. Top airflow design prevents leaks while delivering maximum flavor.',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.7
  },
  {
    id: '8',
    name: 'Nebula Disposable',
    price: 22.00,
    category: 'disposable',
    description: 'Intergalactic mango peach flavor. Smooth draw and consistent output until the very last puff.',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8,
    puffs: 7500,
    flavor: 'Mango Peach'
  },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  // Navigation Handlers
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('PRODUCT_DETAIL');
    window.scrollTo(0, 0);
  };

  const handleNavChange = (view: ViewState) => {
    setCurrentView(view);
    // Reset scroll based on view type
    if (view === 'HOME') {
      setTimeout(() => {
        const el = document.getElementById('hero-container');
        if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={`bg-background font-sans text-text selection:bg-primary selection:text-black flex flex-col ${currentView === 'HOME' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Navbar 
        currentView={currentView}
        onChangeView={handleNavChange}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow">
        {currentView === 'HOME' && (
          <Hero 
            onShopNow={() => handleNavChange('SHOP')} 
            onNavigate={handleNavChange}
            products={PRODUCTS}
            onProductClick={handleProductClick}
            onAddToCart={addToCart}
          />
        )}
        
        {currentView === 'SHOP' && (
          <ProductList 
            products={PRODUCTS} 
            onProductClick={handleProductClick}
            onAddToCart={addToCart}
          />
        )}

        {currentView === 'PRODUCT_DETAIL' && selectedProduct && (
          <ProductDetail 
            key={selectedProduct.id}
            product={selectedProduct} 
            onBack={() => handleNavChange('SHOP')}
            onAddToCart={addToCart}
          />
        )}

        {currentView === 'AI_STUDIO' && (
          <AIStudio products={PRODUCTS} />
        )}

        {currentView === 'ABOUT' && (
          <div className="pt-32 px-6 max-w-4xl mx-auto text-center h-screen flex flex-col items-center justify-center">
            <h1 className="text-6xl font-black italic text-white mb-6 uppercase tracking-tighter">
              Behind the <span className="text-primary">Clouds</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              We are a team of vaping enthusiasts dedicated to bringing you the future of inhalation technology. 
              Neon Clouds isn't just a store; it's a lifestyle. We source the rarest hardware and the boldest flavors 
              for those who refuse to settle for the ordinary.
            </p>
            <div className="mt-12 p-6 border border-white/10 bg-white/5 skew-x-[-10deg]">
               <h3 className="skew-x-[10deg] text-2xl font-bold text-white uppercase">Vaping Since 2024</h3>
            </div>
          </div>
        )}
      </main>

      {/* Footer only shows on non-Home pages because Home has its own footer section inside the scroll snap */}
      {currentView !== 'HOME' && <Footer />}

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <AIChat />
    </div>
  );
};

export default App;