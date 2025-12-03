import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, X, Zap, ArrowRight, Filter } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onProductClick, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categories = ['all', 'disposable', 'e-liquid', 'mods', 'pods'];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-5xl font-black italic text-white mb-2 uppercase tracking-tighter">
              The <span className="text-primary">Stash</span>
            </h1>
            <p className="text-gray-400">Top-tier hardware and premium juices.</p>
          </div>
          
          <div className="flex gap-3 mt-6 md:mt-0 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-none skew-x-[-10deg] text-sm font-bold uppercase tracking-wider transition-all duration-300 border relative overflow-hidden ${
                  activeCategory === cat 
                    ? 'bg-primary border-primary text-black scale-105 animate-glow' 
                    : 'bg-transparent border-white/20 text-gray-400 hover:border-primary hover:text-white hover:shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                }`}
              >
                <span className="skew-x-[10deg] inline-block">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        <div 
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in-up"
        >
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group relative bg-surface border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {/* Image Container with Smoke Effect */}
              <div 
                className="relative aspect-[4/5] overflow-hidden cursor-pointer bg-gradient-to-b from-white/5 to-transparent shadow-none group-hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all duration-500"
                onClick={() => onProductClick(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
                
                {/* Smoke Puff Animation on Hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:animate-smoke pointer-events-none"></div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                {/* Action Buttons */}
                <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="flex-1 bg-white/10 hover:bg-white text-white hover:text-black font-bold py-3 backdrop-blur-md transition-colors flex justify-center items-center gap-2 uppercase text-xs tracking-wider"
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="flex-1 bg-primary text-black font-bold py-3 shadow-[0_0_10px_rgba(0,243,255,0.3)] hover:bg-white transition-colors flex justify-center items-center gap-2 uppercase text-xs tracking-wider"
                  >
                    <ShoppingBag size={16} /> Add
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 
                    className="font-bold text-lg text-white group-hover:text-primary transition-colors cursor-pointer uppercase tracking-tight"
                    onClick={() => onProductClick(product)}
                  >
                    {product.name}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-xs font-bold px-2 py-0.5 bg-white/5 text-gray-400 uppercase tracking-widest border border-white/10 rounded-sm">
                    {product.category}
                   </span>
                   {product.puffs && (
                     <span className="text-xs font-bold px-2 py-0.5 bg-secondary/20 text-secondary uppercase tracking-widest border border-secondary/20 rounded-sm flex items-center gap-1">
                       <Zap size={10} /> {product.puffs}
                     </span>
                   )}
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-3">
                  <span className="font-black text-xl text-primary drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                    ${product.price}
                  </span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-1 h-3 skew-x-[-10deg] ${i <= Math.round(product.rating) ? 'bg-accent' : 'bg-gray-700'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setQuickViewProduct(null)}
          />
          <div className="bg-surface border border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.1)] w-full max-w-4xl overflow-hidden relative z-10 animate-fade-in-up flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-primary hover:text-black text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-gray-900 to-black relative flex items-center justify-center p-8">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              <img 
                src={quickViewProduct.image} 
                alt={quickViewProduct.name} 
                className="w-auto h-full max-h-[400px] object-contain drop-shadow-2xl animate-float"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-surface flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                  {quickViewProduct.category}
                </span>
                {quickViewProduct.flavor && (
                   <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest">
                    {quickViewProduct.flavor}
                  </span>
                )}
              </div>

              <h2 className="text-4xl font-black text-white italic mb-2 uppercase">
                {quickViewProduct.name}
              </h2>
              <p className="text-3xl text-primary font-bold mb-6 drop-shadow-md">${quickViewProduct.price}</p>

              <p className="text-gray-400 mb-8 leading-relaxed font-light border-l-2 border-white/10 pl-4">
                {quickViewProduct.description}
              </p>

              <div className="mt-auto space-y-4">
                <button
                  onClick={() => {
                    onAddToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full bg-primary text-black py-4 font-black uppercase tracking-wider hover:bg-white transition-all active:scale-95 shadow-[0_0_20px_rgba(0,243,255,0.2)] flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} /> Add to Cart
                </button>
                <button
                  onClick={() => {
                    onProductClick(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors py-2 uppercase font-bold text-xs tracking-widest"
                >
                  View Full Specs <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};