import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ArrowLeft, Star, Truck, ShieldCheck, Zap, Wind, Rotate3d, Layers, Image as ImageIcon } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [rotation, setRotation] = useState(0);
  const [activeImage, setActiveImage] = useState(product.image);

  // Sync active image if product changes
  useEffect(() => {
    setActiveImage(product.image);
    setRotation(0);
  }, [product]);

  // Combine main image with gallery for a complete list, ensuring uniqueness
  const allImages = Array.from(new Set([product.image, ...(product.gallery || [])]));

  return (
    <div className="min-h-screen pt-24 pb-0 px-4 bg-background animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors uppercase font-bold text-xs tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Stash
        </button>

        <div className="bg-surface border border-white/5 rounded-none overflow-hidden relative mb-20">
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Interactive Image Section */}
            <div className="h-[60vh] md:h-[80vh] bg-black/50 relative flex flex-col items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent"></div>
              
              {/* 3D Container */}
              <div 
                className="relative w-full h-3/4 perspective-1000 flex items-center justify-center mb-12"
                style={{ perspective: '1000px' }}
              >
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-auto h-full object-contain drop-shadow-[0_0_50px_rgba(0,243,255,0.15)] transition-all duration-300 ease-out"
                  style={{ 
                    transform: `rotateY(${rotation}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                />
              </div>

              {/* Gallery Thumbnails */}
              {allImages.length > 1 && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full z-20 shadow-lg">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 relative group ${
                        activeImage === img ? 'border-primary scale-110 shadow-[0_0_15px_rgba(0,243,255,0.5)]' : 'border-transparent hover:border-white/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                      {activeImage === img && <div className="absolute inset-0 bg-primary/20 pointer-events-none"></div>}
                    </button>
                  ))}
                </div>
              )}

              {/* Rotation Control */}
              <div className="absolute bottom-6 z-10 flex flex-col items-center gap-2 w-full max-w-xs px-4">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-1 animate-pulse">
                  <Rotate3d size={14} /> 360° View
                </div>
                <input 
                  type="range" 
                  min="-180" 
                  max="180" 
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer hover:bg-white/40 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_#00f3ff] [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 bg-surface/50 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                   {[1,2,3,4,5].map(i => (
                      <Star key={i} size={14} className={i <= Math.round(product.rating) ? "fill-accent text-accent" : "text-gray-700"} />
                    ))}
                  <span className="ml-2 text-xs text-gray-500 font-bold uppercase tracking-wide">120 Verified Reviews</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase mb-2 tracking-tighter leading-none">
                {product.name}
              </h1>
              
              <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-8">
                <div className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-black">
                  ${product.price}
                </div>
                {product.puffs && (
                  <span className="mb-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    / {product.puffs} Puffs
                  </span>
                )}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                {product.description} 
              </p>
              
              {/* Feature Bullets */}
              <ul className="space-y-2 mb-8 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_#00f3ff]"></div>
                  High-grade mesh coil technology
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_5px_#bf00ff]"></div>
                  Long-lasting battery life
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_5px_#ff00aa]"></div>
                  Premium flavor extracts
                </li>
              </ul>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="group flex items-center gap-3 p-4 bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <Wind className="text-gray-500 group-hover:text-primary transition-colors" />
                  <div className="text-sm">
                    <p className="font-bold text-white uppercase tracking-wider text-xs">Airflow</p>
                    <p className="text-gray-500 group-hover:text-gray-300">Precision Control</p>
                  </div>
                </div>
                <div className="group flex items-center gap-3 p-4 bg-white/5 border border-white/10 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300">
                  <Zap className="text-gray-500 group-hover:text-secondary transition-colors" />
                  <div className="text-sm">
                    <p className="font-bold text-white uppercase tracking-wider text-xs">Power</p>
                    <p className="text-gray-500 group-hover:text-gray-300">USB-C Fast Charge</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-primary text-black py-5 font-black uppercase tracking-wider text-lg hover:bg-white transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(0,243,255,0.4)] active:scale-95"
                >
                  Add to Cart
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-500 text-xs font-medium uppercase tracking-widest">
                  <Truck size={16} className="text-primary" />
                  <span>Free express shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-xs font-medium uppercase tracking-widest">
                  <ShieldCheck size={16} className="text-primary" />
                  <span>Authenticity Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};