import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { ArrowRight, Zap, Star, ShieldCheck, Flame, ShoppingBag, Wind, Sparkles, TrendingUp, Wand2 } from 'lucide-react';
import { Product, ViewState } from '../types';

interface HeroProps {
  onShopNow: () => void;
  onNavigate: (view: ViewState) => void;
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onNavigate, products, onProductClick, onAddToCart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const productCardsRef = useRef<HTMLDivElement>(null);
  const featuredImageRef = useRef<HTMLImageElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // GSAP Context for cleanup
    const ctx = gsap.context(() => {
      // Register ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
      
      const scroller = containerRef.current;

      // 1. Landing Text Animation (No scroll trigger needed, plays on load)
      const tl = gsap.timeline();
      tl.from(".hero-text-element", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      })
      .from(".hero-cta-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // 2. Featured Image Parallax
      // IMPORTANT: We must specify the 'scroller' because we are scrolling a div, not the body.
      if (featuredImageRef.current && scroller) {
        gsap.to(featuredImageRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: featuredImageRef.current,
            scroller: scroller, // <--- CRITICAL FIX
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // 3. Product Grid Stagger
      if (productCardsRef.current && scroller) {
        gsap.from(productCardsRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productCardsRef.current,
            scroller: scroller, // <--- CRITICAL FIX
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // 4. Marquee Text (Continuous loop, no trigger needed)
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear"
      });

      // 5. Smoke Particles Scroll Effect
      if (smokeRef.current && scroller) {
        const particles = smokeRef.current.children;
        gsap.to(particles, {
          y: (i) => -100 - Math.random() * 200, // Move up randomly
          x: (i) => (Math.random() - 0.5) * 50, // Drift horizontally
          opacity: 0,
          scale: (i) => 1.5 + Math.random(),
          ease: "power1.in",
          scrollTrigger: {
            trigger: "#hero-container", // Trigger based on the container scrolling
            scroller: scroller,
            start: "top top",
            end: "bottom top", // Animate over the height of the container
            scrub: 1, // Smooth scrubbing
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [products]); // Re-run if products change to ensure grid animates correctly

  const featuredProduct = products.find(p => p.id === '1') || products[0];
  const bestSellers = products.slice(0, 4);

  // Guard clause if data is missing
  if (!featuredProduct) return <div className="h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div 
      id="hero-container" 
      ref={containerRef} 
      className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar bg-background text-white relative"
    >
      
      {/* Section 1: Smoke & Mirrors Hero */}
      <section className="h-[100dvh] w-full snap-start relative flex items-center justify-center overflow-hidden">
        {/* Background Smoke Effect */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-surface to-black pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Animated Smoke Overlay */}
          <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e5/Smoke-2.png')] bg-cover animate-float" style={{ animationDuration: '20s' }}></div>
        
          {/* Scroll-Driven Smoke Particles */}
          <div ref={smokeRef} className="absolute inset-0 pointer-events-none">
             {[...Array(8)].map((_, i) => (
               <div 
                 key={i}
                 className="absolute rounded-full blur-[60px] opacity-20 bg-gray-400"
                 style={{
                   width: `${200 + Math.random() * 300}px`,
                   height: `${200 + Math.random() * 300}px`,
                   left: `${Math.random() * 100}%`,
                   top: `${50 + Math.random() * 50}%`,
                 }}
               />
             ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-16 md:mt-0">
          <span className="hero-text-element inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-primary text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            Premium Vaping Experience
          </span>
          <h1 ref={titleRef} className="hero-text-element text-6xl md:text-9xl font-black mb-6 tracking-tighter italic drop-shadow-2xl">
            TASTE THE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">FUTURE</span>
          </h1>
          <p className="hero-text-element text-xl md:text-2xl font-light mb-10 text-gray-400 max-w-2xl mx-auto">
            Next-gen disposables and premium e-liquids delivered to your door.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full">
            <button 
              onClick={onShopNow}
              className="hero-cta-btn group relative bg-primary text-black px-10 py-5 rounded-none skew-x-[-10deg] font-black text-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_50px_rgba(0,243,255,0.6)] min-w-[200px]"
            >
              <span className="skew-x-[10deg] inline-flex items-center gap-2">
                SHOP NOW <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => onNavigate('AI_STUDIO')}
              className="hero-cta-btn group relative bg-transparent border-2 border-white text-white px-10 py-5 rounded-none skew-x-[-10deg] font-black text-xl hover:bg-white/10 hover:border-secondary hover:text-secondary transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_50px_rgba(191,0,255,0.4)] min-w-[200px]"
            >
              <span className="skew-x-[10deg] inline-flex items-center gap-2">
                TRY NEON LAB <Wand2 size={20} className="group-hover:rotate-12 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500 z-20 pointer-events-none">
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Marquee & Best Sellers */}
      <section className="h-[100dvh] w-full snap-start relative flex flex-col bg-surface overflow-hidden pt-24">
        {/* Infinite Marquee */}
        <div className="w-full bg-primary text-black overflow-hidden py-3 mb-6 rotate-1 border-y-4 border-black z-20 shadow-xl">
          <div className="marquee-inner whitespace-nowrap flex gap-10 font-black italic text-2xl uppercase tracking-tighter">
            <span>Fresh Drops Daily</span> <span>•</span>
            <span>Free Shipping Over $50</span> <span>•</span>
            <span>24/7 Support</span> <span>•</span>
            <span>Best Prices Guaranteed</span> <span>•</span>
            <span>Authentic Products Only</span> <span>•</span>
            <span>Fresh Drops Daily</span> <span>•</span>
            <span>Free Shipping Over $50</span> <span>•</span>
            <span>24/7 Support</span> <span>•</span>
            <span>Best Prices Guaranteed</span> <span>•</span>
            <span>Authentic Products Only</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col justify-center pb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2 animate-pulse">
                <Flame className="text-secondary" size={20} />
                <span className="text-secondary font-bold uppercase tracking-widest text-xs">Community Favorites</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-4">
                Best <span className="text-stroke-primary text-transparent">Sellers</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed border-l-2 border-primary/50 pl-4">
                The hype is real. These are the devices and flavors our squad can't put down. 
                Restocked weekly, but they move fast. Grab yours before the smoke clears.
              </p>
            </div>
            <button onClick={onShopNow} className="hidden md:flex items-center gap-2 text-primary uppercase font-bold tracking-widest hover:text-white transition-colors group mt-4 md:mt-0">
              View All Drops <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div ref={productCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, index) => (
              <div 
                key={product.id} 
                className="group bg-black/50 border border-white/10 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
              >
                <div 
                  className="aspect-[3/4] overflow-hidden cursor-pointer relative"
                  onClick={() => onProductClick(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider skew-x-[-10deg] shadow-lg">
                      <span className="skew-x-[10deg] flex items-center gap-1"><Flame size={10} /> Hot</span>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-primary to-blue-600 text-black text-[10px] font-black px-2 py-1 uppercase tracking-wider skew-x-[-10deg] shadow-lg">
                      <span className="skew-x-[10deg] flex items-center gap-1"><TrendingUp size={10} /> Trending</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                     <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="bg-primary text-black p-3 rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,243,255,0.5)] flex items-center gap-2 font-bold uppercase text-xs px-4"
                     >
                       <ShoppingBag size={16} /> Add
                     </button>
                  </div>
                </div>
                <div className="p-4 bg-black/80 backdrop-blur-sm absolute bottom-0 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white uppercase text-sm truncate mb-1 pr-2">{product.name}</h3>
                    <div className="flex text-accent text-[10px]">
                      <Star size={10} className="fill-accent" />
                      <span className="ml-1 font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-primary font-bold drop-shadow-md text-lg">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Feature Focus with Parallax */}
      <section className="h-[100dvh] w-full snap-start relative flex items-center bg-black overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/10 to-transparent skew-x-[-20deg] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 h-full pt-20">
          <div className="order-2 md:order-1 space-y-6 md:space-y-8 p-4 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-accent animate-pulse">
              <Flame size={24} />
              <span className="font-bold tracking-widest uppercase">Spotlight</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white italic leading-none">
              {featuredProduct.name.split(' ')[0]} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-transparent">
                {featuredProduct.name.split(' ').slice(1).join(' ')}
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg leading-relaxed border-l-4 border-primary pl-6 max-w-md bg-black/50 backdrop-blur-sm p-4 rounded-r-lg">
              {featuredProduct.description}
            </p>
            
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
               <div className="text-center">
                 <Wind className="mx-auto mb-2 text-primary" />
                 <span className="block text-xl font-bold text-white">{featuredProduct.puffs || 'Max'}</span>
                 <span className="text-[10px] uppercase text-gray-500 font-bold">Puffs</span>
               </div>
               <div className="text-center border-l border-white/10">
                 <Zap className="mx-auto mb-2 text-primary" />
                 <span className="block text-xl font-bold text-white">Fast</span>
                 <span className="text-[10px] uppercase text-gray-500 font-bold">Charging</span>
               </div>
               <div className="text-center border-l border-white/10">
                 <Star className="mx-auto mb-2 text-primary" />
                 <span className="block text-xl font-bold text-white">{featuredProduct.rating}</span>
                 <span className="text-[10px] uppercase text-gray-500 font-bold">Rating</span>
               </div>
            </div>

            <div className="flex gap-6 pt-4">
              <button 
                onClick={() => onAddToCart(featuredProduct)}
                className="bg-white text-black px-10 py-4 uppercase font-black tracking-wider hover:bg-primary transition-colors hover:scale-105"
              >
                Add To Cart
              </button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 h-[40vh] md:h-[70vh] w-full relative group perspective-1000 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[80px] animate-pulse"></div>
            <img 
              ref={featuredImageRef}
              src={featuredProduct.image} 
              alt={featuredProduct.name} 
              className="w-auto h-full max-h-[500px] object-contain drop-shadow-[0_0_50px_rgba(0,243,255,0.3)] z-10"
            />
          </div>
        </div>
      </section>

      {/* Section 4: AI & Footer Tease */}
      <section className="h-[100dvh] w-full snap-start relative flex flex-col justify-center bg-surface">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto text-center px-6 relative z-10 py-20 flex-grow flex flex-col justify-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-bounce mx-auto w-max">
            <Sparkles className="w-8 h-8 text-secondary mr-2" />
            <span className="text-secondary font-bold uppercase tracking-widest">Neon Lab AI</span>
          </div>

          <h2 className="text-5xl md:text-8xl font-black mb-8 italic uppercase text-white">
            Remix Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Reality</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Upload your vape photos and let our Gemini-powered AI remix them into cyberpunk masterpieces.
            Or ask <span className="text-primary font-bold">Vape God AI</span> for the perfect juice recommendation.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('AI_STUDIO')} className="px-12 py-5 bg-secondary text-black font-black uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_30px_rgba(191,0,255,0.4)]">
               Try Neon Lab
             </button>
             <button className="px-12 py-5 border border-white/20 text-white font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-all bg-black/50 backdrop-blur-sm">
               Chat with AI
             </button>
          </div>
        </div>
        
        <div className="mt-auto border-t border-white/10 bg-black py-12">
           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <Zap className="w-10 h-10 text-primary mb-4 mx-auto md:mx-0" />
                <h3 className="font-bold text-white uppercase mb-2">Instant Delivery</h3>
                <p className="text-gray-500 text-sm">Get your fix faster than ever.</p>
              </div>
              <div>
                <ShieldCheck className="w-10 h-10 text-primary mb-4 mx-auto md:mx-0" />
                <h3 className="font-bold text-white uppercase mb-2">Verified Authentic</h3>
                <p className="text-gray-500 text-sm">No clones, just straight fire.</p>
              </div>
              <div>
                <Star className="w-10 h-10 text-primary mb-4 mx-auto md:mx-0" />
                <h3 className="font-bold text-white uppercase mb-2">Community Rated</h3>
                <p className="text-gray-500 text-sm">Top flavors voted by vapers like you.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};