import React, { useState, useRef } from 'react';
import { Wand2, Upload, Download, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { generateEditedImage } from '../services/geminiService';

interface AIStudioProps {
  products: Product[];
}

export const AIStudio: React.FC<AIStudioProps> = ({ products }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to convert URL to base64 (if CORS allows)
  const toBase64 = (url: string) => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = (e) => {
        reject(e);
        // Fallback or alert for CORS issues
        alert("Couldn't load this image due to browser security (CORS). Try uploading an image instead.");
      };
      img.src = url;
    });
  };

  const handleProductSelect = async (url: string) => {
    try {
      setSelectedImage(null);
      setGeneratedImage(null);
      const base64 = await toBase64(url);
      setSelectedImage(base64);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    const result = await generateEditedImage(selectedImage, prompt);

    if (result) {
      setGeneratedImage(result);
    } else {
      alert("Failed to generate image. Please try again.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-bold uppercase tracking-widest mb-4 animate-pulse">
            <Sparkles size={16} /> Powered by Gemini 2.5 Flash
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic text-white mb-4 uppercase tracking-tighter">
            Neon <span className="text-primary">Lab</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Remix your vape. Upload a photo or select a product, describe your vision, and let our AI style it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: Controls */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Input Method */}
            <div className="bg-surface border border-white/10 p-6 rounded-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-all"></div>
              <h3 className="text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Upload size={18} className="text-primary" /> Source Image
              </h3>
              
              <div className="space-y-4">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 border-2 border-dashed border-white/20 hover:border-primary/50 text-gray-400 hover:text-white transition-all flex flex-col items-center gap-2 uppercase text-xs font-bold tracking-widest"
                >
                  <Upload size={24} />
                  Upload Photo
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileUpload}
                />

                <div className="text-center text-xs text-gray-600 uppercase font-bold divider">OR Select Product</div>
                
                <div className="grid grid-cols-4 gap-2">
                  {products.slice(0, 8).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleProductSelect(p.image)}
                      className="aspect-square rounded-sm overflow-hidden border border-white/10 hover:border-primary transition-colors relative"
                    >
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="bg-surface border border-white/10 p-6">
              <h3 className="text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Wand2 size={18} className="text-secondary" /> Your Vision
              </h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Add a cyberpunk neon background, make the vape gold, add pink smoke..."
                className="w-full h-32 bg-black border border-white/20 p-4 text-white text-sm focus:border-secondary focus:outline-none placeholder-gray-600 mb-4 resize-none"
              />
              <button
                onClick={handleGenerate}
                disabled={!selectedImage || !prompt || isGenerating}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-black font-black uppercase tracking-wider hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} /> Generate Art
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Area: Preview */}
          <div className="lg:col-span-2 bg-black/50 border border-white/10 min-h-[500px] flex items-center justify-center relative overflow-hidden backdrop-blur-sm p-4">
            {!selectedImage && !generatedImage && (
              <div className="text-center text-gray-600 flex flex-col items-center">
                <ImageIcon size={48} className="mb-4 opacity-50" />
                <p className="uppercase tracking-widest text-sm">Select an image to start</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
              {selectedImage && (
                <div className="relative group w-full h-full min-h-[300px] flex flex-col">
                   <div className="absolute top-2 left-2 bg-black/80 text-white text-[10px] uppercase font-bold px-2 py-1 rounded border border-white/10 z-10">Original</div>
                   <div className="flex-1 relative border border-white/10 bg-black/20">
                     <img src={selectedImage} alt="Original" className="absolute inset-0 w-full h-full object-contain p-4" />
                   </div>
                </div>
              )}

              {generatedImage && (
                <div className="relative group w-full h-full min-h-[300px] flex flex-col animate-fade-in-up">
                   <div className="absolute top-2 left-2 bg-secondary text-black text-[10px] uppercase font-bold px-2 py-1 rounded z-10">Remixed</div>
                   <div className="flex-1 relative border border-secondary/50 bg-secondary/5 shadow-[0_0_30px_rgba(191,0,255,0.1)]">
                     <img src={generatedImage} alt="Generated" className="absolute inset-0 w-full h-full object-contain p-4" />
                   </div>
                   <a 
                    href={generatedImage} 
                    download="neon-lab-remix.png"
                    className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full hover:bg-primary transition-colors shadow-lg"
                   >
                     <Download size={20} />
                   </a>
                </div>
              )}
            </div>

            {isGenerating && (
              <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <div className="w-16 h-16 border-4 border-secondary border-b-transparent rounded-full animate-spin absolute inset-0 opacity-50" style={{ animationDirection: 'reverse' }}></div>
                </div>
                <div className="mt-4 text-white font-bold uppercase tracking-widest animate-pulse">
                  AI is hallucinating...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};