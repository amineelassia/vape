import React from 'react';
import { X, Trash2, ArrowRight, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] transform transition-transform duration-300 ease-in-out flex flex-col animate-slide-in-right">
        
        {/* Checkout Progress Header */}
        <div className="pt-6 px-6 pb-2 bg-black border-b border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Your Stash</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 text-white rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 relative">
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10"></div>
             
             <div className="flex flex-col items-center gap-2 bg-black px-2 z-10">
               <div className="w-6 h-6 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_10px_rgba(0,243,255,0.5)]">1</div>
               <span className="text-primary">Cart</span>
             </div>
             <div className="flex flex-col items-center gap-2 bg-black px-2 z-10">
               <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">2</div>
               <span>Details</span>
             </div>
             <div className="flex flex-col items-center gap-2 bg-black px-2 z-10">
               <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">3</div>
               <span>Pay</span>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                <X size={40} />
              </div>
              <p className="uppercase font-bold tracking-widest">Your cart is empty.</p>
              <button 
                onClick={onClose}
                className="text-primary font-bold hover:underline"
              >
                FILL IT UP
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white/5 p-4 border border-white/5 hover:border-primary/30 transition-colors group">
                <div className="w-20 h-20 bg-black flex-shrink-0 border border-white/10 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-white uppercase text-sm leading-tight">{item.name}</h3>
                    <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-widest">{item.category}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-white/20 bg-black">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-3 py-1 hover:bg-white/10 text-gray-400"
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span className="px-2 text-sm font-bold text-white w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-3 py-1 hover:bg-white/10 text-gray-400"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-500 hover:text-accent transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm text-gray-400 uppercase tracking-wider">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400 uppercase tracking-wider">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-primary">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-white pt-4 border-t border-white/10">
                <span className="italic">TOTAL</span>
                <span className="text-primary drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]">${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="group w-full bg-primary text-black py-4 font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,243,255,0.3)]">
              Proceed to Details <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-gray-600 text-center mt-3 uppercase">
              You must be 21+ to purchase products from this store.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};