import React from 'react';
import { ShoppingBag, Menu, CloudLightning, X, Wand2 } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView, cartCount, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks: { label: string; view: ViewState; icon?: React.ReactNode }[] = [
    { label: 'Home', view: 'HOME' },
    { label: 'Shop Vapes', view: 'SHOP' },
    { label: 'Neon Lab', view: 'AI_STUDIO', icon: <Wand2 size={14} className="inline mr-1" /> },
    { label: 'About Us', view: 'ABOUT' },
  ];

  const handleNavClick = (view: ViewState) => {
    onChangeView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('HOME')}
            className="flex items-center gap-2 group"
          >
            <div className="text-primary animate-pulse-fast group-hover:scale-110 transition-transform">
              <CloudLightning size={28} />
            </div>
            <span className="font-sans font-black text-2xl tracking-tighter text-white uppercase italic">
              Neon<span className="text-primary">Clouds</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className={`flex items-center text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 ${
                  currentView === link.view 
                    ? 'text-primary drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-white hover:text-primary transition-colors group"
            >
              <ShoppingBag size={24} className="group-hover:animate-bounce" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-primary rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-white/10 absolute w-full animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className={`block w-full text-left px-3 py-4 text-lg font-bold uppercase flex items-center gap-2 ${
                  currentView === link.view
                    ? 'text-primary bg-white/5'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};