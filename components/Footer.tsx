import React from 'react';
import { Facebook, Instagram, Twitter, Send, CloudLightning } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
           {/* Brand */}
           <div className="col-span-1 md:col-span-2 space-y-6">
             <div className="flex items-center gap-2">
                <CloudLightning className="text-primary" size={32} />
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                  Neon<span className="text-primary">Clouds</span>
                </h2>
             </div>
             <p className="text-gray-400 max-w-sm leading-relaxed">
               Redefining vape culture with cutting-edge tech, bold flavors, and a community that never settles. 
               <br/><span className="text-primary font-bold">Taste the future.</span>
             </p>
           </div>
           
           {/* Links */}
           <div>
             <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-gray-500">Collections</h4>
             <ul className="space-y-4 font-medium">
               <li><a href="#" className="hover:text-primary hover:pl-2 transition-all duration-300 block">Disposables</a></li>
               <li><a href="#" className="hover:text-primary hover:pl-2 transition-all duration-300 block">E-Liquids</a></li>
               <li><a href="#" className="hover:text-primary hover:pl-2 transition-all duration-300 block">Mods & Tanks</a></li>
               <li><a href="#" className="hover:text-primary hover:pl-2 transition-all duration-300 block">Accessories</a></li>
             </ul>
           </div>

           {/* Newsletter */}
           <div>
              <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-gray-500">Stay Plugged In</h4>
              <div className="flex flex-col gap-4">
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-primary focus:outline-none focus:bg-white/10 transition-colors text-white placeholder-gray-600"
                  />
                  <button className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-black flex items-center justify-center hover:bg-white transition-colors">
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-600">Get the latest drops and exclusive deals.</p>
              </div>
           </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            © 2024 Neon Clouds. 21+ Only. Nicotine is an addictive chemical.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-primary hover:scale-125 transition-all duration-300"><Instagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-primary hover:scale-125 transition-all duration-300"><Twitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-primary hover:scale-125 transition-all duration-300"><Facebook size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};